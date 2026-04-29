'use client'

import { Building2 } from 'lucide-react'
import { FaWhatsapp, FaTiktok, FaInstagram, FaFacebook } from 'react-icons/fa'

export default function Footer() {
    const socials = [
        {
            name: 'Whatsapp',
            url: 'https://www.facebook.com/zentriq/',
            icon: FaWhatsapp
        },
        {
            name: 'Facebook',
            url: 'https://www.facebook.com/profile.php?id=61586507270201',
            icon: FaFacebook
        },
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/zentriq41/',
            icon: FaInstagram
        },
        {
            name: 'TikTok',
            url: 'https://www.tiktok.com/@zentriq5',
            icon: FaTiktok
        }
    ]

    return (
        <section id="footer" className="relative w-full h-auto bg-(--surface-color)">
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 flex flex-col-reverse md:flex-row justify-between items-center gap-5">
                <div className="flex flex-col text-xs text-(--primary-color)">
                    <span className="font-bold">Zentriq - Zipaquirá (Cundinamarca) - Colombia </span>
                    <span>© 2026 - Developed by Zentriq Team.</span>
                </div>
                <a href="#home" className="flex items-center gap-2.5 shrink-0 group">
                    <div className="h-8 w-8 flex items-center justify-center rounded-lg border bg-(--primary-color)/10 border-(--primary-color)/25 group-hover:bg-(--primary-color)/20 transition-colors duration-200">
                        <Building2 size={18} color="var(--primary-color)" strokeWidth={1.5} />
                    </div>
                    <span className="text-sm font-semibold tracking-wide text-(--secondary-color)/80 group-hover:text-(--secondary-color) transition-colors duration-200">
                        Entrepreneurs
                    </span>
                </a>
                <div className="flex gap-4 p-1">
                    {socials.map((social) => {
                        const Icon = social.icon;
                        return (
                        <a href={social.url} target="_blank" key={social.name} rel="noopener noreferrer" className="text-(--primary-color) hover:text-(--secondary-color)/80 w-6 h-6 hover:scale-105 shadow-neon rounded-full transition-all duration-300 flex justify-center items-center">
                            <Icon size={15} strokeWidth={2} />
                        </a>
                        )}
                    )}
                </div>
            </div>
        </section>
    )
}