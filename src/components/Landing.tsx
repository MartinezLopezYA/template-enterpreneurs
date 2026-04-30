import Header from "@/components/Header";
import Content from "@/components/Content";
import CartDrawer from "@/components/ui/CartDrawer";

export default function Landing() {
    return (
        <main className="relative w-full h-full min-h-dvh flex flex-col items-center">
            <Header />
            <Content />
            <CartDrawer />
        </main>
    )
}
