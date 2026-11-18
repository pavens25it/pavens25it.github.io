import React from "react";

interface ProjectVisualProps {
  slug: string;
  repoName?: string;
  language?: string;
  className?: string;
}

/**
 * Custom architectural diagrams for each verified repository.
 * Strictly adheres to the 3-color palette: #242321, #76543B, #C47A36.
 */
export function ProjectVisual({
  slug,
  repoName,
  language,
  className = "aspect-[16/10] w-full",
}: ProjectVisualProps) {
  switch (slug) {
    case "kec-placement-eligibility-system":
      return (
        <svg
          viewBox="0 0 640 400"
          className={`${className} block bg-charcoal`}
          role="img"
          aria-label="Architectural diagram of OCI VM 1 Java engine connected over JDBC to VM 2 database host"
        >
          <rect width="640" height="400" fill="#242321" />
          {/* Subtle architectural grid */}
          <g stroke="#76543B" strokeOpacity="0.22" strokeWidth="1">
            <line x1="0" y1="80" x2="640" y2="80" />
            <line x1="0" y1="160" x2="640" y2="160" />
            <line x1="0" y1="240" x2="640" y2="240" />
            <line x1="0" y1="320" x2="640" y2="320" />
            <line x1="160" y1="0" x2="160" y2="400" />
            <line x1="320" y1="0" x2="320" y2="400" />
            <line x1="480" y1="0" x2="480" y2="400" />
          </g>

          {/* Header index */}
          <text
            x="36"
            y="44"
            fill="#76543B"
            fontFamily="monospace"
            fontSize="11"
            letterSpacing="2.4"
          >
            ARCH. 01 // DISTRIBUTED OCI TOPOLOGY
          </text>

          {/* VM 1 Box */}
          <rect
            x="48"
            y="98"
            width="230"
            height="198"
            fill="#76543B"
            fillOpacity="0.12"
            stroke="#C47A36"
            strokeWidth="1.25"
          />
          <text
            x="68"
            y="128"
            fill="#C47A36"
            fontFamily="monospace"
            fontSize="11"
            letterSpacing="1.8"
          >
            OCI VM 1 // APP HOST
          </text>
          <line x1="68" y1="142" x2="258" y2="142" stroke="#76543B" strokeWidth="1" />

          {/* Multithreaded evaluation bars */}
          <rect x="68" y="164" width="190" height="24" fill="#242321" stroke="#76543B" />
          <text x="80" y="180" fill="#C47A36" fontFamily="monospace" fontSize="10">
            JAVA 17 ENGINE · MAVEN
          </text>
          <rect x="68" y="200" width="190" height="24" fill="#242321" stroke="#76543B" />
          <text x="80" y="216" fill="#C47A36" fontFamily="monospace" fontSize="10">
            MULTITHREADED SCREENING
          </text>
          <rect x="68" y="236" width="190" height="24" fill="#242321" stroke="#76543B" />
          <text x="80" y="252" fill="#C47A36" fontFamily="monospace" fontSize="10">
            CSV IMPORT &amp; SHORTLIST
          </text>

          {/* JDBC Connector */}
          <line
            x1="278"
            y1="197"
            x2="378"
            y2="197"
            stroke="#C47A36"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <polygon points="378,192 388,197 378,202" fill="#C47A36" />
          <rect x="296" y="166" width="74" height="20" fill="#242321" stroke="#76543B" />
          <text
            x="333"
            y="180"
            textAnchor="middle"
            fill="#C47A36"
            fontFamily="monospace"
            fontSize="10"
          >
            JDBC
          </text>

          {/* VM 2 Box */}
          <rect
            x="392"
            y="124"
            width="200"
            height="146"
            fill="#76543B"
            fillOpacity="0.08"
            stroke="#76543B"
            strokeWidth="1.25"
          />
          <text
            x="412"
            y="154"
            fill="#C47A36"
            fontFamily="monospace"
            fontSize="11"
            letterSpacing="1.6"
          >
            OCI VM 2 // DB HOST
          </text>
          <line x1="412" y1="168" x2="572" y2="168" stroke="#76543B" strokeWidth="1" />
          <text x="412" y="196" fill="#C47A36" fillOpacity="0.85" fontFamily="monospace" fontSize="10">
            MYSQL :3306
          </text>
          <text x="412" y="218" fill="#C47A36" fillOpacity="0.85" fontFamily="monospace" fontSize="10">
            POSTGRESQL :5432
          </text>
          <text x="412" y="246" fill="#76543B" fontFamily="monospace" fontSize="10">
            ENV CONFIG + FALLBACK
          </text>

          {/* Bottom metadata bar */}
          <line x1="36" y1="344" x2="604" y2="344" stroke="#76543B" strokeOpacity="0.5" />
          <text x="36" y="368" fill="#C47A36" fillOpacity="0.7" fontFamily="monospace" fontSize="10" letterSpacing="1.6">
            29 JUNIT 5 TESTS · 500+ CANDIDATE RECORDS · FAT JAR
          </text>
        </svg>
      );

    case "kec-r2024-student-evaluation-system":
      return (
        <svg
          viewBox="0 0 640 400"
          className={`${className} block bg-charcoal`}
          role="img"
          aria-label="Diagram of KEC Regulation 2024 weighted evaluation matrix"
        >
          <rect width="640" height="400" fill="#242321" />
          <g stroke="#76543B" strokeOpacity="0.22" strokeWidth="1">
            <line x1="0" y1="100" x2="640" y2="100" />
            <line x1="0" y1="200" x2="640" y2="200" />
            <line x1="0" y1="300" x2="640" y2="300" />
          </g>

          <text
            x="36"
            y="44"
            fill="#76543B"
            fontFamily="monospace"
            fontSize="11"
            letterSpacing="2.4"
          >
            ARCH. 02 // R2024 WEIGHTED EVALUATION MATRIX
          </text>

          {/* Three weighted bars */}
          <g transform="translate(48, 86)">
            <text x="0" y="14" fill="#C47A36" fontFamily="monospace" fontSize="11" letterSpacing="1.6">
              THEORY COURSE · 40% CIA / 60% ESE
            </text>
            <rect x="0" y="26" width="544" height="28" fill="#242321" stroke="#76543B" />
            <rect x="0" y="26" width="218" height="28" fill="#76543B" fillOpacity="0.45" />
            <rect x="218" y="26" width="326" height="28" fill="#C47A36" fillOpacity="0.28" />
            <line x1="218" y1="26" x2="218" y2="54" stroke="#C47A36" strokeWidth="1.5" />

            <text x="0" y="88" fill="#C47A36" fontFamily="monospace" fontSize="11" letterSpacing="1.6">
              PRACTICAL COURSE · 60% CIA / 40% ESE
            </text>
            <rect x="0" y="100" width="544" height="28" fill="#242321" stroke="#76543B" />
            <rect x="0" y="100" width="326" height="28" fill="#76543B" fillOpacity="0.45" />
            <rect x="326" y="100" width="218" height="28" fill="#C47A36" fillOpacity="0.28" />
            <line x1="326" y1="100" x2="326" y2="128" stroke="#C47A36" strokeWidth="1.5" />

            <text x="0" y="162" fill="#C47A36" fontFamily="monospace" fontSize="11" letterSpacing="1.6">
              EMBEDDED COURSE · 50% CIA / 50% ESE
            </text>
            <rect x="0" y="174" width="544" height="28" fill="#242321" stroke="#76543B" />
            <rect x="0" y="174" width="272" height="28" fill="#76543B" fillOpacity="0.45" />
            <rect x="272" y="174" width="272" height="28" fill="#C47A36" fillOpacity="0.28" />
            <line x1="272" y1="174" x2="272" y2="202" stroke="#C47A36" strokeWidth="1.5" />
          </g>

          {/* Bottom rule & badges */}
          <line x1="36" y1="326" x2="604" y2="326" stroke="#76543B" strokeOpacity="0.55" />
          <text x="36" y="356" fill="#C47A36" fillOpacity="0.8" fontFamily="monospace" fontSize="10" letterSpacing="1.6">
            ATTENDANCE GATE: 75% · CONDONATION: 65–74.9% · JAVA 21 + MYSQL 8.0
          </text>
        </svg>
      );

    case "ap-dental-care-demo":
      return (
        <svg
          viewBox="0 0 640 400"
          className={`${className} block bg-charcoal`}
          role="img"
          aria-label="Modular Next.js architecture diagram for AP Dental Care"
        >
          <rect width="640" height="400" fill="#242321" />
          <text
            x="36"
            y="44"
            fill="#76543B"
            fontFamily="monospace"
            fontSize="11"
            letterSpacing="2.4"
          >
            ARCH. 03 // CONFIG-DRIVEN NEXT.JS SYSTEM
          </text>

          {/* Browser frame */}
          <rect
            x="48"
            y="72"
            width="544"
            height="252"
            fill="#242321"
            stroke="#76543B"
            strokeWidth="1.25"
          />
          <line x1="48" y1="104" x2="592" y2="104" stroke="#76543B" strokeOpacity="0.6" />
          <circle cx="68" cy="88" r="3.5" fill="#76543B" />
          <circle cx="84" cy="88" r="3.5" fill="#76543B" />
          <circle cx="100" cy="88" r="3.5" fill="#C47A36" />
          <text x="124" y="92" fill="#C47A36" fillOpacity="0.7" fontFamily="monospace" fontSize="10">
            ap-dental-care-demo.vercel.app
          </text>

          {/* Left config column */}
          <rect
            x="72"
            y="126"
            width="164"
            height="174"
            fill="#76543B"
            fillOpacity="0.15"
            stroke="#C47A36"
            strokeWidth="1.2"
          />
          <text x="88" y="152" fill="#C47A36" fontFamily="monospace" fontSize="10" letterSpacing="1.4">
            clinicData.ts
          </text>
          <line x1="88" y1="164" x2="220" y2="164" stroke="#76543B" />
          <text x="88" y="188" fill="#C47A36" fillOpacity="0.75" fontFamily="monospace" fontSize="9.5">
            + SEO Metadata
          </text>
          <text x="88" y="210" fill="#C47A36" fillOpacity="0.75" fontFamily="monospace" fontSize="9.5">
            + Treatments List
          </text>
          <text x="88" y="232" fill="#C47A36" fillOpacity="0.75" fontFamily="monospace" fontSize="9.5">
            + Appointments
          </text>
          <text x="88" y="254" fill="#C47A36" fillOpacity="0.75" fontFamily="monospace" fontSize="9.5">
            + Clinic Contact
          </text>

          {/* Connector lines */}
          <line x1="236" y1="164" x2="278" y2="164" stroke="#C47A36" strokeWidth="1.2" />
          <line x1="236" y1="214" x2="278" y2="214" stroke="#C47A36" strokeWidth="1.2" />
          <line x1="236" y1="264" x2="278" y2="264" stroke="#C47A36" strokeWidth="1.2" />

          {/* Modular sections */}
          <g fill="#242321" stroke="#76543B">
            <rect x="278" y="126" width="290" height="44" />
            <rect x="278" y="182" width="138" height="52" />
            <rect x="430" y="182" width="138" height="52" />
            <rect x="278" y="246" width="290" height="54" />
          </g>
          <text x="294" y="152" fill="#C47A36" fontFamily="monospace" fontSize="10">
            NAVBAR + NOTICE BANNER + HERO
          </text>
          <text x="294" y="212" fill="#C47A36" fillOpacity="0.8" fontFamily="monospace" fontSize="10">
            TREATMENTS
          </text>
          <text x="446" y="212" fill="#C47A36" fillOpacity="0.8" fontFamily="monospace" fontSize="10">
            EXPERIENCE
          </text>
          <text x="294" y="277" fill="#C47A36" fontFamily="monospace" fontSize="10">
            APPOINTMENT + CONTACT + FOOTER
          </text>

          <text x="36" y="366" fill="#C47A36" fillOpacity="0.7" fontFamily="monospace" fontSize="10" letterSpacing="1.6">
            NEXT.JS APP ROUTER · TYPESCRIPT · TAILWIND CSS · VERCEL
          </text>
        </svg>
      );

    case "pawfect-pet-shop-demo":
      return (
        <svg
          viewBox="0 0 640 400"
          className={`${className} block bg-charcoal`}
          role="img"
          aria-label="Storefront grid diagram for Pawfect Pet Shop"
        >
          <rect width="640" height="400" fill="#242321" />
          <text
            x="36"
            y="44"
            fill="#76543B"
            fontFamily="monospace"
            fontSize="11"
            letterSpacing="2.4"
          >
            ARCH. 04 // MODULAR RETAIL STOREFRONT
          </text>

          {/* Filter strip */}
          <rect x="48" y="76" width="120" height="30" fill="#C47A36" />
          <text x="108" y="95" textAnchor="middle" fill="#242321" fontFamily="monospace" fontSize="10" fontWeight="600">
            ALL ITEMS
          </text>
          <rect x="180" y="76" width="120" height="30" fill="#242321" stroke="#76543B" />
          <text x="240" y="95" textAnchor="middle" fill="#C47A36" fontFamily="monospace" fontSize="10">
            NUTRITION
          </text>
          <rect x="312" y="76" width="120" height="30" fill="#242321" stroke="#76543B" />
          <text x="372" y="95" textAnchor="middle" fill="#C47A36" fontFamily="monospace" fontSize="10">
            GROOMING
          </text>
          <rect x="444" y="76" width="148" height="30" fill="#242321" stroke="#76543B" />
          <text x="518" y="95" textAnchor="middle" fill="#C47A36" fontFamily="monospace" fontSize="10">
            ACCESSORIES
          </text>

          {/* Product cards grid */}
          {[0, 1, 2].map((col) => (
            <g key={col} transform={`translate(${48 + col * 186}, 128)`}>
              <rect
                width="172"
                height="182"
                fill="#76543B"
                fillOpacity={col === 0 ? "0.18" : "0.08"}
                stroke={col === 0 ? "#C47A36" : "#76543B"}
                strokeWidth="1.2"
              />
              <rect
                x="14"
                y="14"
                width="144"
                height="92"
                fill="#242321"
                stroke="#76543B"
                strokeOpacity="0.6"
              />
              <line x1="14" y1="14" x2="158" y2="106" stroke="#76543B" strokeOpacity="0.3" />
              <line x1="158" y1="14" x2="14" y2="106" stroke="#76543B" strokeOpacity="0.3" />
              <rect x="14" y="122" width="104" height="8" fill="#C47A36" fillOpacity="0.8" />
              <rect x="14" y="140" width="144" height="5" fill="#76543B" fillOpacity="0.7" />
              <rect x="14" y="154" width="84" height="5" fill="#76543B" fillOpacity="0.5" />
            </g>
          ))}

          <line x1="36" y1="338" x2="604" y2="338" stroke="#76543B" strokeOpacity="0.5" />
          <text x="36" y="366" fill="#C47A36" fillOpacity="0.7" fontFamily="monospace" fontSize="10" letterSpacing="1.6">
            REACT 19 · TYPESCRIPT · VITE · 15 MODULAR COMPONENTS
          </text>
        </svg>
      );

    default: {
      const displayRepo = (repoName || slug).toUpperCase().slice(0, 32);
      const displayLang = (language || "PUBLIC REPOSITORY").toUpperCase();
      return (
        <svg
          viewBox="0 0 640 400"
          className={`${className} block bg-charcoal`}
          role="img"
          aria-label={`Architectural repository plate for ${repoName || slug}`}
        >
          <rect width="640" height="400" fill="#242321" />
          <g stroke="#76543B" strokeOpacity="0.22" strokeWidth="1">
            <line x1="0" y1="100" x2="640" y2="100" />
            <line x1="0" y1="200" x2="640" y2="200" />
            <line x1="0" y1="300" x2="640" y2="300" />
            <line x1="160" y1="0" x2="160" y2="400" />
            <line x1="320" y1="0" x2="320" y2="400" />
            <line x1="480" y1="0" x2="480" y2="400" />
          </g>

          <text
            x="36"
            y="44"
            fill="#76543B"
            fontFamily="monospace"
            fontSize="11"
            letterSpacing="2.4"
          >
            LIVE SYNC // GITHUB REPOSITORY
          </text>

          <rect
            x="48"
            y="96"
            width="544"
            height="196"
            fill="#76543B"
            fillOpacity="0.1"
            stroke="#C47A36"
            strokeWidth="1.25"
          />

          <text
            x="76"
            y="148"
            fill="#76543B"
            fontFamily="monospace"
            fontSize="11"
            letterSpacing="2"
          >
            GITHUB.COM / PAVENS25IT
          </text>

          <text
            x="76"
            y="204"
            fill="#C47A36"
            fontFamily="Georgia, serif"
            fontSize="30"
          >
            {displayRepo}
          </text>

          <line x1="76" y1="230" x2="564" y2="230" stroke="#76543B" strokeOpacity="0.6" />

          <text
            x="76"
            y="262"
            fill="#C47A36"
            fillOpacity="0.8"
            fontFamily="monospace"
            fontSize="11"
            letterSpacing="1.8"
          >
            PRIMARY LANGUAGE: {displayLang}
          </text>

          <line x1="36" y1="338" x2="604" y2="338" stroke="#76543B" strokeOpacity="0.5" />
          <text
            x="36"
            y="366"
            fill="#C47A36"
            fillOpacity="0.7"
            fontFamily="monospace"
            fontSize="10"
            letterSpacing="1.6"
          >
            AUTO-SYNCED FROM PUBLIC GITHUB PROFILE
          </text>
        </svg>
      );
    }
  }
}
