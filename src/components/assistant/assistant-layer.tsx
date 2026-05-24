// components/assistant/assistant-layer.tsx
// ============================================================
// AI Assistant contextual — "Ask about this project"
// Usa Gemini API (gemini-1.5-flash) via fetch direto.
// API key lida de import.meta.env.VITE_GEMINI_API_KEY
// Fallback estático se a API falhar.
// ============================================================

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAssistantStore } from "@/store/use-assistant-store"
import { assistantPanel, staggerContainer, slideUp } from "@/lib/motion"
import { cn } from "@/lib/cn"
import { useI18n } from "@/lib/i18n-context"
import { Send, X, Sparkles, RotateCcw } from "lucide-react"
import type { ProjectData } from "@/types/project"

interface Props { project: ProjectData }

// ── Gemini API ────────────────────────────────────────────────

const GEMINI_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"

async function askGemini(
    messages: { role: "user" | "assistant"; content: string }[],
    systemPrompt: string
): Promise<string> {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY

    if (!apiKey) throw new Error("VITE_GEMINI_API_KEY not set")

    // Gemini usa "user"/"model" em vez de "user"/"assistant"
    const contents = messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
    }))

    const body = {
        system_instruction: {
            parts: [{ text: systemPrompt }],
        },
        contents,
        generationConfig: {
            maxOutputTokens: 800,
            temperature: 0.7,
        },
    }

    const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    })

    if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.error?.message ?? `Gemini error ${res.status}`)
    }

    const data = await res.json()
    return (
        data?.candidates?.[0]?.content?.parts?.[0]?.text ??
        "I couldn't generate a response. Please try again."
    )
}

// ── Static fallback ────────────────────────────────────────────

function staticFallback(project: ProjectData): string {
    return (
        `I'm having trouble connecting right now. ` +
        `You can explore ${project.title}'s case study above — it covers the key decisions, ` +
        `technical challenges, and outcomes in detail. ` +
        `Feel free to reach out directly at hello@ferreira.studio.`
    )
}

// ── Message bubble ─────────────────────────────────────────────

function MessageBubble({ role, content }: { role: "user" | "assistant"; content: string }) {
    return (
        <motion.div
            variants={slideUp}
            initial="hidden"
            animate="visible"
            className={cn("flex", role === "user" ? "justify-end" : "justify-start")}
        >
            {role === "assistant" && (
                <div className="w-5 h-5 rounded-full bg-[var(--color-accent-muted)] flex items-center justify-center shrink-0 mt-1 mr-2">
                    <Sparkles size={10} className="text-[var(--color-accent)]" />
                </div>
            )}
            <div className={cn(
                "max-w-[82%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed",
                role === "user"
                    ? "bg-[var(--color-accent)] text-white rounded-br-sm"
                    : "bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] rounded-bl-sm"
            )}>
                {content}
            </div>
        </motion.div>
    )
}

// ── Main ───────────────────────────────────────────────────────

export function AssistantLayer({ project }: Props) {
    const { t } = useI18n()
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

    // Reset ao trocar de projeto
    useEffect(() => { clearMessages() }, [project.id, clearMessages])

    // Auto scroll
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, loading])

    // Focus no input ao abrir
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
            const reply = await askGemini(history, project.assistant.context)
            addMessage({ role: "assistant", content: reply })
        } catch (err) {
            console.error("Gemini error:", err)
            // Fallback estático ao invés de só mostrar erro
            addMessage({ role: "assistant", content: staticFallback(project) })
            setError("Connection issue — showing a fallback response.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {/* Toggle button */}
            <motion.button
                onClick={toggle}
                aria-label={t.project.askAbout}
                className={cn(
                    "fixed bottom-6 right-6 md:right-10 z-[70]",
                    "flex items-center gap-2.5 px-4 py-2.5 rounded-full",
                    "bg-[var(--color-bg-secondary)] border border-[var(--color-border)]",
                    "text-xs text-[var(--color-text-secondary)]",
                    "hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)]",
                    "transition-all duration-200 cursor-pointer shadow-lg",
                    isOpen && "opacity-0 pointer-events-none"
                )}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: isOpen ? 0 : 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                <Sparkles size={12} className="text-[var(--color-accent)]" />
                {t.project.askAbout}
            </motion.button>

            {/* Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={cn(
                            "fixed bottom-6 right-6 md:right-10 z-[70]",
                            "w-[340px] md:w-[380px] flex flex-col",
                            "rounded-2xl overflow-hidden",
                            "border border-[var(--color-border)]",
                            "bg-[var(--color-bg-secondary)] shadow-2xl",
                        )}
                        style={{ maxHeight: "min(540px, calc(100dvh - 120px))" }}
                        variants={assistantPanel}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3
                            border-b border-[var(--color-border-subtle)] shrink-0">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-[var(--color-accent-muted)]
                                flex items-center justify-center">
                                    <Sparkles size={10} className="text-[var(--color-accent)]" />
                                </div>
                                <span className="text-xs font-medium text-[var(--color-text-primary)]">
                                    {project.title}
                                </span>
                                <span className="text-[10px] text-[var(--color-text-tertiary)]">
                                    · AI
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                {messages.length > 0 && (
                                    <button
                                        onClick={clearMessages}
                                        title={t.assistant.clearChat}
                                        className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]
                               transition-colors cursor-pointer"
                                    >
                                        <RotateCcw size={12} />
                                    </button>
                                )}
                                <button
                                    onClick={toggle}
                                    aria-label={t.nav.close}
                                    className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]
                             transition-colors cursor-pointer"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 min-h-0">
                            {messages.length === 0 && (
                                <motion.div
                                    variants={staggerContainer}
                                    initial="hidden"
                                    animate="visible"
                                    className="flex flex-col gap-2"
                                >
                                    <p className="text-xs text-[var(--color-text-tertiary)] mb-1">
                                        {t.project.askAbout}
                                    </p>
                                    {project.assistant.quickPrompts.map((prompt, i) => (
                                        <motion.button
                                            key={i}
                                            variants={slideUp}
                                            onClick={() => handleSend(prompt)}
                                            disabled={loading}
                                            className={cn(
                                                "text-left text-xs px-3 py-2.5 rounded-lg cursor-pointer",
                                                "border border-[var(--color-border)]",
                                                "text-[var(--color-text-secondary)]",
                                                "hover:border-[var(--color-accent)]/50",
                                                "hover:text-[var(--color-text-primary)]",
                                                "hover:bg-[var(--color-accent-muted)]",
                                                "transition-all duration-150",
                                                "disabled:opacity-50 disabled:cursor-not-allowed"
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
                                    <div className="w-5 h-5 rounded-full bg-[var(--color-accent-muted)]
                                  flex items-center justify-center shrink-0 mt-1">
                                        <Sparkles size={10} className="text-[var(--color-accent)]" />
                                    </div>
                                    <div className="bg-[var(--color-bg-tertiary)] rounded-xl rounded-bl-sm px-3.5 py-3">
                                        <div className="flex gap-1 items-center">
                                            {[0, 1, 2].map((i) => (
                                                <span
                                                    key={i}
                                                    className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]/60 animate-bounce"
                                                    style={{ animationDelay: `${i * 0.15}s` }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <p className="text-[10px] text-[var(--color-text-tertiary)] text-center">
                                    {error}
                                </p>
                            )}

                            <div ref={endRef} />
                        </div>

                        {/* Input */}
                        <div className="px-4 pb-4 pt-3 border-t border-[var(--color-border-subtle)] shrink-0">
                            <div className="flex items-end gap-2">
                                <textarea
                                    ref={textareaRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault()
                                            handleSend()
                                        }
                                    }}
                                    placeholder={t.assistant.placeholder}
                                    rows={1}
                                    disabled={loading}
                                    className={cn(
                                        "flex-1 resize-none bg-transparent outline-none",
                                        "text-sm text-[var(--color-text-primary)]",
                                        "placeholder:text-[var(--color-text-tertiary)]",
                                        "max-h-28 leading-relaxed py-1",
                                        "disabled:opacity-50"
                                    )}
                                    style={{ fieldSizing: "content" } as React.CSSProperties}
                                />
                                <button
                                    onClick={() => handleSend()}
                                    disabled={!input.trim() || loading}
                                    aria-label={t.assistant.send}
                                    className={cn(
                                        "shrink-0 w-7 h-7 rounded-full flex items-center justify-center",
                                        "bg-[var(--color-accent)] text-white cursor-pointer",
                                        "transition-opacity duration-150",
                                        (!input.trim() || loading) && "opacity-30 cursor-not-allowed"
                                    )}
                                >
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