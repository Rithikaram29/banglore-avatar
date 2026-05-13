import type { MergedTraits } from "./traits";

const ENERGY_ADJ: Record<string, string[]> = {
  "night-owl":            ["Midnight", "Late-Night", "Nocturnal"],
  "caffeinated-by-habit": ["Chronically Caffeinated", "Triple-Shot"],
  "caffeinated":          ["Caffeinated", "Highly Caffeinated"],
  "hustler":              ["Relentless", "Always-On", "Chronically Busy"],
  "zen":                  ["Unbothered", "Serenely Detached"],
  "slow-starter":         ["Perpetually Late", "Chronically"],
  "anxious":              ["Quietly Anxious", "Mildly Spiraling"],
  "introverted":          ["Quietly", "Silently Chaotic"],
  "social":               ["Loudly Present", "Aggressively Social"],
  "calm":                 ["Softly Chaotic", "Peacefully"],
  "grounded":             ["Reliably", "Sturdily"],
  "systematic":           ["Obsessively Organized"],
  "creative":             ["Chaotically Creative"],
  "dreamer":              ["Chronically Dreaming"],
  "bold":                 ["Brazenly"],
  "street-smart":         ["Deceptively"],
  "intentional":          ["Deliberately"],
  "coping":               ["Barely", "Heroically"],
  "tired":                ["Heroically Tired"],
  "avoidant":             ["Strategically"],
  "observant":            ["Quietly Watchful"],
  "stressed":             ["Productively Stressed"],
  "sensitive":            ["Softly"],
  "optimistic":           ["Relentlessly Optimistic"],
  "expressive":           ["Loudly"],
};

const IDENTITY_NOUN: Record<string, string[]> = {
  "builder-mode":              ["Builder", "Maker"],
  "side-project-hoarder":      ["Serial Side-Projecter", "Dreamer"],
  "cozy-maximalist":           ["Professional Cozy Person", "Hermit"],
  "WFH-maximalist":            ["Remote Native", "Cafe Dweller"],
  "nightlife-regular":         ["Scene Regular", "Social Butterfly"],
  "overthinker":               ["Philosopher", "Overthinker"],
  "rain-romanticizer":         ["Weather Poet", "Romantic"],
  "startup-adjacent":          ["Ecosystem Regular", "Would-Be Founder"],
  "corporate-commuter":        ["Shuttle Lifer", "Traffic Survivor"],
  "local-first":               ["OG Regular", "Realist"],
  "wellness-era":              ["Wellness Convert"],
  "journal-haver":             ["Quiet Intellectual"],
  "digital-detox-curious":     ["Park Regular", "Nature Person"],
  "chronic-planner":           ["Perpetual Planner"],
  "solo-dweller":              ["Solitary Figure", "Lone Wolf"],
  "content-creator-brain":     ["Content Machine"],
  "founder-mode":              ["Founder", "Builder"],
  "side-project-dreamer":      ["Secret Builder"],
  "work-life-boundary-haver":  ["Enlightened Employee"],
  "screen-rotting-as-recovery":["Recovering Human"],
  "street-savvy":              ["Street Philosopher"],
  "audio-first":               ["Voice Note Enthusiast"],
  "systems-thinker":           ["System Architect"],
  "over-communicator":         ["Prolific Communicator"],
  "minimal-responder":         ["Man of Few Words", "Woman of Few Words"],
  "tradition-keeper":          ["Purist"],
  "coffee-connoisseur":        ["Connoisseur"],
  "value-maximizer":           ["Pragmatist"],
};

const LOCATIONS: Record<string, string[]> = {
  "cafe":           ["Indiranagar", "Koramangala"],
  "third-wave cafe":["Indiranagar", "Vasanth Nagar"],
  "rooftop":        ["Indiranagar", "Church Street"],
  "bar":            ["Indiranagar", "MG Road"],
  "co-working":     ["Koramangala", "HSR Layout"],
  "startup office": ["Koramangala", "HSR Layout"],
  "park":           ["Cubbon Park", "Lalbagh"],
  "office":         ["Whitefield", "Electronic City"],
  "tech park":      ["Whitefield", "Outer Ring Road"],
  "suburban":       ["Whitefield", "Marathahalli"],
  "darshini":       ["Jayanagar", "JP Nagar"],
  "home":           ["HSR Layout", "BTM Layout"],
  "home-office":    ["HSR Layout", "Koramangala"],
  "metro":          ["Namma Metro", "Purple Line"],
  "window-seat":    ["Bangalore", "Some Rainy Cafe"],
  "street":         ["Koramangala", "Bangalore"],
};

function pickByFrequency(map: Record<string, string[]>, keys: string[]): string | null {
  const counts = new Map<string, number>();
  for (const key of keys) {
    const mapped = map[key];
    if (!mapped) continue;
    for (const v of mapped) {
      counts.set(v, (counts.get(v) || 0) + 1);
    }
  }
  if (counts.size === 0) return null;
  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  const pool = map[sorted[0][0]];
  return pool ? pool[0] : null;
}

export function generateAvatarName(traits: MergedTraits): string {
  const allEnergy = [...traits.energy, ...traits.lifestyle];
  const allIdentity = [...traits.lifestyle, ...traits.aesthetic];
  const allEnv = [...traits.environment, ...traits.lifestyle];

  const energyAdj = pickByFrequency(ENERGY_ADJ, allEnergy) ?? "Quietly Chaotic";
  const identityNoun = pickByFrequency(IDENTITY_NOUN, allIdentity) ?? "Person";
  const location = pickByFrequency(LOCATIONS, allEnv) ?? "Bangalore";

  return `The ${energyAdj} ${identityNoun} of ${location}`;
}
