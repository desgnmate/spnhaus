import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
    title: "Contact SPNHAUS — Melbourne DJ Collective",
    description:
        "Get in touch with SPNHAUS, Melbourne's DJ collective. Book a DJ for your wedding, corporate event, private party, or brand launch. Email hello@spnhaus.com.",
    keywords: [
        "contact SPNHAUS",
        "Melbourne DJ contact",
        "book DJ Melbourne",
        "SPNHAUS email",
        "Melbourne event DJ booking",
    ],
    alternates: {
        canonical: `${siteConfig.url}/contact`,
    },
    openGraph: {
        title: "Contact SPNHAUS — Melbourne DJ Collective",
        description:
            "Get in touch with SPNHAUS, Melbourne's DJ collective. Book a DJ for your next event.",
        url: `${siteConfig.url}/contact`,
        siteName: siteConfig.name,
        locale: siteConfig.locale,
        type: "website",
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: "Contact SPNHAUS — Melbourne DJ Collective",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact SPNHAUS — Melbourne DJ Collective",
        description:
            "Get in touch with SPNHAUS, Melbourne's DJ collective. Book a DJ for your next event.",
        images: [siteConfig.ogImage],
    },
};

export default function Page() {
    return <ContactClient />;
}
