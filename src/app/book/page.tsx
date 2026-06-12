import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import BookClient from "./BookClient";

export const metadata: Metadata = {
    title: "Book a DJ — SPNHAUS Melbourne",
    description:
        "Book SPNHAUS for your next event in Melbourne. We DJ weddings, corporate events, private parties, business launches, and community events across Victoria and Australia.",
    keywords: [
        "book DJ Melbourne",
        "Melbourne DJ booking",
        "hire DJ Melbourne",
        "wedding DJ booking Melbourne",
        "corporate event DJ booking",
        "SPNHAUS book",
    ],
    alternates: {
        canonical: `${siteConfig.url}/book`,
    },
    openGraph: {
        title: "Book a DJ — SPNHAUS Melbourne",
        description:
            "Book SPNHAUS for your next event in Melbourne. Weddings, corporate events, private parties, and more.",
        url: `${siteConfig.url}/book`,
        siteName: siteConfig.name,
        locale: siteConfig.locale,
        type: "website",
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: "Book a DJ — SPNHAUS Melbourne",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Book a DJ — SPNHAUS Melbourne",
        description:
            "Book SPNHAUS for your next event in Melbourne.",
        images: [siteConfig.ogImage],
    },
};

export default function Page() {
    return <BookClient />;
}
