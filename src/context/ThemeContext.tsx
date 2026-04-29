'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { themes, type ThemeId } from '@/lib/themes';

interface ThemeContextValue {
    theme: ThemeId;
    setTheme: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
    theme: 'default',
    setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<ThemeId>('default');

    useEffect(() => {
        const stored = localStorage.getItem('theme') as ThemeId | null;
        const valid = themes.some(t => t.id === stored);
        if (stored && valid) apply(stored);
    }, []);

    function apply(id: ThemeId) {
        setThemeState(id);
        localStorage.setItem('theme', id);
        if (id === 'default') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', id);
        }
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme: apply }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
