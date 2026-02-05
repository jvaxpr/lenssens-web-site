"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { Search, ChevronDown, MessageCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FAQ {
  id: number
  question: string
  answer: string
  category: string
}

const faqs: FAQ[] = [
  {
    id: 1,
    category: "Envíos",
    question: "¿Hacen envíos a todo el país?",
    answer: "Sí, realizamos envíos a todo Venezuela. Trabajamos con las principales empresas de logística para garantizar que tu pedido llegue de forma segura. Los tiempos de entrega varían según la ubicación, pero generalmente oscilan entre 5 a 10 días hábiles."
  },
  {
    id: 2,
    category: "Producto",
    question: "¿Cómo sé si estos lentes son adecuados para mi tipo de discapacidad visual?",
    answer: "Los lentes LENSSENS están diseñados para funcionar con diferentes tipos de discapacidad visual. Ofrecemos una consulta gratuita con nuestros especialistas donde evaluaremos tu caso específico y determinaremos si LENSSENS es la solución adecuada para ti. También puedes contactarnos para una demostración personalizada."
  },
  {
    id: 3,
    category: "Pago",
    question: "¿Qué métodos de pago aceptan?",
    answer: "Aceptamos múltiples métodos de pago para tu comodidad: transferencias bancarias, tarjetas de débito y crédito (Visa, Mastercard), billetera digital (Pago Móvil), y criptomonedas. También ofrecemos planes de financiamiento sin intereses para facilitar tu compra."
  },
  {
    id: 4,
    category: "Garantía",
    question: "¿Tienen garantía los lentes? ¿De cuánto tiempo es y qué cubre?",
    answer: "Sí, LENSSENS incluye garantía de 2 años que cubre defectos de fabricación, malfuncionamiento del sensor ultrasónico, problemas con la batería y fallas en el procesador Arduino. La garantía no cubre daño accidental, caídas o uso incorrecto. Ofrecemos opción de extensión hasta 5 años con cobertura adicional."
  },
  {
    id: 5,
    category: "Envíos",
    question: "¿Cuánto tarda normalmente en llegar el pedido?",
    answer: "El tiempo de entrega depende de tu ubicación en Venezuela. En general: Caracas y zonas metropolitanas: 5-7 días hábiles. Interior del país: 7-10 días hábiles. Ofrecemos seguimiento del pedido en tiempo real y puedes contactarnos ante cualquier duda sobre tu envío."
  }
]

function FAQItem({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      className="border-b border-border last:border-0"
      initial={false}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
      >
        <div className="flex items-start gap-4 pr-4">
          <span className="inline-block px-2 py-1 text-xs font-medium text-accent bg-accent/10 rounded shrink-0">
            {faq.category}
          </span>
          <span className="font-medium text-foreground">{faq.question}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${faq.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-5 pl-14 pr-4">
              <p className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [showContactForm, setShowContactForm] = useState(false)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const filteredFaqs = searchQuery
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs

  return (
    <section
      id="faq"
      className="py-24 lg:py-32 bg-card"
      ref={containerRef}
      aria-label="Preguntas Frecuentes"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-3 py-1 text-sm font-medium text-accent bg-accent/10 rounded-full mb-4">
            Soporte
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Preguntas Frecuentes
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Encuentra respuestas a las preguntas más comunes sobre LENSSENS.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar en las preguntas frecuentes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-background"
              aria-label="Buscar preguntas frecuentes"
            />
          </div>
        </motion.div>

        {/* FAQ list */}
        <motion.div
          className="bg-background rounded-2xl border border-border overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
              />
            ))
          ) : (
            <div className="p-8 text-center">
              <p className="text-muted-foreground mb-4">
                No encontramos resultados para tu búsqueda.
              </p>
              <Button
                variant="outline"
                onClick={() => setShowContactForm(true)}
                className="bg-transparent"
              >
                Contactar soporte
              </Button>
            </div>
          )}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          className="mt-8 p-6 rounded-2xl bg-background border border-border"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {!showContactForm ? (
              <motion.div
                key="cta"
                className="flex flex-col sm:flex-row items-center justify-between gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">¿No encuentras tu pregunta?</h3>
                    <p className="text-sm text-muted-foreground">Nuestro equipo está listo para ayudarte</p>
                  </div>
                </div>
                <Button onClick={() => setShowContactForm(true)}>
                  Enviar pregunta
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={(e) => {
                  e.preventDefault()
                  // Handle form submission
                  setShowContactForm(false)
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Envíanos tu pregunta</h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowContactForm(false)}
                  >
                    Cancelar
                  </Button>
                </div>
                <Input
                  type="email"
                  placeholder="Tu correo electrónico"
                  required
                  className="bg-card"
                  aria-label="Correo electrónico"
                />
                <textarea
                  placeholder="¿Cuál es tu pregunta?"
                  required
                  className="w-full min-h-[100px] p-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-label="Tu pregunta"
                />
                <Button type="submit" className="w-full gap-2">
                  <Send className="w-4 h-4" />
                  Enviar pregunta
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
