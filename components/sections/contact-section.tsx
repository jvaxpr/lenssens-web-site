"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { 
  Calendar, 
  Mail, 
  Phone, 
  User, 
  MessageSquare,
  Building,
  Clock,
  CheckCircle2,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FormData {
  name: string
  email: string
  phone: string
  company?: string
  inquiryType: "demo" | "purchase" | "support" | "partnership"
  message: string
  preferredDate?: string
  preferredTime?: string
}

const inquiryTypes = [
  { value: "demo", label: "Solicitar demostración", icon: Calendar },
  { value: "purchase", label: "Información de compra", icon: Building },
  { value: "support", label: "Soporte técnico", icon: MessageSquare },
  { value: "partnership", label: "Alianzas y distribución", icon: User }
]

const timeSlots = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00"
]

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      inquiryType: "demo"
    }
  })

  const selectedType = watch("inquiryType")
  const showScheduler = selectedType === "demo"

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("[v0] Form submitted:", data)
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <section
      id="contact"
      className="py-24 lg:py-32 bg-background"
      ref={containerRef}
      aria-label="Contacto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-accent bg-accent/10 rounded-full mb-4">
              Contáctanos
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Comienza tu Camino hacia la Independencia
            </h2>
            <p className="text-muted-foreground mb-8 text-pretty">
              Estamos aquí para responder tus preguntas y ayudarte a descubrir 
              cómo LENSSENS puede transformar tu día a día.
            </p>

            {/* Contact methods */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Teléfono</h3>
                  <p className="text-muted-foreground">+58 4244974269</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Email</h3>
                  <p className="text-muted-foreground">info@lensens.pro</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Horario de atención</h3>
                  <p className="text-muted-foreground">Lun - Vie: 9:00 - 18:00 (VET)</p>
                </div>
              </div>
            </div>

            {/* Accessibility note */}
            <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
              <p className="text-sm text-foreground">
                <strong>Accesibilidad:</strong> Nuestro equipo está entrenado para 
                atender a personas con discapacidad visual. Ofrecemos soporte por 
                teléfono, videollamada con intérprete y chat con tecnologías de 
                asistencia.
              </p>
            </div>
          </motion.div>

          {/* Right column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {!isSubmitted ? (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-6 sm:p-8 rounded-2xl bg-card border border-border"
              >
                <h3 className="text-xl font-bold text-foreground mb-6">
                  Envíanos un mensaje
                </h3>

                {/* Inquiry type selector */}
                <div className="mb-6">
                  <Label className="text-foreground mb-3 block">Tipo de consulta</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {inquiryTypes.map((type) => {
                      const Icon = type.icon
                      return (
                        <label
                          key={type.value}
                          className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
                            selectedType === type.value
                              ? "bg-accent/20 border-accent/40 text-foreground"
                              : "bg-background border-border text-muted-foreground hover:border-accent/20"
                          }`}
                        >
                          <input
                            type="radio"
                            value={type.value}
                            {...register("inquiryType")}
                            className="sr-only"
                          />
                          <Icon className="w-4 h-4 shrink-0" />
                          <span className="text-sm">{type.label}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>

                {/* Name and Email */}
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="name" className="text-foreground">
                      Nombre completo *
                    </Label>
                    <div className="relative mt-2">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="name"
                        {...register("name", { required: "El nombre es requerido" })}
                        placeholder="Tu nombre"
                        className="pl-10 bg-background"
                        aria-invalid={errors.name ? "true" : "false"}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground">
                      Correo electrónico *
                    </Label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        {...register("email", {
                          required: "El email es requerido",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Email inválido"
                          }
                        })}
                        placeholder="tu@email.com"
                        className="pl-10 bg-background"
                        aria-invalid={errors.email ? "true" : "false"}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Phone and Company */}
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="phone" className="text-foreground">
                      Teléfono *
                    </Label>
                    <div className="relative mt-2">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        {...register("phone", { required: "El teléfono es requerido" })}
                        placeholder="+58 412 0000000"
                        className="pl-10 bg-background"
                        aria-invalid={errors.phone ? "true" : "false"}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="company" className="text-foreground">
                      Organización (opcional)
                    </Label>
                    <div className="relative mt-2">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="company"
                        {...register("company")}
                        placeholder="Tu organización"
                        className="pl-10 bg-background"
                      />
                    </div>
                  </div>
                </div>

                {/* Scheduler for demos */}
                {showScheduler && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 p-4 rounded-lg bg-background border border-border"
                  >
                    <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent" />
                      Agendar demostración
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="preferredDate" className="text-muted-foreground text-sm">
                          Fecha preferida
                        </Label>
                        <Input
                          id="preferredDate"
                          type="date"
                          {...register("preferredDate")}
                          className="mt-2 bg-card"
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                      <div>
                        <Label className="text-muted-foreground text-sm">
                          Horario preferido
                        </Label>
                        <select
                          {...register("preferredTime")}
                          className="mt-2 w-full h-10 px-3 rounded-md bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          <option value="">Seleccionar horario</option>
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Message */}
                <div className="mb-6">
                  <Label htmlFor="message" className="text-foreground">
                    Mensaje *
                  </Label>
                  <textarea
                    id="message"
                    {...register("message", { required: "El mensaje es requerido" })}
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    className="mt-2 w-full min-h-[120px] p-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                    aria-invalid={errors.message ? "true" : "false"}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar mensaje"
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Al enviar, aceptas nuestra política de privacidad. Respondemos en 24h.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-card border border-border text-center"
              >
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  ¡Mensaje enviado!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Gracias por contactarnos. Nuestro equipo te responderá 
                  en un plazo máximo de 24 horas hábiles.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setIsSubmitted(false)}
                  className="bg-transparent"
                >
                  Enviar otro mensaje
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
