import type { MergedTraits } from "./traits";
import type { Archetype } from "@/data/archetypes";

const AESTHETIC_MAP: Record<string, string> = {
  "cozy":          "warm cozy indie aesthetic",
  "cafe-core":     "cafe-core aesthetic",
  "minimal":       "clean minimalist aesthetic",
  "dark":          "dark moody aesthetic",
  "urban":         "urban street aesthetic",
  "nightlife":     "nightlife editorial aesthetic",
  "builder":       "maker/hacker aesthetic",
  "startup":       "startup-core aesthetic",
  "rain-coded":    "rainy day melancholic aesthetic",
  "soft":          "soft muted aesthetic",
  "traditional":   "classic South Indian aesthetic",
  "wellness":      "wellness-core aesthetic",
  "authentic":     "raw authentic aesthetic",
  "aspirational":  "aspirational creative aesthetic",
  "domestic":      "warm domestic aesthetic",
  "aesthetic":     "editorial fine-art aesthetic",
  "nature":        "organic earth-tone nature aesthetic",
  "mysterious":    "understated mysterious aesthetic",
  "zen":           "peaceful zen aesthetic",
};

const FASHION_MAP: Record<string, string> = {
  "oversized tee":               "oversized graphic tee with laptop sticker collection",
  "headphones-as-jewelry":       "ANC headphones worn like a necklace",
  "comfortable earth tones":     "earth-tone linen and soft cotton",
  "sneakers":                    "worn-in sneakers",
  "curated going-out look":      "curated streetwear, effortlessly put-together",
  "statement piece":             "one bold statement accessory",
  "startup merch":               "startup hoodie layered with self-awareness",
  "comfort-maximized":           "comfort-maximized everyday outfit",
  "ANC headphones permanent":    "ANC headphones as permanent head accessory",
  "functional minimalist":       "functional minimalist wardrobe",
  "laptop-bag chic":             "stylish laptop bag as centerpiece",
  "ready-for-cafe":              "always cafe-ready outfit",
  "business casual with dead eyes": "business casual with existentially tired eyes",
  "same hoodie day 3":           "same lived-in hoodie for third day running",
  "cafe-core aesthetic":         "indie cafe-core outfit: tote, layers, earthy tones",
  "home uniform":                "soft home uniform: oversized everything",
  "monsoon-ready but make it aesthetic": "rain-ready layers styled intentionally",
  "soft aesthetics":             "soft muted layers, comfortable and intentional",
  "pajamas all day justified":   "pajamas elevated to daywear",
  "curated effortless":          "curated effortless Indiranagar look",
  "all black everything":        "all-black minimal outfit",
  "whatever fits the chaos":     "chaotically assembled but somehow working outfit",
  "clean precise look":          "clean structured outfit, highly organized",
  "startup merch non-ironic":    "startup merch worn with full sincerity",
  "smart casual decisive":       "decisive smart casual",
  "corporate-day cafe-night":    "corporate blazer, cafe tote, dual-purpose bag",
  "comfortable confident":       "comfortable, confident, unimpressed by hustle culture",
  "practical everyday":          "practical everyday Bangalore outfit",
  "no-fuss classic":             "no-fuss classic South Indian-modern style",
};

const ENV_LAYER: Record<string, { scene: string; lighting: string; weather: string }> = {
  "cafe":           { scene: "Bangalore third-wave cafe with rain-streaked windows", lighting: "warm tungsten light, steam from coffee", weather: "overcast Bangalore afternoon" },
  "third-wave cafe":{ scene: "specialty coffee shop in Indiranagar", lighting: "warm Edison bulb glow", weather: "rainy Bangalore evening" },
  "rooftop":        { scene: "Indiranagar rooftop with city lights", lighting: "neon glow, string lights, city haze", weather: "post-rain Bangalore night, humid air" },
  "bar":            { scene: "dimly lit Bangalore rooftop bar", lighting: "warm amber bar light, neon signage", weather: "Bangalore night sky" },
  "park":           { scene: "Cubbon Park with dappled morning light", lighting: "soft natural light through tree canopy", weather: "cool Bangalore morning with mist" },
  "home-office":    { scene: "Bangalore apartment home office", lighting: "3am laptop glow, soft desk lamp", weather: "rain on window" },
  "home":           { scene: "cozy Bangalore apartment", lighting: "warm interior, dim soft light", weather: "rain audible outside" },
  "office":         { scene: "Whitefield tech park", lighting: "fluorescent corporate light, subtle sadness", weather: "Bangalore afternoon" },
  "metro":          { scene: "Namma Metro Purple Line", lighting: "cool LED metro light", weather: "Bangalore skyline through window" },
  "darshini":       { scene: "Bangalore darshini with steel tumblers and morning rush", lighting: "early morning flat light", weather: "cool Bangalore morning" },
  "window-seat":    { scene: "cafe window seat overlooking rain-soaked Bangalore street", lighting: "grey daylight, soft reflections", weather: "heavy Bangalore monsoon rain" },
  "street":         { scene: "Bangalore street with puddles and auto rickshaws", lighting: "post-rain golden hour light", weather: "just-after-rain Bangalore humidity" },
  "co-working":     { scene: "Koramangala co-working space with whiteboards", lighting: "cool daylight, productive energy", weather: "Bangalore startup afternoon" },
};

export function generatePrompt(traits: MergedTraits, archetype: Archetype, favouriteAnimal: string): string {
  // Layer 1: Core Look
  const aestheticWords = traits.aesthetic
    .slice(0, 2)
    .map((a) => AESTHETIC_MAP[a] ?? a)
    .join(", ");

  const fashionWords = traits.fashion
    .slice(0, 2)
    .map((f) => FASHION_MAP[f] ?? f)
    .join(", ");

  const energyWords = traits.energy.slice(0, 2).join(", ");

  // Layer 2: Props + Environment
  const propWords = traits.props.slice(0, 3).join(", ");
  const primaryEnv = traits.environment[0] ?? "cafe";
  const envDetail = ENV_LAYER[primaryEnv] ?? ENV_LAYER["cafe"];

  // Layer 3: Emotional Atmosphere
  const tension = traits.tensionPairs.length > 0
    ? ` Personality tension: ${traits.tensionPairs[0]}.`
    : "";

  const animal = favouriteAnimal?.trim() || "cat";

  return (
    // Style direction always comes first so the model anchors on it
    `Stylized cinematic 3D character portrait, premium animated film aesthetic, ` +
    `soft expressive facial features, large emotionally readable eyes, ` +
    `subtle stylization with realistic rendering balance, ` +
    `NOT photorealistic, NOT hyperrealistic, NOT uncanny valley. ` +
    `Warm cinematic atmosphere, shallow depth of field, soft glowing practical lights, ` +
    `creamy bokeh background, rich color contrast, intimate storytelling frame, ` +
    `high-end animated movie render quality. ` +
    `Subject: an anthropomorphic ${animal} character living in Bangalore, ` +
    `${archetype.id} archetype, expressive humanoid posture but unmistakably a ${animal}, ` +
    `wearing clothes and using props like a person. ` +
    `Aesthetic: ${aestheticWords}. ` +
    `Wearing: ${fashionWords || "casual urban Bangalore outfit"}. ` +
    `Carrying: ${propWords || "coffee and a laptop"}. ` +
    `Energy: ${energyWords}.${tension} ` +
    `Scene: ${envDetail.scene}. ` +
    `Lighting: ${envDetail.lighting}. ` +
    `Weather atmosphere: ${envDetail.weather}. ` +
    `Highly expressive face with subtle exaggerated features, emotionally recognizable, ` +
    `with the image very clearly showing what the character is holding/doing in the scene`
  );
}
