'use client';

import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import config from '@/lib/config';

export default function CartDrawer() {
    const { items, count, total, isOpen, removeItem, updateQty, clearCart, closeCart } = useCart();
    const [name, setName] = useState('');

    const formatPrice = (value: number) =>
        new Intl.NumberFormat(config.locale, {
            style: 'currency',
            currency: config.currency,
            maximumFractionDigits: 0,
        }).format(value);

    const whatsappHref = (() => {
        if (!name.trim()) return undefined;
        const lines = items.map(i =>
            `• ${i.product.name} × ${i.quantity} — ${formatPrice(i.product.price * i.quantity)}`
        );
        const message = [
            `Hola! Soy *${name.trim()}*. Me gustaría hacer el siguiente pedido:`,
            '',
            ...lines,
            '',
            `*Total: ${formatPrice(total)}*`,
        ].join('\n');
        return `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`;
    })();

    return (
        <>
            <div onClick={closeCart} className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 ${
                    isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            />

            <aside className={`fixed top-0 right-0 h-full w-full max-w-sm z-50 bg-(--surface-color) shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                <div className="flex items-center justify-between px-5 py-4 border-b border-(--primary-color)/15">
                    <div className="flex items-center gap-2">
                        <ShoppingBag size={18} color="var(--primary-color)" strokeWidth={1.5} />
                        <span className="font-semibold text-(--secondary-color) text-sm">Tu pedido</span>
                        {count > 0 && (
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-(--primary-color) text-white">
                                {count}
                            </span>
                        )}
                    </div>
                    <button onClick={closeCart} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-(--primary-color)/10 transition-colors cursor-pointer">
                        <X size={16} color="var(--secondary-color)" strokeWidth={2} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-3 px-4 flex flex-col gap-3">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center gap-3 py-20 text-(--secondary-color)/30">
                            <ShoppingBag size={40} strokeWidth={1} />
                            <p className="text-sm">Tu carrito está vacío</p>
                        </div>
                    ) : items.map(({ product, quantity }) => (
                        <div key={product.id} className="flex gap-3 p-3 rounded-xl bg-white border border-(--primary-color)/10">
                            <div className="h-16 w-16 rounded-lg bg-(--primary-color)/8 flex items-center justify-center shrink-0 overflow-hidden">
                                {product.imageUrl ? (
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <svg className="w-7 h-7 text-(--primary-color)/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-(--secondary-color) truncate">{product.name}</p>
                                <p className="text-xs text-(--secondary-color)/40">{product.category}</p>
                                <p className="text-sm font-bold text-(--primary-color) mt-1">
                                    {formatPrice(product.price * quantity)}
                                </p>
                            </div>
                            <div className="flex flex-col items-end justify-between shrink-0">
                                <button
                                    onClick={() => removeItem(product.id)}
                                    className="text-(--secondary-color)/30 hover:text-red-400 transition-colors cursor-pointer"
                                >
                                    <Trash2 size={13} strokeWidth={1.5} />
                                </button>
                                <div className="flex items-center gap-1.5">
                                    <button
                                        onClick={() => updateQty(product.id, quantity - 1)}
                                        className="h-6 w-6 flex items-center justify-center rounded-md border border-(--primary-color)/20 hover:border-(--primary-color)/50 transition-colors cursor-pointer"
                                    >
                                        <Minus size={11} strokeWidth={2} color="var(--secondary-color)" />
                                    </button>
                                    <span className="text-xs font-semibold text-(--secondary-color) w-4 text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => updateQty(product.id, quantity + 1)}
                                        className="h-6 w-6 flex items-center justify-center rounded-md border border-(--primary-color)/20 hover:border-(--primary-color)/50 transition-colors cursor-pointer"
                                    >
                                        <Plus size={11} strokeWidth={2} color="var(--secondary-color)" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {items.length > 0 && (
                    <div className="px-4 py-4 border-t border-(--primary-color)/15 flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-(--secondary-color)/50">Total</span>
                            <span className="font-bold text-(--secondary-color) text-lg">{formatPrice(total)}</span>
                        </div>
                        <input
                            type="text"
                            placeholder="¿Cómo te llamamos?"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-(--primary-color)/20 text-(--secondary-color) placeholder:text-(--secondary-color)/30 text-sm outline-none focus:border-(--primary-color)/60 transition-all duration-200"
                        />
                        <a
                            href={whatsappHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 ${
                                whatsappHref
                                    ? 'bg-[#25D366] hover:bg-[#20b958] cursor-pointer hover:shadow-lg active:scale-[0.98]'
                                    : 'bg-(--secondary-color)/20 cursor-not-allowed pointer-events-none'
                            }`}
                        >
                            <FaWhatsapp size={17} />
                            Enviar pedido por WhatsApp
                        </a>
                        <button
                            onClick={clearCart}
                            className="text-xs text-center text-(--secondary-color)/30 hover:text-(--primary-color) transition-colors cursor-pointer underline underline-offset-2"
                        >
                            Vaciar carrito
                        </button>
                    </div>
                )}
            </aside>
        </>
    );
}
