"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Eye,
  ExternalLink,
  Sun,
  Moon,
  Type,
  Contrast,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram
} from "lucide-react"
import { Button } from "@/components/ui/button"

const footerLinks = {
  product: {
    title: "Producto",
    links: [
      { name: "Características", href: "#visualizer" },
      { name: "Especificaciones", href: "#specs" },
      { name: "Cómo funciona", href: "#how-it-works" },
      { name: "Testimonios", href: "#testimonials" }
    ]
  },
  support: {
    title: "Soporte",
    links: [
      { name: "Centro de ayuda", href: "#faq" },
      { name: "Contacto", href: "#contact" },
      { name: "Garantía", href: "#" },
      { name: "Tutoriales", href: "#" }
    ]
  },
  company: {
    title: "Empresa",
    links: [
      { name: "Sobre nosotros", href: "#" },
      { name: "Carreras", href: "#" },
      { name: "Prensa", href: "#" },
      { name: "Blog", href: "#" }
    ]
  },
  resources: {
    title: "Recursos",
    links: [
      { name: "ONCE", href: "https://www.once.es", external: true },
      { name: "FOAL", href: "https://www.foal.es", external: true },
      { name: "WCAG Guidelines", href: "https://www.w3.org/WAI/WCAG21/quickref/", external: true },
      { name: "Accesibilidad Web", href: "#" }
    ]
  }
}

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" }
]

export function FooterSection() {
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal")
  const [highContrast, setHighContrast] = useState(false)

  const handleFontSize = () => {
    const sizes: ("normal" | "large" | "xlarge")[] = ["normal", "large", "xlarge"]
    const currentIndex = sizes.indexOf(fontSize)
    const nextIndex = (currentIndex + 1) % sizes.length
    setFontSize(sizes[nextIndex])
    
    // Apply to document
    const root = document.documentElement
    const fontSizes = { normal: "16px", large: "18px", xlarge: "20px" }
    root.style.fontSize = fontSizes[sizes[nextIndex]]
  }

  const handleContrast = () => {
    setHighContrast(!highContrast)
    document.documentElement.classList.toggle("high-contrast")
  }

  return (
    <footer
      className="bg-card border-t border-border"
      role="contentinfo"
      aria-label="Pie de página"
    >
      {/* Accessibility toolbar */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-sm text-muted-foreground">
              Opciones de accesibilidad
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleFontSize}
                className="gap-2 bg-transparent"
                aria-label={`Cambiar tamaño de fuente. Actual: ${fontSize}`}
              >
                <Type className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {fontSize === "normal" ? "A" : fontSize === "large" ? "A+" : "A++"}
                </span>
              </Button>
              <Button
                variant={highContrast ? "default" : "outline"}
                size="sm"
                onClick={handleContrast}
                className={`gap-2 ${!highContrast ? "bg-transparent" : ""}`}
                aria-label={`Alto contraste: ${highContrast ? "activado" : "desactivado"}`}
                aria-pressed={highContrast}
              >
                <Contrast className="w-4 h-4" />
                <span className="hidden sm:inline">Alto contraste</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <a 
              href="#" 
              className="flex items-center gap-2 mb-4"
              aria-label="LENSSENS - Inicio"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Eye className="w-5 h-5 text-accent" />
              </div>
              <span className="font-bold text-foreground">LENSSENS</span>
            </a>
            <p className="text-sm text-muted-foreground mb-6">
              Tecnología que empodera. Lentes inteligentes con sensor ultrasónico 
              diseñados para brindar seguridad e independencia.
            </p>
            
            {/* Social links */}
            <div className="flex gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent/40 transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                      {...(link.external ? { 
                        target: "_blank", 
                        rel: "noopener noreferrer" 
                      } : {})}
                    >
                      {link.name}
                      {link.external && (
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © {new Date().getFullYear()} LENSSENS. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Política de privacidad
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Términos de uso
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Accesibilidad
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Certification badges */}
      <div className="bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-accent/20 flex items-center justify-center text-accent font-bold text-[10px]">
                CE
              </span>
              Certificación CE
            </span>
            <span className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-accent/20 flex items-center justify-center text-accent font-bold text-[10px]">
                IP67
              </span>
              Resistente al agua
            </span>
            <span className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-accent/20 flex items-center justify-center text-accent font-bold text-[10px]">
                AA
              </span>
              WCAG 2.1 AA
            </span>
            <span className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-accent/20 flex items-center justify-center text-accent font-bold text-[10px]">
                FCC
              </span>
              FCC Compliant
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
