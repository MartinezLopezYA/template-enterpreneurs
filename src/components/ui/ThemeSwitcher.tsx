'use client';

import { themes } from '@/lib/themes';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex items-center gap-1.5 px-2">
            {themes.map(t => (
                <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    title={t.label}
                    className={`h-4.5 w-4.5 rounded-full transition-all duration-200 cursor-pointer ${
                        theme === t.id
                            ? 'ring-2 ring-offset-1 ring-(--secondary-color)/40 scale-110'
                            : 'hover:scale-110 opacity-60 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: t.primary }}
                />
            ))}
        </div>
    );
}
