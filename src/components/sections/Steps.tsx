import { FaWhatsapp, FaList, FaSearch } from "react-icons/fa";

export default function Steps() {

    const steps = [
        {
            number: 1,
            title: "Inicia la conversación",
            description: `Escríbele a Facti al por WhatsApp. Sin registros previos.`,
            icon: FaSearch
        },
        {
            number: 2,
            title: "Elige lo que necesitas",
            description: "Verás un menú claro con todos los servicios disponibles. Selecciona el que necesitas.",
            icon: FaList
        },
        {
            number: 3,
            title: "Sigue el chat",
            description: "Facti te guía con preguntas simples. Si tienes dudas, pregunta, el chat responde todo.",
            icon: FaWhatsapp
        }
    ];

    return (
        <section id="steps" className="w-full h-auto min-h-150 bg-white flex items-center">
            <div className="max-w-6xl mx-auto p-8 md:p-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--secondary-color)">
                        En 3 pasos, <span className="text-(--primary-color)">¡Listo!</span>
                    </h2>
                    <p className="text-lg md:text-xl lg:text-2xl text-(--secondary-color)/60 mt-4 max-w-3xl mx-auto">
                        Así de simple es usar Entrepreneurs. No hay curva de aprendizaje — si sabes usar WhatsApp, ya sabes usar Entrepreneurs.
                    </p>
                </div>
                <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="hidden lg:block absolute top-9 left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-px" style={{ background: "linear-gradient(to right, transparent, #F48FB1 15%, #F48FB1 85%, transparent)" }}></div>
                    {steps.map((step) => {
                        const Icon = step.icon;
                        return (
                            <div key={step.title} className="group relative flex flex-col gap-4 p-6 rounded-2xl bg-(--surface-color)/30 backdrop-blur-sm border border-(--primary-color)/20 hover:border-(--primary-color)/50 hover:bg-(--surface-color) hover:shadow-[0_16px_48px_#F48FB115] hover:-translate-y-2 transition-all duration-300 cursor-default">
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
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>


    )
}