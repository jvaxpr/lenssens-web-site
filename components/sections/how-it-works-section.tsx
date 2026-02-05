"use client"

import React from "react"
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Radio, Cpu, Volume2, Play, Pause, ArrowRight, Vibrate } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Step {
  id: number
  title: string
  description: string
  icon: React.ElementType
  color: string
  animation: "waves" | "data" | "sound"
}

const steps: Step[] = [
  {
    id: 1,
    title: "Detección",
    description: "El sensor ultrasónico emite ondas de sonido que detectan obstáculos en un radio de 50cm con precisión milimétrica.",
    icon: Radio,
    color: "#4ade80",
    animation: "waves"
  },
  {
    id: 2,
    title: "Procesamiento",
    description: "El procesador Arduino analiza los datos en tiempo real, identificando la proximidad de obstáculos y calculando distancias exactas.",
    icon: Cpu,
    color: "#60a5fa",
    animation: "data"
  },
  {
    id: 3,
    title: "Sonido",
    description: "El sistema proporciona una advertencia inmediata al detectar un obstáculo con un audio 'pitido' que alerta al usuario.",
    icon: Volume2,
    color: "#fbbf24",
    animation: "sound"
  }
]

function WavesAnimation({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 bg-[#4ade80]/20 rounded-full flex items-center justify-center">
        <div className="w-4 h-4 bg-[#4ade80] rounded-full" />
      </div>
      {isActive && (
        <>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-12 h-12 border-2 border-[#4ade80]/40 rounded-full"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeOut"
              }}
            />
          ))}
        </>
      )}
    </div>
  )
}

function DataAnimation({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="w-16 h-16 bg-[#60a5fa]/20 rounded-lg flex items-center justify-center border border-[#60a5fa]/40">
        <Cpu className="w-8 h-8 text-[#60a5fa]" />
      </div>
      {isActive && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#60a5fa] rounded-full"
              initial={{ 
                x: (Math.random() - 0.5) * 100, 
                y: -50, 
                opacity: 0 
              }}
              animate={{
                y: [- 50, 0],
                opacity: [0, 1, 0],
                x: [(Math.random() - 0.5) * 100, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </>
      )}
    </div>
  )
}

function VibrationAnimation({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="w-16 h-8 bg-[#fbbf24]/20 rounded-full flex items-center justify-center border border-[#fbbf24]/40"
        animate={isActive ? {
          x: [-2, 2, -2, 2, 0],
        } : {}}
        transition={{
          duration: 0.3,
          repeat: isActive ? Infinity : 0,
          repeatDelay: 0.5
        }}
      >
        <Vibrate className="w-5 h-5 text-[#fbbf24]" />
      </motion.div>
      {isActive && (
        <>
          {[0, 1, 2].map((i) => {
            const angle = (i * 120 - 90) * (Math.PI / 180)
            return (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: "radial-gradient(circle, #fbbf24 0%, transparent 70%)"
                }}
                initial={{ 
                  x: 0, 
                  y: 0,
                  scale: 0,
                  opacity: 0 
                }}
                animate={{
                  x: [0, Math.cos(angle) * 40],
                  y: [0, Math.sin(angle) * 40],
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            )
          })}
        </>
      )}
    </div>
  )
}

function SoundAnimation({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        {/* Speaker icon */}
        <Volume2 className="w-6 h-6 text-[#fbbf24]" />
        
        {/* Sound waves */}
        {isActive && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-12 h-12 border-2 border-[#fbbf24]/40 rounded-full"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeOut"
                }}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

function StepAnimation({ type, isActive }: { type: Step["animation"]; isActive: boolean }) {
  switch (type) {
    case "waves":
      return <WavesAnimation isActive={isActive} />
    case "data":
      return <DataAnimation isActive={isActive} />
    case "sound":
      return <SoundAnimation isActive={isActive} />
    default:
      return null
  }
}

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  // Auto-advance steps
  useState(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 3000)
    return () => clearInterval(interval)
  })

  return (
    <section
      id="how-it-works"
      className="py-24 lg:py-32 bg-background"
      ref={containerRef}
      aria-label="Cómo Funciona"
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
            Proceso Simplificado
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Cómo Funciona
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Un sistema inteligente basado en tecnología ultrasónica que trabaja 
            en tiempo real para garantizar tu seguridad.
          </p>
        </motion.div>

        {/* Steps timeline */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-border">
            <motion.div
              className="h-full bg-accent"
              initial={{ width: "0%" }}
              animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Steps grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = index === activeStep
              const isPast = index < activeStep

              return (
                <motion.div
                  key={step.id}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <button
                    onClick={() => setActiveStep(index)}
                    className={`w-full text-left p-6 rounded-2xl border transition-all ${
                      isActive
                        ? "bg-card border-accent/40 shadow-lg shadow-accent/5"
                        : "bg-card/50 border-border hover:bg-card hover:border-border"
                    }`}
                    aria-current={isActive ? "step" : undefined}
                  >
                    {/* Step number */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                          isActive || isPast
                            ? "text-background"
                            : "bg-muted text-muted-foreground"
                        }`}
                        style={{
                          backgroundColor: isActive || isPast ? step.color : undefined
                        }}
                      >
                        {step.id}
                      </div>
                      <h3 className="font-semibold text-foreground">{step.title}</h3>
                    </div>

                    {/* Animation container */}
                    <div className="h-24 mb-4 rounded-lg bg-background/50 border border-border overflow-hidden">
                      <StepAnimation type={step.animation} isActive={isActive} />
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>

                    {/* Arrow connector (mobile/tablet) */}
                    {index < steps.length - 1 && (
                      <div className="hidden md:flex lg:hidden absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-card border border-border items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90" />
                      </div>
                    )}
                  </button>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Playback controls */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex items-center gap-4 p-2 rounded-full bg-card border border-border">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? "Pausar animación" : "Reproducir animación"}
              className="rounded-full"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
            
            <div className="flex gap-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeStep
                      ? "w-6 bg-accent"
                      : index < activeStep
                      ? "bg-accent/50"
                      : "bg-muted"
                  }`}
                  aria-label={`Ir al paso ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
