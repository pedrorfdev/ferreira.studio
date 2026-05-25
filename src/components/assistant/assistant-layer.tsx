// components/assistant/assistant-layer.tsx
// ============================================================
// Usa @google/generative-ai SDK oficial em vez de fetch raw.
// npm install @google/generative-ai
// ============================================================

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"
import { useAssistantStore } from "@/store/use-assistant-store"
import { assistantPanel, staggerContainer, slideUp } from "@/lib/motion"
import { cn } from "@/lib/cn"
import { useI18n } from "@/lib/i18n-context"
import { Send, X, Sparkles, RotateCcw } from "lucide-react"
import type { ProjectData } from "@/types/project"

interface Props { project: ProjectData }

// ── Gemini via SDK ────────────────────────────────────────────

function getModel() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY
    if (!apiKey) throw new Error("VITE_GEMINI_API_KEY not set")
    const genAI = new GoogleGenerativeAI(apiKey)
    return genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        safetySettings: [
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
        ],
    })
}

async function askGemini(
    messages: { role: "user" | "assistant"; content: string }[],
    systemPrompt: string,
    lang: string
): Promise<string> {
    const model = getModel()

    const langNote = lang === "pt"
        ? "\n\nIMPORTANTE: Responda SEMPRE em português do Brasil."
        : "\n\nIMPORTANT: Always respond in English."

    // Converte histórico para formato SDK
    // SDK usa "user" e "model" (não "assistant")
    const history = messages.slice(0, -1).map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
    }))

    const lastMessage = messages[messages.length - 1]

    const chat = model.startChat({
        history,
        systemInstruction: systemPrompt + langNote,
        generationConfig: { maxOutputTokens: 800, temperature: 0.7 },
    })

    const result = await chat.sendMessage(lastMessage.content)
    return result.response.text()
}

function staticFallback(project: ProjectData, lang: string): string {
    return lang === "pt"
        ? `Estou com dificuldades de conexão. O case study do ${project.title} acima cobre as decisões principais. Mais dúvidas: hello@ferreira.studio`
        : `Having trouble connecting. The ${project.title} case study covers the key decisions. Questions: hello@ferreira.studio`
}

// ── Bubble ────────────────────────────────────────────────────

function MessageBubble({ role, content }: { role: "user" | "assistant"; content: string }) {
    return (
        <motion.div variants={slideUp} initial="hidden" animate="visible"
            className={cn("flex", role === "user" ? "justify-end" : "justify-start")}>
            {role === "assistant" && (
                <div className="w-5 h-5 rounded-full bg-(--color-accent-muted) flex items-center
                        justify-center shrink-0 mt-1 mr-2">
                    <Sparkles size={10} className="text-(--color-accent)" />
                </div>
            )}
            <div className={cn(
                "max-w-[82%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed",
                role === "user"
                    ? "bg-(--color-accent) text-white rounded-br-sm"
                    : "bg-(--color-bg-tertiary) text-(--color-text-secondary) rounded-bl-sm"
            )}>
                {content}
            </div>
        </motion.div>
    )
}

// ── Main ──────────────────────────────────────────────────────

export function AssistantLayer({ project }: Props) {
    const { t, lang } = useI18n()
    const isOpen = useAssistantStore((s) => s.isOpen)
    const toggle = useAssistantStore((s) => s.toggle)
    const messages = useAssistantStore((s) => s.messages)
    const addMessage = useAssistantStore((s) => s.addMessage)
    const clearMessages = useAssistantStore((s) => s.clearMessages)

    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const endRef = useRef<HTMLDivElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => { clearMessages() }, [project.id, clearMessages])
    useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages, loading])
    useEffect(() => {
        if (isOpen) setTimeout(() => textareaRef.current?.focus(), 300)
    }, [isOpen])

    async function handleSend(text?: string) {
        const content = (text ?? input).trim()
        if (!content || loading) return
        setInput("")
        setError(null)
        addMessage({ role: "user", content })
        setLoading(true)
        try {
            const history = [...messages, { role: "user" as const, content }]
            const reply = await askGemini(history, project.assistant.context, lang)
            addMessage({ role: "assistant", content: reply })
        } catch (err) {
            console.error("Gemini SDK error:", err)
            addMessage({ role: "assistant", content: staticFallback(project, lang) })
            setError(lang === "pt" ? "Problema de conexão." : "Connection issue.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {/* Toggle */}
            <motion.button onClick={toggle} aria-label={t.project.askAbout}
                className={cn(
                    "fixed bottom-6 right-6 md:right-10 z-70",
                    "flex items-center gap-2.5 px-4 py-2.5 rounded-full",
                    "bg-(--color-bg-secondary) border border-(--color-border)",
                    "text-xs text-(--color-text-secondary) shadow-lg",
                    "hover:border-(--color-accent) hover:text-(--color-text-primary)",
                    "transition-all duration-200 cursor-pointer",
                    isOpen && "opacity-0 pointer-events-none"
                )}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: isOpen ? 0 : 1, y: 0 }}
                transition={{ delay: 0.8 }}>
                <Sparkles size={12} className="text-(--color-accent)" />
                {t.project.askAbout}
            </motion.button>

            {/* Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={cn(
                            "fixed bottom-6 right-6 md:right-10 z-70",
                            "w-[340px] md:w-[380px] flex flex-col rounded-2xl overflow-hidden",
                            "border border-(--color-border) bg-(--color-bg-secondary) shadow-2xl",
                        )}
                        style={{ maxHeight: "min(540px, calc(100dvh - 120px))" }}
                        variants={assistantPanel} initial="hidden" animate="visible" exit="exit">

                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3
                            border-b border-(--color-border-subtle) shrink-0">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-(--color-accent-muted)
                                flex items-center justify-center">
                                    <Sparkles size={10} className="text-(--color-accent)" />
                                </div>
                                <span className="text-xs font-medium text-(--color-text-primary)">
                                    {project.title}
                                </span>
                                <span className="text-[10px] text-(--color-text-tertiary)">· AI</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {messages.length > 0 && (
                                    <button onClick={clearMessages} title={t.assistant.clearChat}
                                        className="text-(--color-text-tertiary) hover:text-(--color-text-primary)
                               transition-colors cursor-pointer">
                                        <RotateCcw size={12} />
                                    </button>
                                )}
                                <button onClick={toggle} aria-label={t.nav.close}
                                    className="text-(--color-text-tertiary) hover:text-(--color-text-primary)
                             transition-colors cursor-pointer">
                                    <X size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 min-h-0">
                            {messages.length === 0 && (
                                <motion.div variants={staggerContainer} initial="hidden" animate="visible"
                                    className="flex flex-col gap-2">
                                    <p className="text-xs text-(--color-text-tertiary) mb-1">
                                        {t.project.askAbout}
                                    </p>
                                    {project.assistant.quickPrompts.map((prompt, i) => (
                                        <motion.button key={i} variants={slideUp}
                                            onClick={() => handleSend(prompt)} disabled={loading}
                                            className={cn(
                                                "text-left text-xs px-3 py-2.5 rounded-lg cursor-pointer",
                                                "border border-(--color-border) text-(--color-text-secondary)",
                                                "hover:border-(--color-accent)/50 hover:text-(--color-text-primary)",
                                                "hover:bg-(--color-accent-muted) transition-all duration-150",
                                                "disabled:opacity-50 disabled:cursor-not-allowed"
                                            )}>
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
                                    <div className="w-5 h-5 rounded-full bg-(--color-accent-muted)
                                  flex items-center justify-center shrink-0 mt-1">
                                        <Sparkles size={10} className="text-(--color-accent)" />
                                    </div>
                                    <div className="bg-(--color-bg-tertiary) rounded-xl rounded-bl-sm px-3.5 py-3">
                                        <div className="flex gap-1 items-center">
                                            {[0, 1, 2].map((i) => (
                                                <span key={i}
                                                    className="w-1.5 h-1.5 rounded-full bg-(--color-accent)/60 animate-bounce"
                                                    style={{ animationDelay: `${i * 0.15}s` }} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <p className="text-[10px] text-(--color-text-tertiary) text-center">{error}</p>
                            )}
                            <div ref={endRef} />
                        </div>

                        {/* Input */}
                        <div className="px-4 pb-4 pt-3 border-t border-(--color-border-subtle) shrink-0">
                            <div className="flex items-end gap-2">
                                <textarea ref={textareaRef} value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend() }
                                    }}
                                    placeholder={t.assistant.placeholder} rows={1} disabled={loading}
                                    className={cn(
                                        "flex-1 resize-none bg-transparent outline-none",
                                        "text-sm text-(--color-text-primary)",
                                        "placeholder:text-(--color-text-tertiary)",
                                        "max-h-28 leading-relaxed py-1 disabled:opacity-50"
                                    )}
                                    style={{ fieldSizing: "content" } as React.CSSProperties}
                                />
                                <button onClick={() => handleSend()} disabled={!input.trim() || loading}
                                    aria-label={t.assistant.send}
                                    className={cn(
                                        "shrink-0 w-7 h-7 rounded-full flex items-center justify-center",
                                        "bg-(--color-accent) text-white cursor-pointer transition-opacity duration-150",
                                        (!input.trim() || loading) && "opacity-30 cursor-not-allowed"
                                    )}>
                                    <Send size={11} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}