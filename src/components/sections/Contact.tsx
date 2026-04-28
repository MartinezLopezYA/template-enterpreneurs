'use client'

import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function Contact() {
    const [form, setForm] = useState({ who: '', description: '' })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    const Chat = FaWhatsapp;

    return (
        <section id="contact" className="relative w-full h-auto min-h-100 md:min-h-120 py-10 bg-(--surface-color) shadow-header-footer border-b border-(--secondary-color)/10">
            <div className="max-w-xl mx-auto px-6 flex flex-col gap-10">
                <div className="text-center flex flex-col gap-1">
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-(--primary-color)">¿Tienes dudas?</p>
                    <h2 className="text-3xl font-bold text-(--secondary-color)">Escribenos</h2>
                    <p className="text-sm text-(--secondary-color)/40 max-w-sm mx-auto">
                        ¿No sabes cuál elegir? Te asesoramos para encontrar la pieza perfecta para ti o para regalar.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold tracking-[0.15em] uppercase text-(--primary-color)">
                            Dinos quién eres
                        </label>
                        <input type="text" placeholder="Tu nombre o cómo te llamamos" value={form.who} onChange={e => setForm(f => ({ ...f, who: e.target.value }))} className="w-full px-4 py-3 rounded-xl bg-white border border-(--primary-color)/20 text-(--secondary-color) placeholder:text-(--secondary-color)/30 text-sm outline-none focus:border-(--primary-color)/60 focus:shadow-[0_0_0_3px_#E8799A18] transition-all duration-200"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold tracking-[0.15em] uppercase text-(--primary-color)">
                            ¿Qué necesitas?
                        </label>
                        <textarea placeholder="Cuéntanos tu petición con el mayor detalle posible..." rows={4} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="w-full px-4 py-3 rounded-xl bg-white border border-(--primary-color)/20 text-(--secondary-color) placeholder:text-(--secondary-color)/30 text-sm outline-none focus:border-(--primary-color)/60 focus:shadow-[0_0_0_3px_#E8799A18] transition-all duration-200 resize-none"
                        />
                    </div>

                    <button type="submit" className="w-full inline-flex justify-center items-center gap-2 py-3 rounded-xl bg-(--primary-color) hover:bg-(--primary-color-hover) text-white text-sm font-semibold tracking-wide transition-all duration-200 hover:shadow-[0_8px_24px_#E8799A30] active:scale-[0.98] cursor-pointer">
                        <Chat size={15} strokeWidth={2} />
                        Enviar mensaje
                    </button>
                </form>
            </div>
        </section>
    )

}