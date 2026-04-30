'use client';

import { Book, Building2, House, Menu, MessagesSquare, ShoppingCart, X, CircleQuestionMark } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import { useCart } from '@/context/CartContext';

const items = [
    { name: 'Inicio',      route: '#home',    id: 'home',    icon: House },
    { name: 'Catálogo',    route: '#catalog', id: 'catalog', icon: Book },
    { name: '¿Cómo funciona?',    route: '#steps', id: 'steps', icon: CircleQuestionMark },
    { name: 'Contáctanos', route: '#contact', id: 'contact', icon: MessagesSquare },
];

export default function Header() {
    const [active,   setActive]   = useState('home');
    const [isOpen,   setIsOpen]   = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const { count, openCart } = useCart();

    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        items.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (!el) return;
            const observer = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActive(id); },
                { threshold: 0.4 }
            );
            observer.observe(el);
            observers.push(observer);
        });
        return () => observers.forEach(o => o.disconnect());
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node))
                setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className={`fixed top-0 w-full z-50 flex justify-center backdrop-blur-md transition-all duration-300 ${
            scrolled
                ? 'bg-(--surface-color) shadow-[0_1px_0_0_var(--primary-color)/2,0_8px_32px_-8px_var(--primary-color)/12]'
                : 'bg-(--surface-color)'
        }`}>
            <div className="w-full max-w-7xl px-6 h-16 flex items-center gap-6">
                <a href="#home" className="flex items-center gap-2.5 shrink-0 group">
                    <div className="h-8 w-8 flex items-center justify-center rounded-lg border bg-(--primary-color)/10 border-(--primary-color)/25 group-hover:bg-(--primary-color)/20 transition-colors duration-200">
                        <Building2 size={18} color="var(--primary-color)" strokeWidth={1.5} />
                    </div>
                    <span className="text-sm font-semibold tracking-wide text-(--secondary-color)/80 group-hover:text-(--secondary-color) transition-colors duration-200">
                        Entrepreneurs
                    </span>
                </a>
                <nav className="hidden md:flex flex-1 items-center justify-center gap-1">
                    {items.map(item => {
                        const Icon = item.icon;
                        const isActive = active === item.id;
                        return (
                            <a href={item.route} key={item.route} className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                isActive
                                    ? 'text-(--primary-color) bg-(--primary-color)/10'
                                    : 'text-(--secondary-color)/50 hover:text-(--secondary-color)/80 hover:bg-(--secondary-color)/5'
                            }`}>
                                <Icon size={15} strokeWidth={isActive ? 2 : 1.5} color={isActive ? 'var(--primary-color)' : 'currentColor'} />
                                {item.name}
                                {isActive && (
                                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-(--primary-color)" />
                                )}
                            </a>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-2 ml-auto">
                    <ThemeSwitcher />
                    <button onClick={openCart} className="relative group flex items-center justify-center h-9 w-9 rounded-lg border border-(--primary-color)/25 bg-(--primary-color)/5 hover:border-(--primary-color)/50 hover:bg-(--primary-color)/15 transition-all duration-200 cursor-pointer">
                        <ShoppingCart size={17} strokeWidth={1.5} className="text-(--secondary-color)/45 group-hover:text-(--primary-color) transition-colors duration-200" />
                        {count > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 h-4 w-4 flex items-center justify-center rounded-full bg-(--primary-color) text-white text-[9px] font-bold">
                                {count > 9 ? '9+' : count}
                            </span>
                        )}
                    </button>

                    <div ref={menuRef} className="relative flex md:hidden">
                        <button onClick={() => setIsOpen(prev => !prev)} className="flex items-center justify-center h-9 w-9 rounded-lg border border-(--primary-color)/25 bg-(--primary-color)/5 hover:border-(--primary-color)/50 hover:bg-(--primary-color)/15 transition-all duration-200" aria-label="Toggle menu" >
                            <span className={`absolute transition-all duration-200 ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-75'}`}>
                                <X size={17} color="var(--primary-color)" strokeWidth={2} />
                            </span>
                            <span className={`absolute transition-all duration-200 ${isOpen ? 'opacity-0 -rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'}`}>
                                <Menu size={17} color="var(--primary-color)" strokeWidth={2} />
                            </span>
                        </button>

                        <div className={`absolute right-0 top-12 w-52 rounded-xl border border-(--primary-color)/20 bg-(--surface-color)/98 backdrop-blur-md shadow-[0_16px_48px_-8px_rgba(15,10,13,0.12),0_0_0_1px_rgba(232,121,154,0.1)] overflow-hidden transition-all duration-250 origin-top-right ${
                            isOpen
                                ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                                : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                        }`}>
                            <div className="p-1.5">
                                {items.map((item, i) => {
                                    const Icon = item.icon;
                                    const isActive = active === item.id;
                                    return (
                                        <a href={item.route} key={item.route} onClick={() => setIsOpen(false)} style={{ transitionDelay: isOpen ? `${i * 40}ms` : '0ms' }} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                                            isActive
                                                ? 'text-(--primary-color) bg-(--primary-color)/10'
                                                : 'text-(--secondary-color)/55 hover:text-(--secondary-color)/85 hover:bg-(--secondary-color)/5'
                                            } ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'}`}
                                        >
                                            <Icon size={15} strokeWidth={isActive ? 2 : 1.5} color={isActive ? 'var(--primary-color)' : 'currentColor'} />
                                            {item.name}
                                            {isActive && (
                                                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-(--primary-color)" />
                                            )}
                                        </a>
                                    );
                                })}
                            </div>
                            <div className="px-4 py-2.5 border-t border-(--primary-color)/15 flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-(--primary-color) animate-pulse" />
                                <span className="text-xs tracking-wide text-(--secondary-color)/30">Entrepreneurs</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
