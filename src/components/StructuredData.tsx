import { siteConfig } from "@/lib/site-config";

const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: "SPNHAUS DJ Collective",
    url: siteConfig.url,
    logo: `${siteConfig.url}/SPNHAUS.webp`,
    description: siteConfig.description,
    email: siteConfig.contact.email,
    foundingLocation: {
        "@type": "Place",
        name: "Melbourne, Victoria, Australia",
    },
    areaServed: [
        {
            "@type": "City",
            name: "Melbourne",
        },
        {
            "@type": "State",
            name: "Victoria",
        },
        {
            "@type": "Country",
            name: "Australia",
        },
    ],
    sameAs: [siteConfig.contact.instagram],
};

const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "EntertainmentBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    image: `${siteConfig.url}/SPNHAUS.webp`,
    url: siteConfig.url,
    description: siteConfig.shortDescription,
    priceRange: "$$",
    address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.location.city,
        addressRegion: siteConfig.location.region,
        addressCountry: siteConfig.location.countryCode,
    },
    geo: {
        "@type": "GeoCoordinates",
        latitude: -37.8136,
        longitude: 144.9631,
    },
    areaServed: [
        {
            "@type": "City",
            name: "Melbourne",
        },
        {
            "@type": "State",
            name: "Victoria",
        },
        {
            "@type": "Country",
            name: "Australia",
        },
    ],
    contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: siteConfig.contact.email,
        areaServed: ["AU"],
        availableLanguage: ["English"],
    },
    sameAs: [siteConfig.contact.instagram],
};

const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: {
        "@id": `${siteConfig.url}/#organization`,
    },
    inLanguage: "en-AU",
};

const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "DJ and Music Entertainment",
    provider: {
        "@id": `${siteConfig.url}/#business`,
    },
    areaServed: [
        {
            "@type": "City",
            name: "Melbourne",
        },
        {
            "@type": "State",
            name: "Victoria",
        },
        {
            "@type": "Country",
            name: "Australia",
        },
    ],
    hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "SPNHAUS DJ Services",
        itemListElement: [
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Wedding DJ",
                    description: "Professional wedding DJ services in Melbourne and across Victoria.",
                },
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Corporate Event DJ",
                    description: "Curated DJ sets for corporate events, conferences, and brand activations.",
                },
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Private Event DJ",
                    description: "Bespoke DJ performances for private parties and celebrations.",
                },
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Business Launch DJ",
                    description: "Music curation for product launches, store openings, and brand events.",
                },
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Community Event DJ",
                    description: "DJ services for fundraisers and community gatherings.",
                },
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "DJ Lessons",
                    description: "Learn to DJ with SPNHAUS Academy in Melbourne.",
                },
            },
        ],
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "What is SPNHAUS?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "SPNHAUS is a Melbourne-based DJ collective that brings music to spaces with intention. We provide curated DJ sets for weddings, corporate events, private parties, brand launches, community events, and more across Melbourne and Australia.",
            },
        },
        {
            "@type": "Question",
            name: "Where is SPNHAUS based?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "SPNHAUS is based in Melbourne, Victoria, Australia. We service events across Melbourne, regional Victoria, and interstate Australia.",
            },
        },
        {
            "@type": "Question",
            name: "What events does SPNHAUS DJ?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "SPNHAUS DJs weddings, corporate events, private parties, business launches, day and brunch parties, community events, and fundraisers. We also run SPNHAUS Academy, our DJ school in Melbourne.",
            },
        },
        {
            "@type": "Question",
            name: "Does SPNHAUS offer DJ lessons?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. SPNHAUS Academy teaches the art of DJing from the ground up across Beginner, Intermediate, and Pro tiers. No experience is required.",
            },
        },
        {
            "@type": "Question",
            name: "How do I book SPNHAUS for an event?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "You can book SPNHAUS by emailing hello@spnhaus.com or visiting the Book Now page on our website.",
            },
        },
    ],
};

export function StructuredData() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
        </>
    );
}
