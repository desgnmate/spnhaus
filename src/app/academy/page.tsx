import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import AcademyClient from "./AcademyClient";

export const metadata: Metadata = {
    title: "SPNHAUS Academy — Learn to DJ in Melbourne",
    description:
        "SPNHAUS Academy teaches the art of DJing in Melbourne. Beginner to Pro courses covering beat matching, mixing techniques, EQ, scratching, and performance. No experience required.",
    keywords: [
        "learn to DJ Melbourne",
        "DJ school Melbourne",
        "DJ lessons Melbourne",
        "DJ classes Victoria",
        "Melbourne DJ academy",
        "DJ course Australia",
        "learn DJing",
        "beginner DJ lessons",
        "SPNHAUS Academy",
    ],
    alternates: {
        canonical: `${siteConfig.url}/academy`,
    },
    openGraph: {
        title: "SPNHAUS Academy — Learn to DJ in Melbourne",
        description:
            "Learn to DJ with SPNHAUS Academy in Melbourne. Beginner to Pro courses, no experience required.",
        url: `${siteConfig.url}/academy`,
        siteName: siteConfig.name,
        locale: siteConfig.locale,
        type: "website",
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: "SPNHAUS Academy — Learn to DJ in Melbourne",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "SPNHAUS Academy — Learn to DJ in Melbourne",
        description:
            "Learn to DJ with SPNHAUS Academy in Melbourne. Beginner to Pro courses.",
        images: [siteConfig.ogImage],
    },
};

export default function Page() {
    return <AcademyClient />;
}
