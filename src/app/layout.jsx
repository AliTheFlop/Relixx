import "./globals.css";
import Navbar from "@/components/Navbar";

export default async function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
