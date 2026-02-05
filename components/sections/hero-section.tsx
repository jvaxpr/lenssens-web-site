"use client"

import { motion } from "framer-motion"
import { ChevronDown, Play, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ParticleBackground } from "@/components/particle-background"

export function HeroSection() {
  const scrollToNext = () => {
    const nextSection = document.getElementById("problem-solution")
    nextSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero - LENSSENS"
    >
      <ParticleBackground />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Tecnología de Vanguardia
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-foreground">LENSSENS:</span>
          <br />
          <span className="bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">
            Libertad en Cada Mirada
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Lentes inteligentes con sensor ultrasónico que transforman la 
          percepción espacial para personas con discapacidad visual
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            size="lg"
            className="min-w-[220px] gap-2 text-base font-medium"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Calendar className="w-5 h-5" />
            Reserva tu demostración
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="min-w-[220px] gap-2 text-base font-medium bg-transparent"
            onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Play className="w-5 h-5" />
            Ver funcionamiento
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-border/50"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { value: "12h", label: "Autonomía de batería" },
            { value: "50cm", label: "Distancia de reacción" },
            { value: "360°", label: "Campo de detección" },
            { value: "50g", label: "Peso ultraligero" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        aria-label="Desplazarse a la siguiente sección"
      >
        <span className="text-xs tracking-wider uppercase">Descubre más</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  )
}
