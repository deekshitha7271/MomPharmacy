// Health condition SVG icon registry — PharmEasy-style orange medical line-art
// Store the key (e.g. "diabetes") in MongoDB; render via getHealthIcon(key)

export const HEALTH_ICONS = {

    // 1. Diabetes Care — IV drip bag + tube
    diabetes: (
        <svg viewBox="0 0 64 64" fill="none" stroke="#10847e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="32" y1="4" x2="32" y2="8" />
            <line x1="26" y1="6" x2="38" y2="6" />
            <path d="M22 8 h20 l3 5 H19 Z" />
            <rect x="20" y="13" width="24" height="20" rx="3" />
            <line x1="20" y1="24" x2="44" y2="24" />
            <line x1="32" y1="33" x2="32" y2="40" />
            <path d="M26 40 h12 v4 h-12 z" />
            <circle cx="32" cy="48" r="2.5" fill="#10847e" stroke="none" />
            <line x1="32" y1="50" x2="32" y2="56" />
            <path d="M28 56 l4 4 l4-4" strokeWidth="1.5" />
            <circle cx="38" cy="17" r="3" fill="#10847e" stroke="none" opacity="0.35" />
        </svg>
    ),

    // 2. Cardiac Care — Heart with ECG line
    cardiac: (
        <svg viewBox="0 0 64 64" fill="none" stroke="#10847e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M32 54 C32 54 8 40 8 23 C8 15 14 9 22 9 C27 9 31 12 32 16 C33 12 37 9 42 9 C50 9 56 15 56 23 C56 40 32 54 32 54 Z" />
            <polyline points="10,28 17,28 21,20 26,36 30,24 34,28 38,28 43,21 48,28 55,28" strokeWidth="1.8" />
        </svg>
    ),

    // 3. Stomach Care — Stomach organ
    stomach: (
        <svg viewBox="0 0 64 64" fill="none" stroke="#10847e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M26 10 C20 10 16 12 14 18 C12 24 14 32 16 38 C18 46 22 52 30 54 C38 56 46 50 50 42 C54 34 52 24 46 18 C42 14 38 12 34 14 C30 16 28 10 26 10 Z" />
            <path d="M34 14 C36 20 38 28 34 36" strokeWidth="1.5" />
            <path d="M18 30 C22 32 28 30 34 32" strokeWidth="1.5" />
            <path d="M20 44 C24 48 30 50 36 48" strokeWidth="1.5" />
        </svg>
    ),

    // 4. Pain Relief — Human figure with lower back pain
    pain: (
        <svg viewBox="0 0 64 64" fill="none" stroke="#10847e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="42" cy="9" r="6" />
            <path d="M42 15 C42 15 36 22 34 28 C32 34 36 36 40 32 C42 30 44 26 46 24 C50 20 54 22 52 30 C50 36 42 44 38 52" />
            <path d="M42 15 C46 20 50 26 48 34 C46 40 44 46 44 52" />
            <circle cx="22" cy="30" r="1.5" fill="#10847e" stroke="none" />
            <circle cx="19" cy="34" r="1.5" fill="#10847e" stroke="none" />
            <circle cx="22" cy="38" r="1.5" fill="#10847e" stroke="none" />
            <path d="M22 26 L16 22 M20 22 L16 22 L16 26" strokeWidth="1.5" />
        </svg>
    ),

    // 5. Liver Care — Liver organ shape
    liver: (
        <svg viewBox="0 0 64 64" fill="none" stroke="#10847e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 30 C12 20 18 10 28 10 C34 10 40 14 44 10 C52 6 58 14 56 24 C54 34 46 42 36 46 C24 50 14 42 14 30 Z" />
            <path d="M28 10 C26 16 24 24 28 32" strokeWidth="1.5" />
            <path d="M44 10 C44 18 42 26 44 36" strokeWidth="1.5" />
            <ellipse cx="36" cy="46" rx="5" ry="7" />
            <line x1="36" y1="53" x2="36" y2="58" />
            <circle cx="22" cy="28" r="3" fill="#10847e" stroke="none" opacity="0.35" />
        </svg>
    ),

    // 6. Oral Care — Molar tooth + dental instrument
    oral: (
        <svg viewBox="0 0 64 64" fill="none" stroke="#10847e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 12 C12 12 10 18 10 24 C10 30 12 38 16 48 C17 52 20 54 22 52 C24 48 25 44 28 44 C31 44 32 48 34 52 C36 54 39 52 40 48 C44 38 46 30 46 24 C46 18 44 12 38 12 C34 12 32 16 28 16 C24 16 22 12 18 12 Z" />
            <line x1="10" y1="26" x2="46" y2="26" strokeWidth="1.5" strokeDasharray="2,2" />
            <path d="M48 10 L58 4" />
            <circle cx="56" cy="5" r="4" fill="#10847e" fillOpacity="0.3" />
            <path d="M48 14 L44 18" strokeWidth="3" />
        </svg>
    ),

    // 7. Respiratory — Lungs + trachea + bronchi
    respiratory: (
        <svg viewBox="0 0 64 64" fill="none" stroke="#10847e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="32" y1="6" x2="32" y2="18" />
            <path d="M32 18 Q28 20 24 24" />
            <path d="M32 18 Q36 20 40 24" />
            <path d="M24 24 C16 28 10 36 12 44 C14 52 22 56 28 52 C32 50 32 44 30 40 C28 36 24 30 24 24 Z" />
            <path d="M40 24 C48 28 54 36 52 44 C50 52 42 56 36 52 C32 50 32 44 34 40 C36 36 40 30 40 24 Z" />
            <path d="M18 32 Q14 36 14 40" strokeWidth="1.5" />
            <path d="M20 38 Q16 40 16 44" strokeWidth="1.5" />
            <path d="M46 32 Q50 36 50 40" strokeWidth="1.5" />
            <path d="M44 38 Q48 40 48 44" strokeWidth="1.5" />
        </svg>
    ),

    // 8. Sexual Health — Male + Female symbols overlapping
    'sexual-health': (
        <svg viewBox="0 0 64 64" fill="none" stroke="#10847e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="22" cy="30" r="12" />
            <circle cx="42" cy="30" r="12" />
            <line x1="22" y1="42" x2="22" y2="54" />
            <line x1="17" y1="50" x2="27" y2="50" />
            <line x1="49" y1="18" x2="57" y2="10" />
            <polyline points="53,10 57,10 57,14" />
        </svg>
    ),

    // 9. Elderly Care — Two elderly figures
    elderly: (
        <svg viewBox="0 0 64 64" fill="none" stroke="#10847e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="20" cy="10" r="5" />
            <path d="M14 20 C14 16 17 15 20 15 C23 15 26 16 26 20 L26 30" />
            <path d="M14 30 L12 46" />
            <path d="M26 30 L28 46" />
            <path d="M10 46 L18 46" />
            <path d="M18 30 L14 46" />
            <path d="M14 24 L10 28" strokeWidth="1.5" />
            <circle cx="44" cy="10" r="5" />
            <path d="M38 20 C38 16 41 15 44 15 C47 15 50 16 50 20 L50 30" />
            <path d="M38 30 L36 46" />
            <path d="M50 30 L52 46" />
            <line x1="44" y1="30" x2="44" y2="46" />
            <path d="M52 40 L56 46" strokeWidth="1.5" />
            <path d="M52 38 L56 36" strokeWidth="1.5" />
            <circle cx="32" cy="28" r="2" fill="#10847e" stroke="none" opacity="0.3" />
        </svg>
    ),

    // 10. Cold & Immunity — Shield with medical cross
    cold: (
        <svg viewBox="0 0 64 64" fill="none" stroke="#10847e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M32 6 L52 14 L52 32 C52 46 42 54 32 58 C22 54 12 46 12 32 L12 14 Z" />
            <rect x="28" y="24" width="8" height="16" rx="2" fill="#10847e" fillOpacity="0.25" />
            <rect x="24" y="28" width="16" height="8" rx="2" fill="#10847e" fillOpacity="0.25" />
            <rect x="28" y="24" width="8" height="16" rx="2" />
            <rect x="24" y="28" width="16" height="8" rx="2" />
            <circle cx="18" cy="16" r="2" fill="#10847e" stroke="none" />
            <circle cx="46" cy="16" r="2" fill="#10847e" stroke="none" />
            <path d="M50 48 L54 44 M50 44 L54 48" strokeWidth="1.5" />
            <path d="M10 48 L14 44 M10 44 L14 48" strokeWidth="1.5" />
        </svg>
    ),

    // 11. Kidney — Kidney shape
    kidney: (
        <svg viewBox="0 0 64 64" fill="none" stroke="#10847e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 14 C8 16 6 30 10 42 C14 52 26 58 34 52 C40 48 40 40 34 36 C28 32 28 26 34 22 C40 18 46 20 50 14 C44 8 26 10 18 14 Z" />
            <path d="M46 14 C54 18 58 28 56 40 C54 50 46 56 38 54" />
            <line x1="34" y1="36" x2="38" y2="52" strokeWidth="1.5" />
        </svg>
    ),

    // 12. Bone — Bone shape
    bone: (
        <svg viewBox="0 0 64 64" fill="none" stroke="#10847e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="14" cy="14" r="7" />
            <circle cx="50" cy="50" r="7" />
            <circle cx="50" cy="14" r="7" />
            <circle cx="14" cy="50" r="7" />
            <line x1="19" y1="19" x2="45" y2="45" strokeWidth="6" stroke="white" />
            <line x1="19" y1="19" x2="45" y2="45" />
            <line x1="45" y1="19" x2="19" y2="45" strokeWidth="6" stroke="white" />
            <line x1="45" y1="19" x2="19" y2="45" />
        </svg>
    ),

    // 13. Skin — Skin/body outline with spots
    skin: (
        <svg viewBox="0 0 64 64" fill="none" stroke="#10847e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M32 6 C18 6 10 16 10 28 C10 42 18 54 32 58 C46 54 54 42 54 28 C54 16 46 6 32 6 Z" />
            <circle cx="26" cy="22" r="3.5" fill="#10847e" stroke="none" opacity="0.55" />
            <circle cx="40" cy="20" r="3.5" fill="#10847e" stroke="none" opacity="0.55" />
            <circle cx="32" cy="34" r="3.5" fill="#10847e" stroke="none" opacity="0.55" />
            <circle cx="20" cy="38" r="2.5" fill="#10847e" stroke="none" opacity="0.4" />
            <circle cx="44" cy="36" r="2.5" fill="#10847e" stroke="none" opacity="0.4" />
        </svg>
    ),

    // 14. Eye — Eye with iris
    eye: (
        <svg viewBox="0 0 64 64" fill="none" stroke="#10847e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 32 C6 32 16 12 32 12 C48 12 58 32 58 32 C58 32 48 52 32 52 C16 52 6 32 6 32 Z" />
            <circle cx="32" cy="32" r="10" />
            <circle cx="32" cy="32" r="5" fill="#10847e" stroke="none" opacity="0.45" />
            <circle cx="37" cy="27" r="2" fill="white" stroke="none" />
        </svg>
    ),

    // 15. Mental Health — Brain/head with neural activity
    mental: (
        <svg viewBox="0 0 64 64" fill="none" stroke="#10847e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M32 8 C20 8 11 16 11 26 C11 34 15 40 22 44 L22 54 C22 56 24 58 26 58 L38 58 C40 58 42 56 42 54 L42 44 C49 40 53 34 53 26 C53 16 44 8 32 8 Z" />
            <path d="M11 26 C15 24 18 28 14 32" strokeWidth="1.5" />
            <path d="M53 26 C49 24 46 28 50 32" strokeWidth="1.5" />
            <polyline points="22,30 26,26 30,32 34,22 38,30 42,26" strokeWidth="1.8" />
        </svg>
    ),
};

export const ICON_KEYS = Object.keys(HEALTH_ICONS);

export const ICON_LABELS = {
    diabetes: 'Diabetes',
    cardiac: 'Cardiac',
    stomach: 'Stomach',
    pain: 'Pain',
    liver: 'Liver',
    oral: 'Oral',
    respiratory: 'Lungs',
    'sexual-health': 'Sexual',
    elderly: 'Elderly',
    cold: 'Immunity',
    kidney: 'Kidney',
    bone: 'Bone',
    skin: 'Skin',
    eye: 'Eye',
    mental: 'Mental',
};

export const getHealthIcon = (key) => HEALTH_ICONS[key] ?? HEALTH_ICONS['cold'];
