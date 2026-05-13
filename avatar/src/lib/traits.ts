import type { Option } from "@/data/questions";
import { Archetype, archetypes } from "@/data/archetypes";
import { generateAvatarName } from "./avatar-name";
import { generateTagline } from "./tagline-generator";
import { generatePrompt } from "./prompt-generator";

export type MergedTraits = {
  aesthetic: string[];    // frequency-weighted, top 3
  energy: string[];       // all unique (they stack)
  props: string[];        // union deduplicated
  environment: string[];  // 1-2 most atmospheric
  lifestyle: string[];    // all unique
  fashion: string[];      // frequency-weighted, top 2
  tensionPairs: string[]; // detected contradictions
};

export type AvatarProfile = {
  mergedTraits: MergedTraits;
  archetype: Archetype;
  avatarName: string;
  tagline: string;
  prompt: string;
  favouriteAnimal: string;
};

// ----- Tension detection -----

const TENSION_DEFINITIONS: Array<{ a: string; b: string; label: string }> = [
  { a: "minimal",          b: "chaotic",           label: "chaotic minimalist" },
  { a: "organized",        b: "chaotic",            label: "chaotic but systemized" },
  { a: "cozy-maximalist",  b: "builder-mode",       label: "cozy but relentlessly building" },
  { a: "WFH-maximalist",   b: "nightlife-regular",  label: "remote by day, out by night" },
  { a: "side-project-hoarder", b: "plan-canceler",  label: "ambitious but avoidant" },
  { a: "hustler",          b: "cozy-maximalist",    label: "burnout-aware achiever" },
  { a: "corporate-commuter", b: "founder-mode",     label: "one foot out the door" },
  { a: "rain-romanticizer", b: "pragmatist",        label: "secretly poetic realist" },
  { a: "introverted",      b: "nightlife-regular",  label: "reluctant socialite" },
  { a: "wellness-era",     b: "caffeinated-by-habit", label: "wellness except for the caffeine" },
  { a: "solo-dweller",     b: "over-communicator",  label: "private but verbose" },
  { a: "zen",              b: "anxious",            label: "anxiously zen" },
  { a: "systems-thinker",  b: "audio-first",        label: "structured but chaotically vocal" },
];

function detectTensionPairs(lifestyle: string[], energy: string[], aesthetic: string[]): string[] {
  const all = new Set([...lifestyle, ...energy, ...aesthetic]);
  const found: string[] = [];
  for (const def of TENSION_DEFINITIONS) {
    if (all.has(def.a) && all.has(def.b)) {
      found.push(def.label);
    }
  }
  return found;
}

// ----- Merging strategies -----

function frequencyWeighted(values: string[], topN: number): string[] {
  const freq = new Map<string, number>();
  for (const v of values) freq.set(v, (freq.get(v) || 0) + 1);
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([v]) => v);
}

function blendUnique(values: string[]): string[] {
  return [...new Set(values)];
}

function atmosphericSelect(env: string[], lifestyle: string[], aesthetic: string[]): string[] {
  const unique = [...new Set(env)];
  // Prefer environments that match dominant aesthetic/lifestyle signals
  const preferCafe = [...aesthetic, ...lifestyle].some((t) =>
    ["cafe-core", "caffeinated-by-habit", "WFH-maximalist", "slow-living"].includes(t)
  );
  const preferOutdoor = [...aesthetic, ...lifestyle].some((t) =>
    ["nature", "digital-detox-curious", "solo-dweller"].includes(t)
  );

  const scored = unique.map((e) => {
    let score = 0;
    if (preferCafe && (e.includes("cafe") || e === "window-seat")) score += 2;
    if (preferOutdoor && (e === "park" || e === "street")) score += 2;
    return { e, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((x) => x.e);
}

// ----- Core merge -----

export function mergeTraits(options: Option[]): MergedTraits {
  const raw = {
    aesthetic:   [] as string[],
    energy:      [] as string[],
    props:       [] as string[],
    environment: [] as string[],
    lifestyle:   [] as string[],
    fashion:     [] as string[],
  };

  for (const opt of options) {
    const t = opt.traits;
    if (t.aesthetic)   raw.aesthetic.push(...t.aesthetic);
    if (t.energy)      raw.energy.push(...t.energy);
    if (t.props)       raw.props.push(...t.props);
    if (t.environment) raw.environment.push(...t.environment);
    if (t.lifestyle)   raw.lifestyle.push(...t.lifestyle);
    if (t.fashion)     raw.fashion.push(...t.fashion);
  }

  const aesthetic   = frequencyWeighted(raw.aesthetic, 3);
  const energy      = blendUnique(raw.energy);
  const props       = blendUnique(raw.props);
  const lifestyle   = blendUnique(raw.lifestyle);
  const fashion     = frequencyWeighted(raw.fashion, 2);
  const environment = atmosphericSelect(raw.environment, lifestyle, aesthetic);
  const tensionPairs = detectTensionPairs(lifestyle, energy, aesthetic);

  return { aesthetic, energy, props, environment, lifestyle, fashion, tensionPairs };
}

// ----- Archetype scoring (updated for new trait categories) -----

export function calculateArchetype(traits: MergedTraits): Archetype {
  const allValues = new Set([
    ...traits.aesthetic,
    ...traits.energy,
    ...traits.props,
    ...traits.environment,
    ...traits.lifestyle,
    ...traits.fashion,
  ]);

  const scores = archetypes.map((arch) => ({
    arch,
    score: arch.definingTraits.reduce(
      (acc, t) => acc + (allValues.has(t) ? 1 : 0),
      0
    ),
  }));

  scores.sort((a, b) => b.score - a.score);
  return scores[0].arch;
}

// ----- Main pipeline -----

export function buildAvatarProfile(selectedOptions: Option[], favouriteAnimal: string): AvatarProfile {
  const mergedTraits = mergeTraits(selectedOptions);
  const archetype   = calculateArchetype(mergedTraits);
  const avatarName  = generateAvatarName(mergedTraits);
  const tagline     = generateTagline(mergedTraits);
  const prompt      = generatePrompt(mergedTraits, archetype, favouriteAnimal);

  return { mergedTraits, archetype, avatarName, tagline, prompt, favouriteAnimal };
}
