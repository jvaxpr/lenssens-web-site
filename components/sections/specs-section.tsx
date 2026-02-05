"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { 
  Filter, 
  Download, 
  Cpu, 
  Battery, 
  Wifi, 
  Shield, 
  Ruler,
  Check,
  X as XIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface Spec {
  category: string
  name: string
  value: string
  competitor?: string
}

const categories = [
  { id: "all", name: "Todos", icon: Filter },
  { id: "hardware", name: "Hardware", icon: Cpu },
  { id: "battery", name: "Batería", icon: Battery },
  { id: "connectivity", name: "Conectividad", icon: Wifi },
  { id: "safety", name: "Seguridad", icon: Shield },
  { id: "dimensions", name: "Dimensiones", icon: Ruler }
]

const specs: Spec[] = [
  // Hardware Components
  { category: "hardware", name: "Lentes", value: "Óptica estándar con protección UV", competitor: "Básicos" },
  { category: "hardware", name: "Procesador", value: "Arduino Nano o Arduino Uno", competitor: "Microcontrolador básico" },
  { category: "hardware", name: "Sensor Ultrasónico", value: "Detección de 50cm de distancia", competitor: "Sensores simples" },
  { category: "hardware", name: "Buzzer Activo", value: "Alerta sonora frecuencia variable", competitor: "Buzzer pasivo" },
  
  // Power
  { category: "battery", name: "Tipo de batería", value: "Pila recargable de litio", competitor: "Batería alcalina" },
  { category: "battery", name: "Autonomía", value: "12 horas continuas", competitor: "4-6 horas" },
  { category: "battery", name: "Carga", value: "USB recargable", competitor: "No recargable" },
  
  // Electronics
  { category: "connectivity", name: "Elevador de voltaje", value: "Incluido para optimizar potencia", competitor: "No incluido" },
  { category: "connectivity", name: "Interruptor", value: "Control de encendido/apagado", competitor: "Sin control manual" },
  
  // Physical
  { category: "dimensions", name: "Peso", value: "50g aproximadamente", competitor: "85g" },
  { category: "dimensions", name: "Material de lentes", value: "Policarbonato resistente", competitor: "Plástico estándar" },
  { category: "dimensions", name: "Acabado", value: "Diseño minimalista y discreto", competitor: "Bulto aparente" }
]

export function SpecsSection() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [showComparison, setShowComparison] = useState(false)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const filteredSpecs = activeCategory === "all"
    ? specs
    : specs.filter((spec) => spec.category === activeCategory)

  return (
    <section
      id="specs"
      className="py-24 lg:py-32 bg-background"
      ref={containerRef}
      aria-label="Especificaciones Técnicas"
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
            Detalles Técnicos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Especificaciones Técnicas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Componentes de calidad diseñados para ofrecer máximo rendimiento, 
            seguridad y autonomía en cada momento.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <Button
                  key={cat.id}
                  variant={activeCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`gap-2 ${activeCategory !== cat.id ? "bg-transparent" : ""}`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </Button>
              )
            })}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant={showComparison ? "default" : "outline"}
              size="sm"
              onClick={() => setShowComparison(!showComparison)}
              className={!showComparison ? "bg-transparent" : ""}
            >
              {showComparison ? "Ocultar comparativa" : "Ver comparativa"}
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Descargar PDF
            </Button>
          </div>
        </motion.div>

        {/* Specs table */}
        <motion.div
          className="overflow-hidden rounded-2xl border border-border bg-card"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 font-semibold text-foreground">Especificación</th>
                  <th className="text-left p-4 font-semibold text-foreground">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-accent" />
                      Lensens
                    </div>
                  </th>
                  {showComparison && (
                    <th className="text-left p-4 font-semibold text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                        Alternativas
                      </div>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredSpecs.map((spec, index) => (
                  <motion.tr
                    key={`${spec.category}-${spec.name}`}
                    className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                  >
                    <td className="p-4">
                      <span className="text-muted-foreground">{spec.name}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-accent shrink-0" />
                        <span className="text-foreground font-medium">{spec.value}</span>
                      </div>
                    </td>
                    {showComparison && (
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {spec.competitor === "No incluido" || spec.competitor === "No disponible" ? (
                            <XIcon className="w-4 h-4 text-destructive shrink-0" />
                          ) : (
                            <span className="w-4 h-4 shrink-0" />
                          )}
                          <span className="text-muted-foreground">{spec.competitor}</span>
                        </div>
                      </td>
                    )}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {[
            { icon: Shield, label: "Detección confiable", desc: "Sensor ultrasónico preciso" },
            { icon: Battery, label: "12 horas de uso", desc: "Batería de litio recargable" },
            { icon: Cpu, label: "Procesador eficiente", desc: "Arduino Nano optimizado" },
            { icon: Wifi, label: "Diseño compacto", desc: "50g ultraligero" }
          ].map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className="p-4 rounded-xl bg-card border border-border text-center"
              >
                <Icon className="w-6 h-6 text-accent mx-auto mb-2" />
                <h4 className="font-medium text-foreground text-sm">{item.label}</h4>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
