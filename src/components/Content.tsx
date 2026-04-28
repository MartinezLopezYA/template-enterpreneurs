'use client'

import Home from "@/components/sections/Home"
import Footer from "./sections/Footer"
import Steps from "./sections/Steps"
import Catalog from "./sections/Catalog"
import Contact from "./sections/Contact"

export default function Content() {
    return (
        <main className="w-full flex-1">
            <Home />
            <Catalog />
            <Steps />
            <Contact />
            <Footer />
        </main>
    )
}