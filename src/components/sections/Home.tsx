'use client';

import { Building2 } from 'lucide-react';

export default function Home() {
    return (
        <section id="home" className="relative w-full h-auto min-h-100 md:min-h-120 lg:min-h-140 bg-(--secondary-color)">
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 mt-16 flex flex-col items-center text-center gap-5">

                <div className="w-16 h-16 rounded-2xl bg-(--bg-card-color) border border-(--border-color) flex items-center justify-center mt-1 shadow-sm">
                    <Building2 size={18} color="var(--primary-color)" strokeWidth={1.5} />
                </div>

                <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-(--surface-color) inline-block lg:inline-flex gap-4 items-center justify-center">
                    Emprendimientos con <span className="text-(--primary-color)">impacto</span>
                </h2>

                <div className="loader w-36 my-0.5"></div>

                <p className="text-base sm:text-lg text-(--surface-color)/50">
                    Transformamos ideas en realidades digitales. Desde el diseño hasta el desarrollo, creamos experiencias únicas que conectan con tu audiencia.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                    <a href="#catalog" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-(--primary-color) text-(--surface-color) text-sm font-semibold hover:bg-(--primary-color-hover) hover:-translate-y-1 transition-all duration-200 shadow-neon">
                        Conocer más
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                        </svg>
                    </a>
                </div>

                <div className="flex items-center gap-8 sm:gap-12 mt-8 pt-7 border-t border-(--border-color) w-full justify-center">
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-2xl font-bold text-(--surface-color) leading-none">20</span>
                        <span className="text-xs text-(--surface-color)/35 tracking-widest uppercase">Clientes</span>
                    </div>
                    <div className="w-px h-7 bg-(--border-color)"></div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-2xl font-bold text-(--surface-color) leading-none">100</span>
                        <span className="text-xs text-(--surface-color)/35 tracking-widest uppercase">Productos</span>
                    </div>
                    <div className="w-px h-7 bg-(--border-color)"></div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-2xl font-bold text-(--surface-color) leading-none">99%</span>
                        <span className="text-xs text-(--surface-color)/35 tracking-widest uppercase">Satisfacción</span>
                    </div>
                </div>
            </div>
        </section>

    )

}