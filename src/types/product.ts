export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    available: boolean;
    imageUrl?: string;
    sizes: string[];
}
