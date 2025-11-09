"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react";

export default function ContactSection() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/SEU_FORM_ID", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contato" className="py-24 bg-neutral-900 text-neutral-100">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-amber-500 mb-4">
              Entre em Contato
            </h2>
            <p className="text-neutral-400 text-lg">
              Vamos criar uma experiência gastronômica memorável
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Seu Nome"
                  required
                  disabled={status === "loading"}
                  className="w-full px-4 py-4 bg-neutral-800 border border-neutral-700 text-white rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Seu E-mail"
                  required
                  disabled={status === "loading"}
                  className="w-full px-4 py-4 bg-neutral-800 border border-neutral-700 text-white rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Telefone"
                  required
                  disabled={status === "loading"}
                  className="w-full px-4 py-4 bg-neutral-800 border border-neutral-700 text-white rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Sua Mensagem"
                  required
                  rows={5}
                  disabled={status === "loading"}
                  className="w-full px-4 py-4 bg-neutral-800 border border-neutral-700 text-white rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500 resize-none disabled:opacity-50"
                />
              </div>

              {status === "success" && (
                <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400">
                  ✅ Mensagem enviada com sucesso!
                </div>
              )}

              {status === "error" && (
                <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
                  ❌ Erro ao enviar. Tente novamente.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-lg font-medium transition-all transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Enviando..." : "Enviar Mensagem"}
              </button>
            </form>

            {/* Informações de contato */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white mb-1">E-mail</p>
                  <p className="text-neutral-400">contato@chefricardo.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white mb-1">Telefone</p>
                  <p className="text-neutral-400">+55 (71) 99999-9999</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white mb-1">Localização</p>
                  <p className="text-neutral-400">Salvador, Bahia - Brasil</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Calendar className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white mb-1">
                    Horário de Atendimento
                  </p>
                  <p className="text-neutral-400">Segunda - Sexta: 9h às 18h</p>
                  <p className="text-neutral-400">Sábado: 10h às 14h</p>
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-700">
                <p className="font-semibold text-white mb-4">
                  Siga nas Redes Sociais
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-neutral-800 text-amber-500 p-3 rounded-full hover:bg-amber-600 hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>

                  <a
                    href="#"
                    className="bg-neutral-800 text-amber-500 p-3 rounded-full hover:bg-amber-600 hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>

                  <a
                    href="#"
                    className="bg-neutral-800 text-amber-500 p-3 rounded-full hover:bg-amber-600 hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botão flutuante WhatsApp */}
      <a
        href="https://wa.me/5571999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 z-50"
        aria-label="WhatsApp"
      >
        <Phone className="w-6 h-6" />
      </a>
    </section>
  );
}
