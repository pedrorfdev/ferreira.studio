// components/assistant/assistant-layer.tsx
// ============================================================
// Contextual assistant — "Ask about this project".
// Modo atual: respostas estáticas pré-escritas por projeto.
// As respostas ficam em projects.ts → assistant.answers.
// Isso elimina dependência de API, custo e latência.
// Quando quiser adicionar API real, só troca o handleSend.
// ============================================================

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAssistantStore } from "@/store/use-assistant-store"
import { assistantPanel, staggerContainer, slideUp } from "@/lib/motion"
import { cn } from "@/lib/cn"
import { useI18n } from "@/lib/i18n-context"
import type { ProjectData } from "@/types/project"

interface Props {
    project: ProjectData
}

// ── Message bubble ────────────────────────────────────────────

function MessageBubble({ role, content }: { role: "user" | "assistant"; content: string }) {
    return (
        <motion.div
            variants={slideUp}
            initial="hidden"
            animate="visible"
            className={cn("flex", role === "user" ? "justify-end" : "justify-start")}
        >
            <div
                className={cn(
                    "max-w-[85%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed",
                    role === "user"
                        ? "bg-[var(--color-accent)] text-white rounded-br-sm"
                        : "bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] rounded-bl-sm"
                )}
            >
                {content}
            </div>
        </motion.div>
    )
}

// ── Static response resolver ──────────────────────────────────
// Tenta encontrar a resposta pré-escrita mais próxima da pergunta.
// Se não achar, retorna uma resposta genérica que instrui o visitante
// a checar o case study acima.

function resolveAnswer(question: string, project: ProjectData): string {
    const q = question.toLowerCase()

    // Tenta match direto nos quick prompts → answers
    if (project.assistant.answers) {
        for (const [prompt, answer] of Object.entries(project.assistant.answers)) {
            const keywords = prompt.toLowerCase().split(" ").filter((w) => w.length > 3)
            const matches = keywords.filter((kw) => q.includes(kw))
            if (matches.length >= 2) return answer
        }
    }

    // Fallback genérico
    return `That's a great question about ${project.title}. The case study above covers the main decisions and context — scroll through it and you'll find the details. If you want to dig deeper, feel free to reach out directly.`
}

// ── Main component ────────────────────────────────────────────

export function AssistantLayer({ project }: Props) {
    const { t } = useI18n()
    const isOpen = useAssistantStore((s) => s.isOpen)
    const toggle = useAssistantStore((s) => s.toggle)
    const messages = useAssistantStore((s) => s.messages)
    const addMessage = useAssistantStore((s) => s.addMessage)
    const clearMessages = useAssistantStore((s) => s.clearMessages)

    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        clearMessages()
    }, [project.id, clearMessages])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, loading])

    function handleSend(text?: string) {
        const content = (text ?? input).trim()
        if (!content || loading) return

        setInput("")
        addMessage({ role: "user", content })
        setLoading(true)

        // Simula delay de resposta para parecer natural
        setTimeout(() => {
            const answer = resolveAnswer(content, project)
            addMessage({ role: "assistant", content: answer })
            setLoading(false)
        }, 600)
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
                    "hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)]",
                    "transition-all duration-200 cursor-pointer",
                    isOpen && "opacity-0 pointer-events-none"
                )}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: isOpen ? 0 : 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
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
                        style={{ maxHeight: "min(520px, calc(100dvh - 100px))" }}
                        variants={assistantPanel}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border-subtle)]">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                                <span className="text-xs font-medium text-[var(--color-text-primary)]">
                                    {project.title}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                {messages.length > 0 && (
                                    <button
                                        onClick={clearMessages}
                                        className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
                                    >
                                        {t.assistant.clearChat}
                                    </button>
                                )}
                                <button
                                    onClick={toggle}
                                    className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer text-lg leading-none"
                                    aria-label={t.nav.close}
                                >
                                    ×
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
                                    <p className="text-xs text-[var(--color-text-tertiary)] mb-2">
                                        {t.project.askAbout}
                                    </p>
                                    {project.assistant.quickPrompts.map((prompt, i) => (
                                        <motion.button
                                            key={i}
                                            variants={slideUp}
                                            onClick={() => handleSend(prompt)}
                                            className={cn(
                                                "text-left text-xs px-3 py-2.5 rounded-lg cursor-pointer",
                                                "border border-[var(--color-border)]",
                                                "text-[var(--color-text-secondary)]",
                                                "hover:border-[var(--color-border-strong)]",
                                                "hover:text-[var(--color-text-primary)]",
                                                "transition-all duration-150"
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
                                <div className="flex justify-start">
                                    <div className="bg-[var(--color-bg-tertiary)] rounded-xl rounded-bl-sm px-3.5 py-2.5">
                                        <div className="flex gap-1 items-center h-4">
                                            {[0, 1, 2].map((i) => (
                                                <span
                                                    key={i}
                                                    className="w-1 h-1 rounded-full bg-[var(--color-text-tertiary)] animate-bounce"
                                                    style={{ animationDelay: `${i * 0.15}s` }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="px-4 pb-4 pt-3 border-t border-[var(--color-border-subtle)]">
                            <div className="flex items-end gap-2">
                                <textarea
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
                                    className={cn(
                                        "flex-1 resize-none bg-transparent outline-none",
                                        "text-sm text-[var(--color-text-primary)]",
                                        "placeholder:text-[var(--color-text-tertiary)]",
                                        "max-h-28 leading-relaxed py-1"
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
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M6 10V2M2 6l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}