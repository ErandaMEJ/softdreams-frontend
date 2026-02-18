import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import WhatsAppWidget from "../components/whatsappWidget";

export default function HomePage() {
    return (
        <div className="w-full min-h-screen flex flex-col">
            <Header />
            <div className="flex-1">
                <Outlet />
            </div>
            <Footer />
            <WhatsAppWidget />
        </div>
    )
}