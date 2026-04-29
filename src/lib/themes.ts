export type ThemeId = 'default' | 'pink' | 'sport' | 'enterprise';

export interface Theme {
    id: ThemeId;
    label: string;
    primary: string;
    surface: string;
}

export const themes: Theme[] = [
    { id: 'default',    label: 'Azul',       primary: '#2563EB', surface: '#EFF6FF' },
    { id: 'pink',       label: 'Rosa',        primary: '#E8799A', surface: '#FFF0F5' },
    { id: 'sport',      label: 'Sport',       primary: '#16A34A', surface: '#F0FDF4' },
    { id: 'enterprise', label: 'Enterprise',  primary: '#7C3AED', surface: '#F5F3FF' },
];
