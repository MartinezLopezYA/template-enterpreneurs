'use client';

import { useState, useEffect } from "react";
import ProductCard from "../ui/ProductCard";
import type { Product } from "@/types/product";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [activeSize, setActiveSize] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/products')
            .then(r => r.json())
            .then(data => setProducts(data.products ?? []))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
    const sizes = [...new Set(products.flatMap(p => p.sizes))].sort((a, b) => {
        const na = Number(a), nb = Number(b);
        return !isNaN(na) && !isNaN(nb) ? na - nb : a.localeCompare(b);
    });

    const filtered = products.filter(p => {
        const catMatch = !activeCategory || p.category === activeCategory;
        const sizeMatch = !activeSize || p.sizes.includes(activeSize);
        return catMatch && sizeMatch;
    });

    const toggleCategory = (cat: string) => setActiveCategory(prev => prev === cat ? null : cat);
    const toggleSize = (size: string) => setActiveSize(prev => prev === size ? null : size);

    return (
        <section id="catalog" className="w-full bg-white">
            <div className="max-w-6xl mx-auto p-4 md:p-10 flex flex-col gap-8">
                <div className="text-center flex flex-col gap-1">
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-(--primary-color)">Colección</p>
                    <h2 className="text-3xl font-bold text-(--secondary-color)">Catálogo</h2>
                    <p className="text-sm text-(--secondary-color)/40 max-w-sm mx-auto">
                        Explora nuestros productos. Filtra por categoría o talla.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="rounded-2xl border border-(--primary-color)/10 overflow-hidden animate-pulse">
                                <div className="h-44 bg-(--primary-color)/5" />
                                <div className="p-4 flex flex-col gap-3">
                                    <div className="h-3 bg-(--secondary-color)/8 rounded w-2/3" />
                                    <div className="h-3 bg-(--secondary-color)/5 rounded w-full" />
                                    <div className="h-8 bg-(--primary-color)/5 rounded-xl mt-2" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        {(categories.length > 0 || sizes.length > 0) && (
                            <div className="flex flex-col gap-3">
                                {categories.length > 0 && (
                                    <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                                        <button
                                            onClick={() => setActiveCategory(null)}
                                            className={`shrink-0 py-1.5 px-5 rounded-full border text-sm font-medium transition-all duration-200 cursor-pointer ${
                                                !activeCategory
                                                    ? 'bg-(--primary-color) text-white border-(--primary-color) shadow-sm'
                                                    : 'border-(--primary-color)/30 text-(--secondary-color)/55 hover:border-(--primary-color)/60 hover:text-(--secondary-color)/80 hover:bg-(--primary-color)/5'
                                            }`}
                                        >
                                            Todos
                                        </button>
                                        {categories.map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => toggleCategory(cat)}
                                                className={`shrink-0 py-1.5 px-5 rounded-full border text-sm font-medium transition-all duration-200 cursor-pointer ${
                                                    activeCategory === cat
                                                        ? 'bg-(--primary-color) text-white border-(--primary-color) shadow-sm'
                                                        : 'border-(--primary-color)/30 text-(--secondary-color)/55 hover:border-(--primary-color)/60 hover:text-(--secondary-color)/80 hover:bg-(--primary-color)/5'
                                                }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {sizes.length > 0 && (
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-[10px] font-semibold tracking-widest uppercase text-(--secondary-color)/35">Talla</span>
                                        <div className="w-px h-3 bg-(--secondary-color)/15" />
                                        {sizes.map(size => (
                                            <button
                                                key={size}
                                                onClick={() => toggleSize(size)}
                                                className={`min-w-9 h-9 px-2 rounded-full border text-xs font-semibold transition-all duration-200 cursor-pointer ${
                                                    activeSize === size
                                                        ? 'bg-(--primary-color) text-white border-(--primary-color) shadow-sm scale-110'
                                                        : 'border-(--primary-color)/25 text-(--secondary-color)/50 hover:border-(--primary-color) hover:text-(--primary-color) hover:scale-105'
                                                }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                        {(activeCategory || activeSize) && (
                                            <button
                                                onClick={() => { setActiveCategory(null); setActiveSize(null); }}
                                                className="ml-1 text-[11px] text-(--secondary-color)/35 hover:text-(--primary-color) underline underline-offset-2 transition-colors cursor-pointer"
                                            >
                                                Limpiar
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        <p className="text-xs text-(--secondary-color)/35 -mt-4">
                            {filtered.length} {filtered.length === 1 ? 'producto' : 'productos'}
                            {(activeCategory || activeSize) && ' encontrados'}
                        </p>

                        {filtered.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                                {filtered.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-24 flex flex-col items-center gap-3 text-(--secondary-color)/25">
                                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <p className="text-sm">Sin resultados para esta combinación</p>
                                <button
                                    onClick={() => { setActiveCategory(null); setActiveSize(null); }}
                                    className="text-xs text-(--primary-color) underline underline-offset-2 cursor-pointer"
                                >
                                    Ver todos los productos
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
