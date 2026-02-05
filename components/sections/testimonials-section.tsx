"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Quote, Play, ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Testimonial {
  id: number
  name: string
  age: number
  location: string
  condition: string
  quote: string
  improvement: string
  rating: number
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "María García",
    age: 45,
    location: "Madrid, España",
    condition: "Retinosis pigmentaria",
    quote: "VisionAssist Pro me ha devuelto la confianza para salir sola. Antes dependía completamente de mi familia, ahora puedo ir al supermercado, pasear por el parque e incluso tomar el metro sin ayuda.",
    improvement: "90% más independencia",
    rating: 5,
    avatar: "MG"
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    age: 32,
    location: "Ciudad de México",
    condition: "Glaucoma avanzado",
    quote: "Como profesional, necesitaba una solución que me permitiera seguir trabajando. Los lentes son tan discretos que mis colegas ni siquiera notan que los llevo, y la calidad del feedback háptico es increíble.",
    improvement: "Vuelta al trabajo activo",
    rating: 5,
    avatar: "CR"
  },
  {
    id: 3,
    name: "Ana Martínez",
    age: 58,
    location: "Buenos Aires, Argentina",
    condition: "Degeneración macular",
    quote: "Después de años de frustración con otros dispositivos, finalmente encontré algo que realmente funciona. La batería dura todo el día y la respuesta es instantánea. Ha cambiado mi vida por completo.",
    improvement: "12h de autonomía diaria",
    rating: 5,
    avatar: "AM"
  }
]

function TestimonialCard({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      className={`relative w-full max-w-md mx-auto h-[400px] cursor-pointer perspective-1000 ${
        isActive ? "" : "opacity-50 scale-90"
      }`}
      initial={false}
      animate={{ scale: isActive ? 1 : 0.9 }}
      transition={{ duration: 0.4 }}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-card rounded-2xl border border-border p-8 flex flex-col"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Quote icon */}
          <Quote className="w-10 h-10 text-accent/30 mb-4" />
          
          {/* Quote */}
          <p className="text-foreground leading-relaxed flex-grow text-pretty">
            {'"'}{testimonial.quote}{'"'}
          </p>

          {/* Rating */}
          <div className="flex gap-1 my-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < testimonial.rating
                    ? "text-[#fbbf24] fill-[#fbbf24]"
                    : "text-muted"
                }`}
              />
            ))}
          </div>

          {/* Author */}
          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-semibold">
              {testimonial.avatar}
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
              <p className="text-sm text-muted-foreground">{testimonial.location}</p>
            </div>
          </div>

          {/* Flip hint */}
          <p className="text-xs text-muted-foreground text-center mt-4">
            Clic para ver detalles
          </p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-card rounded-2xl border border-border p-8 flex flex-col"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xl font-semibold">
              {testimonial.avatar}
            </div>
            <div>
              <h4 className="font-bold text-foreground text-lg">{testimonial.name}</h4>
              <p className="text-sm text-muted-foreground">{testimonial.age} años</p>
            </div>
          </div>

          <div className="space-y-4 flex-grow">
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Condición</span>
              <p className="text-foreground font-medium">{testimonial.condition}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Ubicación</span>
              <p className="text-foreground font-medium">{testimonial.location}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Mejora Principal</span>
              <p className="text-accent font-bold text-lg">{testimonial.improvement}</p>
            </div>
          </div>

          {/* Video button placeholder */}
          <Button variant="outline" className="w-full gap-2 bg-transparent">
            <Play className="w-4 h-4" />
            Ver testimonio en video
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Clic para volver
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32 bg-card overflow-hidden"
      ref={containerRef}
      aria-label="Testimonios"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-3 py-1 text-sm font-medium text-accent bg-accent/10 rounded-full mb-4">
            Historias Reales
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Testimonios que Inspiran
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Conoce las experiencias de personas cuyas vidas han sido transformadas 
            por VisionAssist Pro.
          </p>
        </motion.div>

        {/* Testimonials carousel */}
        <div className="relative">
          {/* Cards container */}
          <div className="flex items-center justify-center gap-4 overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="shrink-0"
                initial={{ opacity: 0, x: 100 }}
                animate={isInView ? { 
                  opacity: index === activeIndex ? 1 : 0.3,
                  x: (index - activeIndex) * 350,
                  display: Math.abs(index - activeIndex) <= 1 ? "block" : "none"
                } : {}}
                transition={{ duration: 0.5 }}
              >
                <TestimonialCard
                  testimonial={testimonial}
                  isActive={index === activeIndex}
                />
              </motion.div>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full bg-transparent"
              aria-label="Testimonio anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeIndex ? "w-6 bg-accent" : "bg-muted hover:bg-muted-foreground"
                  }`}
                  aria-label={`Ir al testimonio ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full bg-transparent"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Trust indicators */}
        <motion.div
          className="mt-16 pt-16 border-t border-border"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "2,500+", label: "Usuarios activos" },
              { value: "98%", label: "Satisfacción" },
              { value: "15", label: "Países" },
              { value: "4.9/5", label: "Valoración media" }
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
