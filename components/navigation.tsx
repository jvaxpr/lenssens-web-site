"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, Menu, X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { name: "Inicio", href: "#" },
  { name: "Producto", href: "#visualizer" },
  { name: "Cómo funciona", href: "#how-it-works" },
  { name: "Especificaciones", href: "#specs" },
  { name: "Testimonios", href: "#testimonials" },
  { name: "FAQ", href: "#faq" },
  { name: "Contacto", href: "#contact" }
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false)
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          role="navigation"
          aria-label="Navegación principal"
        >
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("#")
              }}
              className="flex items-center gap-2"
              aria-label="LENSSENS - Inicio"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Eye className="w-5 h-5 text-accent" />
              </div>
              <span className="font-bold text-foreground hidden sm:block">
                LENSSENS
              </span>
            </a>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(link.href)
                  }}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:inline-flex bg-transparent"
                onClick={() => scrollToSection("#contact")}
              >
                Contactar
              </Button>
              <Button
                size="sm"
                onClick={() => scrollToSection("#contact")}
                className="hidden sm:inline-flex"
              >
                Reservar demo
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-background/95 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu content */}
            <motion.nav
              className="absolute top-20 left-0 right-0 p-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1 }}
            >
              <ul className="space-y-1">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection(link.href)
                      }}
                      className="flex items-center justify-between p-4 rounded-lg text-foreground hover:bg-card transition-colors"
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-border space-y-3">
                <Button
                  className="w-full"
                  onClick={() => scrollToSection("#contact")}
                >
                  Reservar demo gratuita
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => scrollToSection("#contact")}
                >
                  Contactar ventas
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
