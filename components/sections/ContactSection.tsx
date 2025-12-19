// landing-chef/components/sections/ContactSection.tsx
"use client";

import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Instagram,
  Facebook,
  Linkedin,
  ArrowRight,
  Sparkles,
  Send,
  CheckCircle,
  XCircle,
  MessageSquare,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Types
interface ContactSectionProps {
  className?: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Constants
const INTERSECTION_THRESHOLD = 0.1;
const SUCCESS_MESSAGE_DURATION = 5000;

export default function ContactSection({
  className = "",
}: ContactSectionProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer para animações
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: INTERSECTION_THRESHOLD,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // Validação básica
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), SUCCESS_MESSAGE_DURATION);
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("https://formspree.io/f/SEU_FORM_ID", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setStatus("idle"), SUCCESS_MESSAGE_DURATION);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), SUCCESS_MESSAGE_DURATION);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), SUCCESS_MESSAGE_DURATION);
    }
  };

  const sectionClasses = `
    py-16 sm:py-20 md:py-24 lg:py-28 
    relative overflow-hidden
    ${className}
  `.trim();

  const headerClasses = `
    text-center mb-12 sm:mb-16
    transition-all duration-700
    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
  `.trim();

  return (
    <section
      ref={sectionRef}
      id="contato"
      className={sectionClasses}
      aria-labelledby="contact-heading"
    >
      {/* Background com gradientes */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-900/95 to-neutral-950"
        aria-hidden="true"
      />

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(245 158 11) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      {/* Decorative blurs */}
      <div
        className="absolute top-1/4 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className={headerClasses}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <MessageSquare
                className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500"
                aria-hidden="true"
              />
              <h2
                id="contact-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500"
              >
                Entre em Contato
              </h2>
            </div>
            <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Vamos criar uma experiência gastronômica memorável juntos
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <span
                className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500"
                aria-hidden="true"
              />
              <Sparkles className="w-4 h-4 text-amber-500" aria-hidden="true" />
              <span
                className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Content Grid */}
          <div
            className={`
            grid md:grid-cols-2 gap-8 lg:gap-16
            transition-all duration-700 delay-200
            ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }
          `}
          >
            {/* Formulário */}
            <div className="order-2 md:order-1">
              <div className="space-y-4 sm:space-y-6">
                {/* Nome */}
                <div>
                  <label htmlFor="name" className="sr-only">
                    Seu Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Seu Nome *"
                    required
                    disabled={status === "loading"}
                    className="
                      w-full px-4 py-3 sm:py-4 
                      bg-neutral-800/50 backdrop-blur-sm
                      border border-neutral-700/50 
                      text-white placeholder:text-neutral-500
                      rounded-xl
                      transition-all duration-300
                      focus:outline-none focus:border-amber-500 
                      focus:ring-2 focus:ring-amber-500/50
                      hover:border-neutral-600
                      disabled:opacity-50 disabled:cursor-not-allowed
                    "
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="sr-only">
                    Seu E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Seu E-mail *"
                    required
                    disabled={status === "loading"}
                    className="
                      w-full px-4 py-3 sm:py-4 
                      bg-neutral-800/50 backdrop-blur-sm
                      border border-neutral-700/50 
                      text-white placeholder:text-neutral-500
                      rounded-xl
                      transition-all duration-300
                      focus:outline-none focus:border-amber-500 
                      focus:ring-2 focus:ring-amber-500/50
                      hover:border-neutral-600
                      disabled:opacity-50 disabled:cursor-not-allowed
                    "
                  />
                </div>

                {/* Telefone */}
                <div>
                  <label htmlFor="phone" className="sr-only">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Telefone *"
                    required
                    disabled={status === "loading"}
                    className="
                      w-full px-4 py-3 sm:py-4 
                      bg-neutral-800/50 backdrop-blur-sm
                      border border-neutral-700/50 
                      text-white placeholder:text-neutral-500
                      rounded-xl
                      transition-all duration-300
                      focus:outline-none focus:border-amber-500 
                      focus:ring-2 focus:ring-amber-500/50
                      hover:border-neutral-600
                      disabled:opacity-50 disabled:cursor-not-allowed
                    "
                  />
                </div>

                {/* Mensagem */}
                <div>
                  <label htmlFor="message" className="sr-only">
                    Sua Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Conte-nos sobre seu evento ou necessidade... *"
                    required
                    rows={5}
                    disabled={status === "loading"}
                    className="
                      w-full px-4 py-3 sm:py-4 
                      bg-neutral-800/50 backdrop-blur-sm
                      border border-neutral-700/50 
                      text-white placeholder:text-neutral-500
                      rounded-xl
                      transition-all duration-300
                      focus:outline-none focus:border-amber-500 
                      focus:ring-2 focus:ring-amber-500/50
                      hover:border-neutral-600
                      resize-none
                      disabled:opacity-50 disabled:cursor-not-allowed
                    "
                  />
                </div>

                {/* Status Messages */}
                {status === "success" && (
                  <div
                    className="
                      flex items-center gap-3 p-4 
                      bg-emerald-500/10 border border-emerald-500/50 
                      rounded-xl text-emerald-400
                    "
                    role="alert"
                  >
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm sm:text-base">
                      Mensagem enviada com sucesso! Responderemos em breve.
                    </p>
                  </div>
                )}

                {status === "error" && (
                  <div
                    className="
                      flex items-center gap-3 p-4 
                      bg-red-500/10 border border-red-500/50 
                      rounded-xl text-red-400
                    "
                    role="alert"
                  >
                    <XCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm sm:text-base">
                      Erro ao enviar mensagem. Verifique os campos e tente
                      novamente.
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                  className="
                    group/submit relative w-full
                    inline-flex items-center justify-center gap-3
                    bg-gradient-to-r from-amber-500 to-amber-600
                    hover:from-amber-400 hover:to-amber-500
                    text-neutral-950 px-6 py-3 sm:py-4
                    rounded-xl font-bold text-sm sm:text-base
                    transition-all duration-300
                    hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/40
                    active:scale-95
                    disabled:opacity-50 disabled:cursor-not-allowed
                    disabled:hover:scale-100
                    focus-visible:outline-none focus-visible:ring-2 
                    focus-visible:ring-amber-500 focus-visible:ring-offset-2 
                    focus-visible:ring-offset-neutral-900
                    overflow-hidden
                  "
                >
                  {/* Shimmer effect */}
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/submit:translate-x-full transition-transform duration-1000"
                    aria-hidden="true"
                  />

                  {status === "loading" ? (
                    <>
                      <div
                        className="w-5 h-5 border-2 border-neutral-950/30 border-t-neutral-950 rounded-full animate-spin"
                        aria-hidden="true"
                      />
                      <span className="relative z-10">Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send
                        className="relative z-10 w-5 h-5"
                        aria-hidden="true"
                      />
                      <span className="relative z-10">Enviar Mensagem</span>
                      <ArrowRight
                        className="relative z-10 w-5 h-5 group-hover/submit:translate-x-1 transition-transform"
                        aria-hidden="true"
                      />
                    </>
                  )}
                </button>

                <p className="text-xs sm:text-sm text-neutral-500 text-center">
                  * Campos obrigatórios
                </p>
              </div>
            </div>

            {/* Informações de Contato */}
            <div className="order-1 md:order-2 space-y-6 sm:space-y-8">
              {/* Email */}
              <div className="group flex items-start gap-4 p-4 sm:p-6 rounded-xl bg-neutral-800/30 backdrop-blur-sm border border-neutral-700/30 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1">
                <div className="p-3 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform duration-300">
                  <Mail
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white mb-1 text-sm sm:text-base">
                    E-mail
                  </p>
                  <a
                    href="mailto:contato@chefhenrique.com.br"
                    className="text-neutral-400 hover:text-amber-400 transition-colors text-sm sm:text-base break-all"
                  >
                    contato@chefhenrique.com.br
                  </a>
                </div>
              </div>

              {/* Telefone */}
              <div className="group flex items-start gap-4 p-4 sm:p-6 rounded-xl bg-neutral-800/30 backdrop-blur-sm border border-neutral-700/30 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1">
                <div className="p-3 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform duration-300">
                  <Phone
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white mb-1 text-sm sm:text-base">
                    Telefone
                  </p>
                  <a
                    href="tel:+5571996467680"
                    className="text-neutral-400 hover:text-amber-400 transition-colors text-sm sm:text-base"
                  >
                    +55 (71) 99646-7680
                  </a>
                </div>
              </div>

              {/* Localização */}
              <div className="group flex items-start gap-4 p-4 sm:p-6 rounded-xl bg-neutral-800/30 backdrop-blur-sm border border-neutral-700/30 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1">
                <div className="p-3 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform duration-300">
                  <MapPin
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white mb-1 text-sm sm:text-base">
                    Localização
                  </p>
                  <p className="text-neutral-400 text-sm sm:text-base">
                    Salvador, Bahia - Brasil
                  </p>
                </div>
              </div>

              {/* Horário */}
              <div className="group flex items-start gap-4 p-4 sm:p-6 rounded-xl bg-neutral-800/30 backdrop-blur-sm border border-neutral-700/30 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1">
                <div className="p-3 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform duration-300">
                  <Calendar
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white mb-2 text-sm sm:text-base">
                    Horário de Atendimento
                  </p>
                  <div className="space-y-1 text-neutral-400 text-sm sm:text-base">
                    <p>Segunda - Sexta: 9h às 18h</p>
                    <p>Sábado: 10h às 14h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ MUDANÇA 2: Botão Flutuante WhatsApp - Removido animate-ping */}
      <a
        href="https://wa.me/5571996467680"
        target="_blank"
        rel="noopener noreferrer"
        className="
          fixed bottom-6 right-6 sm:bottom-8 sm:right-8
          group/whatsapp
          bg-gradient-to-br from-green-500 to-green-600
          hover:from-green-400 hover:to-green-500
          text-white p-4 sm:p-5 rounded-full
          shadow-2xl shadow-green-500/30
          hover:shadow-green-500/50
          transition-all duration-300
          hover:scale-110 active:scale-95
          z-50
          focus-visible:outline-none focus-visible:ring-2 
          focus-visible:ring-green-500 focus-visible:ring-offset-2 
          focus-visible:ring-offset-neutral-900
        "
        aria-label="Contato via WhatsApp"
      >
        <Phone className="w-6 h-6 sm:w-7 sm:h-7" />
      </a>
    </section>
  );
}
