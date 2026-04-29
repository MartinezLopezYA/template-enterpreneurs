'use client';

import { ShoppingCart } from 'lucide-react';

export default function ProductCard({ product }: { product: { name: string; description: string; categories: string; sizes: number[]; price: number; current: boolean } }) {
    const { name, description, categories, sizes, price, current } = product;

    const formatPrice = (value: number) =>
        new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);

    return (
        <div className={`group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 ${
            current
                ? 'border-(--primary-color)/20 hover:border-(--primary-color)/50 hover:shadow-[0_8px_30px_rgba(232,121,154,0.12)]'
                : 'border-(--secondary-color)/8 opacity-70 hover:opacity-85'
        }`}>
            <div className="relative h-44 bg-(--primary-color)/8 flex items-center justify-center overflow-hidden">
                <svg className="w-14 h-14 text-(--primary-color)/25 transition-transform duration-500 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {!current && (
                    <div className="absolute inset-0 bg-(--surface-color)/65 backdrop-blur-[1px] flex items-center justify-center">
                        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-(--secondary-color)/35">Agotado</span>
                    </div>
                )}
            </div>
            <div className="flex flex-col flex-1 p-4 gap-3 bg-white">
                <div className="flex justify-between items-center">
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-(--primary-color)/10 text-(--primary-color) font-semibold">
                        {categories}
                    </span>
                    <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${
                        current
                            ? 'bg-(--accent-color)/25 text-(--primary-color)'
                            : 'bg-(--secondary-color)/5 text-(--secondary-color)/30'
                    }`}>
                        {current ? 'Disponible' : 'Agotado'}
                    </span>
                </div>
                <div>
                    <h3 className="font-semibold text-(--secondary-color) leading-snug text-[15px]">{name}</h3>
                    <p className="text-xs text-(--secondary-color)/40 mt-1 line-clamp-2 leading-relaxed">{description}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                    {sizes.map(size => (
                        <span key={size} className="text-[11px] border border-(--primary-color)/20 text-(--secondary-color)/45 px-2 py-0.5 rounded-md">
                            {size}
                        </span>
                    ))}
                </div>

                <div className="flex justify-between items-center mt-auto pt-1 border-t border-(--primary-color)/10">
                    <span className="font-bold text-(--secondary-color) text-[15px]">
                        {formatPrice(price)}
                    </span>
                    <button disabled={!current} className={`text-xs px-4 py-1.5 rounded-xl font-semibold transition-all duration-200 ${
                        current
                            ? 'bg-(--primary-color) hover:bg-(--primary-color-hover) hover:scale-105 active:scale-95 cursor-pointer'
                            : 'bg-(--primary-color)/70 text-(--secondary-color)/20 cursor-not-allowed'
                        }`}>
                        <ShoppingCart size={17} strokeWidth={1.5} className="text-(--surface-color) transition-colors duration-200" />
                    </button>
                </div>
            </div>
        </div>
    );
}
