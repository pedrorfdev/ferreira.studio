import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { GoogleGenAI } from "@google/genai";
import { useAssistantStore } from "@/store/use-assistant-store";
import { assistantPanel, staggerContainer, slideUp } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n-context";
import { Send, X, Sparkles, RotateCcw } from "lucide-react";
import type { AnyProject } from "@/data/projects";
import { useProjectContent } from "@/hooks/use-project-content";

interface Props {
  project: AnyProject;
}
type Message = { role: "user" | "assistant"; content: string };

const MODELS = ["gemini-2.5-flash", "gemini-2.0-flash"];

function buildProjectContext(
  project: AnyProject,
  tagline: string,
  sections: any,
): string {
  let text = `Project Name: ${project.title}\n`;
  text += `Technologies/Tags: ${project.tags?.join(", ") || ""}\n`;
  text += `Tagline: ${tagline}\n\n`;
  if (sections) {
    for (const [key, section] of Object.entries(sections)) {
      if (!section || typeof section !== "object") continue;
      const sec = section as any;
      text += `## Section: ${key}\n`;
      if (sec.headline) text += `Headline: ${sec.headline}\n`;
      if (sec.body) text += `Body: ${sec.body}\n`;
      if (sec.decisions && Array.isArray(sec.decisions)) {
        text += `Key Decisions:\n`;
        for (const d of sec.decisions) {
          text += `- ${d.title}\n  Context/Why: ${d.why}\n`;
          if (d.trade) text += `  Tradeoff: ${d.trade}\n`;
        }
      }
      if (sec.items && Array.isArray(sec.items)) {
        text += `Highlights:\n`;
        for (const item of sec.items) {
          if (typeof item === "string") {
            text += `- ${item}\n`;
          } else if (item && typeof item === "object") {
            text += `- ${item.title || item.label || ""}: ${item.description || item.value || ""}\n`;
          }
        }
      }
      if (sec.metrics && Array.isArray(sec.metrics)) {
        text += `Metrics/Results:\n`;
        for (const m of sec.metrics) {
          text += `- ${m.label}: ${m.value}\n`;
        }
      }
      text += `\n`;
    }
  }
  return text;
}

async function askGemini(
  messages: Message[],
  systemPrompt: string,
  projectContext: string,
  outOfScopeMessage: string,
  lang: string,
  project: AnyProject,
): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error("VITE_GEMINI_API_KEY not set");
  const ai = new GoogleGenAI({ apiKey });
  const langInstruction =
    lang === "pt"
      ? "\n\n[CRÍTICO]: Responda SEMPRE em português do Brasil."
      : "\n\n[CRITICAL]: Always respond in English.";

  const fullSystemInstruction = `
${systemPrompt}

You are an interactive technical portfolio assistant representing Pedro Ferreira.
Answer questions about the project "${project.title}" based strictly on the details below.

Project Details (in current language context):
${projectContext}

[CRITICAL SCOPE RULE]:
You must ONLY answer questions directly related to this project, Pedro Ferreira, his portfolio, skills, or experience.
If the user asks questions that are outside of this scope (e.g. general programming questions not related to the project/portfolio, solving math problems, writing unrelated code/scripts, listing unrelated recipes, telling random jokes, translating unrelated text, or general knowledge questions), you MUST respond EXACTLY with the following message and ABSOLUTELY NOTHING ELSE:
"${outOfScopeMessage}"

${langInstruction}
`;

  const history = messages.slice(0, -1).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
  const last = messages[messages.length - 1];
  for (let i = 0; i < MODELS.length; i++) {
    try {
      const chat = ai.chats.create({
        model: MODELS[i],
        history,
        config: {
          systemInstruction: fullSystemInstruction,
          maxOutputTokens: 2048,
          temperature: 0.7,
        },
      });
      const r = await chat.sendMessage({ message: last.content });
      return r.text ?? "";
    } catch (err) {
      if (i === MODELS.length - 1) throw err;
      console.warn(`${MODELS[i]} failed, trying ${MODELS[i + 1]}...`);
    }
  }
  throw new Error("All models failed");
}

function staticFallback(project: AnyProject, lang: string) {
  return lang === "pt"
    ? `Problema de conexão. O case study do ${project.title} cobre as decisões. Dúvidas: hello@ferreira.studio`
    : `Connection issue. The ${project.title} case study covers key decisions. Questions: hello@ferreira.studio`;
}

function MessageBubble({
  role,
  content,
}: {
  role: "user" | "assistant";
  content: string;
}) {
  return (
    <motion.div
      variants={slideUp}
      initial="hidden"
      animate="visible"
      className={cn("flex", role === "user" ? "justify-end" : "justify-start")}
    >
      {role === "assistant" && (
        <div className="w-5 h-5 rounded-full bg-(--color-accent-muted) flex items-center justify-center shrink-0 mt-1 mr-2">
          <Sparkles size={10} className="text-(--color-accent)" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[82%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed",
          role === "user"
            ? "bg-(--color-accent) text-white rounded-br-sm"
            : "bg-(--color-bg-tertiary) text-(--color-text-secondary) rounded-bl-sm",
        )}
      >
        {content}
      </div>
    </motion.div>
  );
}

const mobilePanel: Variants = {
  hidden: { y: "100%", opacity: 1 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  },
  exit: { y: "100%", opacity: 1, transition: { duration: 0.25 } },
};

export function AssistantLayer({ project }: Props) {
  const { t, lang } = useI18n();
  const { tagline, sections } = useProjectContent(project);
  const projectContext = buildProjectContext(project, tagline, sections);
  const outOfScopeMessage =
    t.assistant.outOfScope ||
    "I can only answer questions related to this project. For other topics, please contact Pedro directly or send an email to pedrorf.dev@gmail.com.";

  const isOpen = useAssistantStore((s) => s.isOpen);
  const toggle = useAssistantStore((s) => s.toggle);
  const messages = useAssistantStore((s) => s.messages);
  const addMessage = useAssistantStore((s) => s.addMessage);
  const clearMessages = useAssistantStore((s) => s.clearMessages);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const langRef = useRef(lang);

  useEffect(() => {
    langRef.current = lang;
  }, [lang]);
  useEffect(() => {
    clearMessages();
  }, [project.id, clearMessages]);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);
  useEffect(() => {
    if (isOpen) setTimeout(() => textareaRef.current?.focus(), 300);
  }, [isOpen]);

  const handleSend = useCallback(
    async (text?: string) => {
      const content = (text ?? input).trim();
      if (!content || loading) return;
      const currentLang = langRef.current;
      setInput("");
      setError(null);
      addMessage({ role: "user", content });
      setLoading(true);
      try {
        const history: Message[] = [...messages, { role: "user", content }];
        const reply = await askGemini(
          history,
          project.assistant.context,
          projectContext,
          outOfScopeMessage,
          currentLang,
          project
        );
        addMessage({ role: "assistant", content: reply });
      } catch (err) {
        console.error(err);
        addMessage({
          role: "assistant",
          content: staticFallback(project, currentLang),
        });
        setError(
          currentLang === "pt" ? "Problema de conexão." : "Connection issue.",
        );
      } finally {
        setLoading(false);
      }
    },
    [
      input,
      loading,
      messages,
      project,
      addMessage,
      projectContext,
      outOfScopeMessage,
    ],
  );

  const prompts =
    lang === "pt"
      ? (project.assistant.quickPromptsPt ?? project.assistant.quickPrompts)
      : project.assistant.quickPrompts;

  const panelContent = (
    <>
      <div className="flex items-center justify-between px-4 py-3 border-b border-(--color-border-subtle) shrink-0 relative">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-(--color-border-strong) md:hidden" />
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <div className="w-5 h-5 rounded-full bg-(--color-accent-muted) flex items-center justify-center">
            <Sparkles size={10} className="text-(--color-accent)" />
          </div>
          <span className="text-xs font-medium text-(--color-text-primary)">
            {project.title}
          </span>
          <span className="text-[10px] text-(--color-text-tertiary)">· AI</span>
        </div>
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={clearMessages}
              title={t.assistant.clearChat}
              className="text-(--color-text-tertiary) hover:text-(--color-text-primary) transition-colors cursor-pointer"
            >
              <RotateCcw size={12} />
            </button>
          )}
          <button
            onClick={toggle}
            className="text-(--color-text-tertiary) hover:text-(--color-text-primary) transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 min-h-0">
        {messages.length === 0 && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-2"
          >
            <p className="text-xs text-(--color-text-tertiary) mb-1">
              {t.project.askAbout}
            </p>
            {prompts.map((prompt, i) => (
              <motion.button
                key={i}
                variants={slideUp}
                onClick={() => handleSend(prompt)}
                disabled={loading}
                className={cn(
                  "text-left text-xs px-3 py-2.5 rounded-lg cursor-pointer",
                  "border border-(--color-border) text-(--color-text-secondary)",
                  "hover:border-(--color-accent)/50 hover:text-(--color-text-primary)",
                  "hover:bg-(--color-accent-muted) transition-all duration-150",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                )}
              >
                {prompt}
              </motion.button>
            ))}
          </motion.div>
        )}
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} content={msg.content} />
        ))}
        {loading && (
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-(--color-accent-muted) flex items-center justify-center shrink-0 mt-1">
              <Sparkles size={10} className="text-(--color-accent)" />
            </div>
            <div className="bg-(--color-bg-tertiary) rounded-xl rounded-bl-sm px-3.5 py-3">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-(--color-accent)/60 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        {error && (
          <p className="text-[10px] text-(--color-text-tertiary) text-center">
            {error}
          </p>
        )}
        <div ref={endRef} />
      </div>

      <div className="px-4 pb-4 pt-3 border-t border-(--color-border-subtle) shrink-0">
        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={t.assistant.placeholder}
            rows={1}
            disabled={loading}
            className={cn(
              "flex-1 resize-none bg-transparent outline-none",
              "text-sm text-(--color-text-primary) placeholder:text-(--color-text-tertiary)",
              "max-h-28 leading-relaxed py-1 disabled:opacity-50",
            )}
            style={{ fieldSizing: "content" } as React.CSSProperties}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className={cn(
              "shrink-0 w-7 h-7 rounded-full flex items-center justify-center",
              "bg-(--color-accent) text-white cursor-pointer transition-opacity duration-150",
              (!input.trim() || loading) && "opacity-30 cursor-not-allowed",
            )}
          >
            <Send size={11} />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Toggle button — bg sólido para aparecer no light */}
      <motion.button
        onClick={toggle}
        aria-label={t.project.askAbout}
        className={cn(
          "fixed bottom-5 right-5 md:bottom-6 md:right-10 z-70",
          "flex items-center gap-2.5 px-4 py-2.5 rounded-full",
          // Borda e fundo mais sólidos — visível tanto no dark quanto no light
          "bg-(--color-bg-secondary) border border-(--color-border) shadow-lg",
          "text-xs font-medium cursor-pointer",
          "hover:border-(--color-accent) transition-all duration-200",
          isOpen && "opacity-0 pointer-events-none",
        )}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: isOpen ? 0 : 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Sparkles size={12} className="text-(--color-accent)" />
        {/* Texto com cor explícita — não herda do tema */}
        <span className="hidden sm:block text-(--color-text-primary)">
          {t.project.askAbout}
        </span>
        <span className="sm:hidden text-(--color-text-primary)">AI</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* MOBILE — bottom sheet, nunca toca o topo */}
            <motion.div
              className={cn(
                "md:hidden fixed inset-x-0 bottom-0 z-75",
                "flex flex-col rounded-t-3xl overflow-hidden",
                "bg-(--color-bg-secondary) border-t border-(--color-border)",
                "shadow-2xl",
              )}
              style={{ maxHeight: "75dvh" }}
              variants={mobilePanel}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {panelContent}
            </motion.div>

            {/* DESKTOP — painel lateral inferior direito */}
            <motion.div
              className={cn(
                "hidden md:flex fixed bottom-6 right-10 z-70",
                "w-[380px] flex-col rounded-2xl overflow-hidden",
                "border border-(--color-border) bg-(--color-bg-secondary) shadow-2xl",
              )}
              style={{ maxHeight: "min(540px, calc(100dvh - 120px))" }}
              variants={assistantPanel}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {panelContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
