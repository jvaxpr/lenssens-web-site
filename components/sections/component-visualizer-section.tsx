"use client"

import React from "react"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Radio, Cpu, Zap, Battery } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ComponentFeature {
  id: string
  name: string
  description: string
  icon: React.ElementType
  color: string
}

const features: ComponentFeature[] = [
  {
    id: "sensor",
    name: "Sensor Ultrasónico",
    description: "Detecta obstáculos en un radio de 50cm con precisión milimétrica",
    icon: Radio,
    color: "#4ade80"
  },
  {
    id: "arduino",
    name: "Procesador Arduino",
    description: "Análisis en tiempo real de los datos del sensor",
    icon: Cpu,
    color: "#60a5fa"
  },
  {
    id: "buzzer",
    name: "Buzzer Activo",
    description: "Emite alertas sonoras al detectar obstáculos",
    icon: Zap,
    color: "#fbbf24"
  },
  {
    id: "battery",
    name: "Batería de Litio",
    description: "Pila recargable con 12 horas de autonomía",
    icon: Battery,
    color: "#a78bfa"
  }
]



export function ComponentVisualizerSection() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section
      id="visualizer"
      className="py-24 lg:py-32 bg-card"
      ref={containerRef}
      aria-label="Producto Lensens"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-3 py-1 text-sm font-medium text-accent bg-accent/10 rounded-full mb-4">
            Nuestro Producto
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Tecnología que Empodera
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            LENSSENS: Lentes inteligentes con tecnología de detección ultrasónica 
            que proporciona seguridad y autonomía en cada momento.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Product image */}
          <motion.div
            className="lg:order-1 order-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative rounded-2xl border border-border overflow-hidden bg-background">
              <img
                src="/lenssens-product.jpg"
                alt="LENSSENS - Lentes inteligentes con sensor ultrasónico"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
          </motion.div>

          {/* Features list */}
          <motion.div
            className="lg:order-2 order-1 space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-foreground">
                Características Principales
              </h3>
              <p className="text-muted-foreground">
                Descubre los componentes que hacen posible la experiencia Lensens
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.id}
                    className="flex items-start gap-4 p-4 rounded-xl bg-background/50 border border-border hover:border-accent/40 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + features.indexOf(feature) * 0.1 }}
                  >
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${feature.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: feature.color }} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-foreground">{feature.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <Button
              size="lg"
              className="w-full gap-2 mt-8"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Solicitar Información
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
