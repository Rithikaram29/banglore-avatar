import type { MergedTraits } from "./traits";

type PickedWords = {
  prop: string;
  lifestyle: string;
  energyAdj: string;
  env: string;
  emotion: string;
  activity: string;
  fuel: string;
};

const PROP_WORDS: Record<string, string> = {
  "laptop":         "unfinished PRs",
  "coffee":         "cold brew",
  "iced coffee":    "iced coffee",
  "filter coffee":  "filter coffee",
  "headphones":     "noise cancellation",
  "chai":           "chai",
  "matcha":         "matcha",
  "blanket":        "a strategic blanket",
  "notion":         "notion docs",
  "pitch deck":     "a pitch deck in progress",
  "red bull":       "caffeine and anxiety",
  "journal":        "a half-filled journal",
  "phone":          "too many tabs",
  "voice memos":    "voice notes nobody asked for",
};

const LIFESTYLE_WORDS: Record<string, string> = {
  "side-project-hoarder":      "questionable ambition",
  "slow-living":               "intentional slowness",
  "caffeinated-by-habit":      "chemical dependency",
  "WFH-maximalist":            "zero commute theology",
  "nightlife-regular":         "late-night optimism",
  "overthinker":               "thoughts that won't stop",
  "rain-romanticizer":         "weather-dependent serotonin",
  "solo-dweller":              "comfortable solitude",
  "chronic-planner":           "planning energy",
  "cozy-maximalist":           "cozy maximalism",
  "corporate-commuter":        "transit-based meditation",
  "wellness-era":              "wellness ambitions",
  "plan-canceler":             "plan cancellation energy",
  "screen-rotting-as-recovery":"strategic rotting",
  "street-savvy":              "Bangalore wisdom",
  "founder-mode":              "unrelenting optimism",
  "work-life-boundary-haver":  "a healthy relationship with clocking out",
  "systems-thinker":           "spreadsheet-backed feelings",
  "audio-first":               "voice notes nobody asked for",
};

const ENERGY_ADJ_WORDS: Record<string, string> = {
  "night-owl":            "nocturnal",
  "calm":                 "calm",
  "caffeinated-by-habit": "caffeinated",
  "caffeinated":          "very awake",
  "introverted":          "deeply introverted",
  "social":               "suspiciously social",
  "hustler":              "suspiciously productive",
  "zen":                  "weirdly calm",
  "anxious":              "fine",
  "grounded":             "grounded",
  "systematic":           "alarmingly organized",
  "tired":                "fine (not fine)",
  "coping":               "fine",
  "stressed":             "totally fine",
};

const ENV_WORDS: Record<string, string> = {
  "cafe":           "any available cafe",
  "third-wave cafe":"overpriced cafes",
  "home":           "the comfort of home",
  "park":           "green spaces",
  "office":         "a well-lit office",
  "rooftop":        "Bangalore rooftops",
  "darshini":       "the nearest darshini",
  "metro":          "the purple line",
  "window-seat":    "rainy window seats",
};

const EMOTION_WORDS: Record<string, string> = {
  "rain-coded":    "weather-induced nostalgia",
  "melancholic":   "gentle melancholy",
  "aspirational":  "deferred ambition",
  "cozy":          "earned comfort",
  "builder":       "productive guilt",
  "dreamer":       "beautiful delusion",
  "minimal":       "curated emptiness",
  "chaotic":       "productive chaos",
};

const ACTIVITY_WORDS: Record<string, string> = {
  "caffeinated-by-habit": "ordering a third coffee",
  "side-project-hoarder": "adding to a notion doc",
  "chronic-planner":      "planning something that may never ship",
  "nightlife-regular":    "somewhere with rooftop access",
  "cozy-maximalist":      "rotting productively",
  "rain-romanticizer":    "writing a caption for the rain",
  "solo-dweller":         "enjoying their own company",
  "wellness-era":         "reading about wellness",
  "digital-detox-curious":"touching grass, briefly",
  "systems-thinker":      "threading a Slack message",
};

function pick<T>(map: Record<string, T>, keys: string[], fallback: T): T {
  for (const key of keys) {
    if (map[key] !== undefined) return map[key];
  }
  return fallback;
}

const TEMPLATES: Array<(w: PickedWords) => string> = [
  (w) => `Powered by ${w.prop} and ${w.lifestyle}.`,
  (w) => `Looks ${w.energyAdj}. Has 37 unread notifications.`,
  (w) => `Thriving in ${w.env} and mild ${w.emotion}.`,
  (w) => `Probably ${w.activity} right now.`,
  (w) => `Running on ${w.fuel}. Calendar is full of good intentions.`,
  (w) => `${w.lifestyle} is a personality trait now. Embrace it.`,
  (_) => `Main character energy. Supporting character execution.`,
  (_) => `Has a system. The system does not work. Moving on.`,
  (w) => `Will cancel plans for ${w.env}. No regrets.`,
  (_) => `Currently healing. Progress: ongoing.`,
];

export function generateTagline(traits: MergedTraits): string {
  const allKeys = [
    ...traits.lifestyle,
    ...traits.energy,
    ...traits.aesthetic,
    ...traits.environment,
  ];

  const words: PickedWords = {
    prop:      pick(PROP_WORDS,       traits.props,                "caffeine"),
    lifestyle: pick(LIFESTYLE_WORDS,  traits.lifestyle,            "vibes"),
    energyAdj: pick(ENERGY_ADJ_WORDS, traits.energy,              "present"),
    env:       pick(ENV_WORDS,        traits.environment,          "Bangalore"),
    emotion:   pick(EMOTION_WORDS,    traits.aesthetic,            "existential dread"),
    activity:  pick(ACTIVITY_WORDS,   traits.lifestyle,            "existing"),
    fuel:      pick(PROP_WORDS,       traits.props,                "hope"),
  };

  // Pick template deterministically based on dominant lifestyle trait
  const dominant = traits.lifestyle[0] ?? traits.energy[0] ?? "";
  const hash = dominant.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const template = TEMPLATES[hash % TEMPLATES.length];

  return template(words);
}
