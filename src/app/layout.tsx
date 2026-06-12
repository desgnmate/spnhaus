import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { siteConfig } from "@/lib/site-config";
import { StructuredData } from "@/components/StructuredData";

const sora = Sora({
    variable: "--font-sora",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
});

const druk = localFont({
    src: "./fonts/DrukWide-SuperItalic-Trial.otf",
    variable: "--font-druk",
    weight: "900",
    style: "italic",
    display: "swap",
});

const drukWideBold = localFont({
    src: "./fonts/DrukWide-Bold-Trial.otf",
    variable: "--font-druk-wide-bold",
    weight: "700",
    display: "swap",
});

export const viewport: Viewport = {
    themeColor: "#000000",
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
};

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: siteConfig.title,
        template: "%s | SPNHAUS",
    },
    description: siteConfig.description,
    applicationName: siteConfig.name,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
        email: true,
        address: true,
        telephone: false,
    },
    alternates: {
        canonical: siteConfig.url,
    },
    openGraph: {
        type: "website",
        locale: siteConfig.locale,
        url: siteConfig.url,
        siteName: siteConfig.name,
        title: siteConfig.title,
        description: siteConfig.description,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: `${siteConfig.name} — Melbourne DJ Collective`,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.title,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
        creator: "@spnhaus",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    verification: {
        google: "eS_zms9NH_9zbs3KIbktjdm4eACxULvGuZ2skT8mSlE",
    },
    category: "Entertainment",
    classification: "Music & Entertainment",
    other: {
        "geo.region": "AU-VIC",
        "geo.placename": "Melbourne",
        "geo.position": "-37.8136;144.9631",
        ICBM: "-37.8136, 144.9631",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en-AU">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <StructuredData />
            </head>
            <body className={`${sora.variable} ${druk.variable} ${drukWideBold.variable} font-sans antialiased bg-black text-white`}>
                <ClientLayout>
                    {children}
                </ClientLayout>
            </body>
        </html>
    );
}
