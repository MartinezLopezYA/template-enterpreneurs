'use client';

import { ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import config from '@/lib/config';
import type { Product } from '@/types/product';

export default function ProductCard({ product }: { product: Product }) {
    const { name, description, category, sizes, price, available, imageUrl } = product;
    const { addItem } = useCart();
    const [added, setAdded] = useState(false);

    const formatPrice = (value: number) =>
        new Intl.NumberFormat(config.locale, {
            style: 'currency',
            currency: config.currency,
            maximumFractionDigits: 0,
        }).format(value);

    function handleAdd() {
        addItem(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    }

    return (
        <div className={`group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 ${
            available
                ? 'border-(--primary-color)/20 hover:border-(--primary-color)/50 hover:shadow-[0_8px_30px_var(--primary-color)/12]'
                : 'border-(--secondary-color)/8 opacity-70 hover:opacity-85'
        }`}>
            <div className="relative h-44 bg-(--primary-color)/8 flex items-center justify-center overflow-hidden">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <svg className="w-14 h-14 text-(--primary-color)/25 transition-transform duration-500 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                )}
                {!available && (
                    <div className="absolute inset-0 bg-(--surface-color)/65 backdrop-blur-[1px] flex items-center justify-center">
                        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-(--secondary-color)/35">Agotado</span>
                    </div>
                )}
            </div>

            <div className="flex flex-col flex-1 p-4 gap-3 bg-white">
                <div className="flex justify-between items-center">
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-(--primary-color)/10 text-(--primary-color) font-semibold">
                        {category}
                    </span>
                    <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${
                        available
                            ? 'bg-(--accent-color)/25 text-(--primary-color)'
                            : 'bg-(--secondary-color)/5 text-(--secondary-color)/30'
                    }`}>
                        {available ? 'Disponible' : 'Agotado'}
                    </span>
                </div>

                <div>
                    <h3 className="font-semibold text-(--secondary-color) leading-snug text-[15px]">{name}</h3>
                    <p className="text-xs text-(--secondary-color)/40 mt-1 line-clamp-2 leading-relaxed">{description}</p>
                </div>

                {sizes.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {sizes.map(size => (
                            <span key={size} className="text-[11px] border border-(--primary-color)/20 text-(--secondary-color)/45 px-2 py-0.5 rounded-md">
                                {size}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex justify-between items-center mt-auto pt-1 border-t border-(--primary-color)/10">
                    <span className="font-bold text-(--secondary-color) text-[15px]">
                        {formatPrice(price)}
                    </span>
                    <button
                        onClick={handleAdd}
                        disabled={!available}
                        className={`px-3 py-1.5 rounded-xl transition-all duration-200 flex items-center justify-center ${
                            !available
                                ? 'bg-(--primary-color)/20 cursor-not-allowed'
                                : added
                                    ? 'bg-green-500 scale-95 cursor-pointer'
                                    : 'bg-(--primary-color) hover:bg-(--primary-color-hover) hover:scale-105 active:scale-95 cursor-pointer'
                        }`}
                    >
                        {added ? (
                            <Check size={17} strokeWidth={2.5} className="text-white" />
                        ) : (
                            <ShoppingCart size={17} strokeWidth={1.5} className="text-(--surface-color)" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
