'use client';

import { useState } from "react";
import ProductCard from "../ui/ProductCard";

export default function Catalog() {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [activeSize, setActiveSize] = useState<number | null>(null);

    const categories = ['Anillos', 'Pulseras', 'Colleras', '2 en 1', '3 en 1'];
    const sizes = [14, 15, 16, 17, 18, 19];

    const products = [
        { name: "Anillo Esencia Minimal", description: "Anillo delicado de diseño limpio, ideal para uso diario.", categories: "Anillos", sizes: [14, 15, 16], price: 45000, current: true },
        { name: "Pulsera Aura Natural", description: "Pulsera con acabado orgánico que resalta lo natural.", categories: "Pulseras", sizes: [15, 16, 17, 18], price: 38000, current: false },
        { name: "Collera Doble Impacto", description: "Collera moderna con diseño de doble cadena.", categories: "Colleras", sizes: [16, 17, 18], price: 52000, current: true },
        { name: "Set Fusión Elegante", description: "Combinación 2 en 1 perfecta para ocasiones especiales.", categories: "2 en 1", sizes: [14, 15, 16, 17], price: 68000, current: true },
        { name: "Trilogía Brillante", description: "Set 3 en 1 con acabado brillante y versátil.", categories: "3 en 1", sizes: [15, 16, 17, 18, 19], price: 85000, current: false },
        { name: "Anillo Eclipse Dorado", description: "Anillo con diseño circular inspirado en eclipses.", categories: "Anillos", sizes: [16, 17, 18], price: 47000, current: true },
        { name: "Pulsera Línea Urbana", description: "Pulsera moderna con estilo urbano minimalista.", categories: "Pulseras", sizes: [14, 15, 16], price: 36000, current: false },
        { name: "Collera Clásica Plata", description: "Collera de estilo clásico con acabado en plata.", categories: "Colleras", sizes: [17, 18, 19], price: 55000, current: true },
        { name: "Duo Esencial", description: "Set 2 en 1 práctico y elegante para combinar.", categories: "2 en 1", sizes: [15, 16, 17], price: 62000, current: true },
        { name: "Trío Contemporáneo", description: "Set 3 en 1 con diseño contemporáneo y versátil.", categories: "3 en 1", sizes: [14, 16, 18], price: 79000, current: false },
    ];

    const filtered = products.filter(p => {
        const catMatch = !activeCategory || p.categories === activeCategory;
        const sizeMatch = !activeSize || p.sizes.includes(activeSize);
        return catMatch && sizeMatch;
    });

    const toggleCategory = (cat: string) => setActiveCategory(prev => prev === cat ? null : cat);
    const toggleSize = (size: number) => setActiveSize(prev => prev === size ? null : size);

    return (
        <section id="catalog" className="w-full bg-white">
            <div className="max-w-6xl mx-auto p-4 md:p-10 flex flex-col gap-8">
                <div className="text-center flex flex-col gap-1">
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-(--primary-color)">Colección</p>
                    <h2 className="text-3xl font-bold text-(--secondary-color)">Catálogo</h2>
                    <p className="text-sm text-(--secondary-color)/40 max-w-sm mx-auto">
                        Piezas únicas para expresar tu estilo. Filtra por categoría o talla.
                    </p>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                        <button onClick={() => setActiveCategory(null)} className={`shrink-0 py-1.5 px-5 rounded-full border text-sm font-medium transition-all duration-200 cursor-pointer ${
                            !activeCategory
                                ? 'bg-(--primary-color) text-white border-(--primary-color) shadow-sm'
                                : 'border-(--primary-color)/30 text-(--secondary-color)/55 hover:border-(--primary-color)/60 hover:text-(--secondary-color)/80 hover:bg-(--primary-color)/5'
                            }`}>
                            Todos
                        </button>
                        {categories.map(cat => (
                            <button key={cat} onClick={() => toggleCategory(cat)} className={`shrink-0 py-1.5 px-5 rounded-full border text-sm font-medium transition-all duration-200 cursor-pointer ${
                                activeCategory === cat
                                    ? 'bg-(--primary-color) text-white border-(--primary-color) shadow-sm'
                                    : 'border-(--primary-color)/30 text-(--secondary-color)/55 hover:border-(--primary-color)/60 hover:text-(--secondary-color)/80 hover:bg-(--primary-color)/5'
                                }`}>
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-semibold tracking-widest uppercase text-(--secondary-color)/35">Talla</span>
                        <div className="w-px h-3 bg-(--secondary-color)/15" />
                        {sizes.map(size => (
                            <button key={size} onClick={() => toggleSize(size)} className={`w-9 h-9 rounded-full border text-xs font-semibold transition-all duration-200 cursor-pointer ${
                                activeSize === size
                                    ? 'bg-(--primary-color) text-white border-(--primary-color) shadow-sm scale-110'
                                    : 'border-(--primary-color)/25 text-(--secondary-color)/50 hover:border-(--primary-color) hover:text-(--primary-color) hover:scale-105'
                                }`}>
                                {size}
                            </button>
                        ))}
                        {(activeCategory || activeSize) && (
                            <button onClick={() => { setActiveCategory(null); setActiveSize(null); }} className="ml-1 text-[11px] text-(--secondary-color)/35 hover:text-(--primary-color) underline underline-offset-2 transition-colors cursor-pointer">
                                Limpiar
                            </button>
                        )}
                    </div>
                </div>
                <p className="text-xs text-(--secondary-color)/35 -mt-4">
                    {filtered.length} {filtered.length === 1 ? 'producto' : 'productos'}
                    {(activeCategory || activeSize) && ' encontrados'}
                </p>
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {filtered.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="py-24 flex flex-col items-center gap-3 text-(--secondary-color)/25">
                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <p className="text-sm">Sin resultados para esta combinación</p>
                        <button onClick={() => { setActiveCategory(null); setActiveSize(null); }} className="text-xs text-(--primary-color) underline underline-offset-2 cursor-pointer">
                            Ver todos los productos
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
