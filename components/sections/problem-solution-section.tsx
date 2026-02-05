"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { AlertTriangle, Shield, Check, Users, Map, Clock } from "lucide-react"

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export function ProblemSolutionSection() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const problems = [
    { icon: AlertTriangle, text: "285 millones de personas con discapacidad visual en el mundo" },
    { icon: Map, text: "El 70% enfrenta dificultades de movilidad diarias" },
    { icon: Users, text: "Dependencia de acompañantes para tareas cotidianas" },
    { icon: Clock, text: "Tiempo de respuesta lento en soluciones tradicionales" },
  ]

  const solutions = [
    { text: "Detección de obstáculos en tiempo real con LiDAR", delay: 0 },
    { text: "Feedback háptico y auditivo instantáneo", delay: 0.1 },
    { text: "Autonomía e independencia en la movilidad", delay: 0.2 },
    { text: "Integración con aplicaciones de navegación", delay: 0.3 },
    { text: "Diseño discreto y confortable para uso diario", delay: 0.4 },
  ]

  return (
    <section
      id="problem-solution"
      className="py-24 lg:py-32 bg-background"
      ref={containerRef}
      aria-label="Problema y Solución"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Problem Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="sticky top-24">
              <span className="inline-block px-3 py-1 text-sm font-medium text-destructive bg-destructive/10 rounded-full mb-4">
                El Desafío
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-balance">
                Millones de personas enfrentan barreras de movilidad cada día
              </h2>
              
              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-lg bg-card border border-border">
                  <div className="text-3xl font-bold text-foreground">
                    <AnimatedCounter target={285} suffix="M" />
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Personas con discapacidad visual</div>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <div className="text-3xl font-bold text-foreground">
                    <AnimatedCounter target={70} suffix="%" />
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Dificultades de movilidad</div>
                </div>
              </div>

              {/* Problem list */}
              <div className="space-y-4">
                {problems.map((problem, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg bg-destructive/5 border border-destructive/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <problem.icon className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <p className="text-foreground text-sm">{problem.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Solution Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="sticky top-24">
              <span className="inline-block px-3 py-1 text-sm font-medium text-accent bg-accent/10 rounded-full mb-4">
                La Solución
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-balance">
                LENSSENS transforma la percepción espacial
              </h2>

              {/* Visual representation */}
              <div className="relative mb-8 p-8 rounded-2xl bg-gradient-to-br from-card via-card to-accent/5 border border-border overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent/20 via-transparent to-accent/20"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Safety halo visualization */}
                <div className="relative flex justify-center items-center h-48">
                  <motion.div
                    className="absolute w-32 h-32 rounded-full border-2 border-accent/30"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute w-48 h-48 rounded-full border border-accent/20"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                  <div className="relative z-10 w-16 h-6 bg-foreground rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-background" />
                  </div>
                  <div className="absolute top-4 left-8 w-3 h-3 bg-accent rounded-full animate-pulse" />
                  <div className="absolute bottom-8 right-12 w-2 h-2 bg-accent/60 rounded-full animate-pulse" />
                  <div className="absolute top-12 right-8 w-2 h-2 bg-accent/40 rounded-full animate-pulse" />
                </div>
                
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Campo de detección 360° con feedback en tiempo real
                </p>
              </div>

              {/* Benefits list */}
              <div className="space-y-3">
                {solutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-accent/5 border border-accent/10"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + solution.delay }}
                  >
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-accent" />
                    </div>
                    <p className="text-foreground text-sm">{solution.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
