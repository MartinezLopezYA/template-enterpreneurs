import { FaWhatsapp, FaList, FaSearch, FaShoppingCart } from "react-icons/fa";

export default function Steps() {

    const steps = [
        {
            number: 1,
            title: "Explora el catálogo",
            description: `Explora la sección de catálogo para descubrir todos los productos que ofrecemos.`,
            icon: FaSearch,
            route: "catalog"
        },
        {
            number: 2,
            title: "Elige lo que deseas comprar",
            description: "Selecciona los productos que deseas adquirir y añádelos a tu carrito de compras.",
            icon: FaList,
            route: "catalog"
        },
        {
            number: 3,
            title: "Ve a tu carrito y haz tu pedido",
            description: "Una vez que hayas seleccionado tus productos, ve a tu carrito para revisar tu pedido y haz clic en el botón de WhatsApp para finalizar tu compra.",
            icon: FaShoppingCart,
            route: "cart"
        },
        {
            number: 4,
            title: "¡Listo!",
            description: "Nuestro equipo se pondrá en contacto contigo a través de WhatsApp para confirmar tu pedido y coordinar la entrega. ¡Así de fácil es comprar con Entrepreneurs!",
            icon: FaWhatsapp,
            route: "cart"
        }
    ];

    return (
        <section id="steps" className="w-full h-auto min-h-150 bg-white flex items-center">
            <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--secondary-color)">
                        En 4 pasos, <span className="text-(--primary-color)">¡Listo!</span>
                    </h2>
                    <p className="text-lg md:text-xl lg:text-2xl text-(--secondary-color)/60 mt-4 max-w-3xl mx-auto">
                        Así de simple es usar Entrepreneurs. No hay curva de aprendizaje — si sabes usar WhatsApp, ya sabes usar Entrepreneurs.
                    </p>
                </div>
                <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="hidden lg:block absolute top-9 left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-px" style={{ background: "linear-gradient(to right, transparent, var(--primary-color) 15%, var(--primary-color) 85%, transparent)" }}></div>
                    {steps.map((step) => {
                        const Icon = step.icon;
                        return (
                            <a href={`#${step.route}`} key={step.title} className="group relative flex flex-col gap-4 p-6 rounded-2xl bg-(--surface-color)/30 backdrop-blur-sm border border-(--primary-color)/20 hover:border-(--primary-color)/50 hover:bg-(--surface-color) hover:shadow-[0_16px_48px_var(--primary-color)15] hover:-translate-y-2 transition-all duration-300 cursor-default">
                                <div className="flex items-center justify-between">
                                    <span className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border-2 border-(--primary-color)/40 text-(--primary-color) bg-(--primary-color)/8 group-hover:bg-(--primary-color) group-hover:border-(--primary-color) group-hover:text-white transition-all duration-300">
                                        {step.number}
                                    </span>
                                    <Icon size={15} strokeWidth={2} width={10} height={10} className="text-(--primary-color)/50 group-hover:text-(--primary-color) group-hover:scale-110 transition-all duration-300"/>
                                </div>
                                <div className="flex flex-col gap-2 mt-2">
                                    <h3 className="text-lg font-semibold text-(--secondary-color) leading-snug textc">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-(--secondary-color)/60 leading-relaxed">{step.description}</p>
                                </div>
                                <div className="mt-auto pt-4">
                                    <div className="h-0.5 w-0 bg-(--primary-color) rounded-full group-hover:w-full transition-all duration-500"></div>
                                </div>
                            </a>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}