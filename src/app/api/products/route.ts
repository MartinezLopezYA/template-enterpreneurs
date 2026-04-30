import { NextResponse } from 'next/server';
import { getRecords } from '@/lib/airtable';
import config from '@/lib/config';
import type { Product } from '@/types/product';

// Estructura esperada en Airtable (tabla configurada en config.airtableTable):
//   Nombre        (Texto)            Nombre del producto
//   Descripción   (Texto largo)      Descripción corta
//   Categoría     (Selección única)  Ej: Anillos, Camisetas, Suplementos
//   Precio        (Número)           Precio en la moneda configurada
//   Disponible    (Casilla)          true = en stock
//   Imagen        (Adjunto)          Fotos del producto (se usa la primera)
//   Tallas        (Selección múltiple o Texto) Ej: S, M, L o 14, 15, 16

interface AirtableProduct {
    Nombre: string;
    'Descripción': string;
    'Categoría': string;
    Precio: number;
    Disponible: boolean;
    Imagen?: Array<{ url: string; thumbnails?: { large?: { url: string } } }>;
    Tallas?: string[] | string;
}

export async function GET() {
    try {
        const records = await getRecords<AirtableProduct>(config.airtableTable, {
            sort: [{ field: 'Nombre', direction: 'asc' }],
        });

        const products: Product[] = records.map(r => ({
            id: r.id,
            name: r.Nombre ?? '',
            description: r['Descripción'] ?? '',
            category: r['Categoría'] ?? '',
            price: r.Precio ?? 0,
            available: r.Disponible ?? false,
            imageUrl: r.Imagen?.[0]?.thumbnails?.large?.url ?? r.Imagen?.[0]?.url,
            sizes: Array.isArray(r.Tallas)
                ? r.Tallas
                : typeof r.Tallas === 'string'
                    ? r.Tallas.split(',').map(s => s.trim()).filter(Boolean)
                    : [],
        }));

        return NextResponse.json({ products });
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}
