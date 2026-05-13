export type Archetype = {
  id: string;
  description: string;
  definingTraits: string[];
  gradient: string;
  glowColor: string;
  accentColor: string;
  textColor: string;
  avatarEmoji: string[];
  bgEmoji: string[];
};

export const archetypes: Archetype[] = [
  {
    id: "night-owl",
    description: "You are the main character of every Indiranagar Saturday. Rooftop regular. Professional 'one more drink' person.",
    definingTraits: ["nightlife", "night-owl", "social", "rooftop", "nightlife-regular", "urban", "brunch-person", "people-person"],
    gradient: "linear-gradient(135deg, #1a0533 0%, #3d1068 40%, #7c3aed 70%, #a855f7 100%)",
    glowColor: "rgba(168, 85, 247, 0.6)",
    accentColor: "#a855f7",
    textColor: "#e9d5ff",
    avatarEmoji: ["🌙", "🥂", "✨"],
    bgEmoji: ["🌃", "🎶", "💜", "🌟"],
  },
  {
    id: "startup-goblin",
    description: "You eat disruption for breakfast (with oat milk). Your Figma files have more layers than your personality.",
    definingTraits: ["startup", "builder", "hustler", "startup-adjacent", "founder-mode", "builder-mode", "demo-day-optimist", "networking-regular"],
    gradient: "linear-gradient(135deg, #0c1a2e 0%, #0f3460 40%, #0891b2 70%, #06b6d4 100%)",
    glowColor: "rgba(6, 182, 212, 0.6)",
    accentColor: "#06b6d4",
    textColor: "#cffafe",
    avatarEmoji: ["🚀", "💡", "⚡"],
    bgEmoji: ["💻", "📊", "🔥", "🎯"],
  },
  {
    id: "healing-arc",
    description: "You're in your soft era. Cubbon Park is your therapist. You journaled about this.",
    definingTraits: ["nature", "zen", "introverted", "park", "melancholic", "soft", "digital-detox-curious", "solo-dweller", "journal-haver"],
    gradient: "linear-gradient(135deg, #022c22 0%, #065f46 40%, #10b981 70%, #6ee7b7 100%)",
    glowColor: "rgba(16, 185, 129, 0.6)",
    accentColor: "#10b981",
    textColor: "#d1fae5",
    avatarEmoji: ["🌿", "🍃", "✨"],
    bgEmoji: ["🌸", "🌳", "☁️", "🎵"],
  },
  {
    id: "cafe-nomad",
    description: "Your office is wherever the wifi is strong and the iced coffee is cold. Every seat is a desk.",
    definingTraits: ["cafe-core", "WFH-maximalist", "caffeinated-by-habit", "slow-living", "location-independent", "coffee-connoisseur", "aesthetic-enjoyer"],
    gradient: "linear-gradient(135deg, #1c0a00 0%, #7c2d12 40%, #ea580c 70%, #fb923c 100%)",
    glowColor: "rgba(251, 146, 60, 0.6)",
    accentColor: "#f97316",
    textColor: "#ffedd5",
    avatarEmoji: ["☕", "💻", "🎧"],
    bgEmoji: ["📚", "✏️", "🌧️", "💫"],
  },
  {
    id: "philosopher",
    description: "You're either cooking elaborate meals or spiraling. No in-between. Your aesthetic is 'cozy chaos'.",
    definingTraits: ["cozy-maximalist", "calm", "solo-chef-era", "home", "introverted", "melancholic", "screen-rotting-as-recovery", "comfort-seeker", "overthinker"],
    gradient: "linear-gradient(135deg, #0f0c29 0%, #302b63 40%, #4f46e5 70%, #818cf8 100%)",
    glowColor: "rgba(99, 102, 241, 0.6)",
    accentColor: "#6366f1",
    textColor: "#e0e7ff",
    avatarEmoji: ["🏠", "🌙", "📚"],
    bgEmoji: ["🕯️", "🫖", "🌧️", "💭"],
  },
  {
    id: "commuter-survivor",
    description: "You've transcended the commute. You've accepted the Outer Ring Road as your destiny. The shuttle is your office now.",
    definingTraits: ["corporate-commuter", "coping", "suburban-survivor", "tired", "podcast-dependent", "office", "metro-pilled", "noise-sensitive"],
    gradient: "linear-gradient(135deg, #111827 0%, #1f2937 40%, #374151 70%, #6b7280 100%)",
    glowColor: "rgba(107, 114, 128, 0.5)",
    accentColor: "#9ca3af",
    textColor: "#f9fafb",
    avatarEmoji: ["🚌", "🎧", "😮‍💨"],
    bgEmoji: ["🚦", "🏢", "☕", "💼"],
  },
  {
    id: "darshini-regular",
    description: "You're the most sane person in this city. Filter coffee before 8am. Zero FOMO. Actually happy.",
    definingTraits: ["local-first", "tradition-keeper", "darshini", "grounded", "value-maximizer", "street-wise", "anti-hype", "work-life-boundary-haver"],
    gradient: "linear-gradient(135deg, #1c1300 0%, #713f12 40%, #ca8a04 70%, #fbbf24 100%)",
    glowColor: "rgba(251, 191, 36, 0.6)",
    accentColor: "#eab308",
    textColor: "#fefce8",
    avatarEmoji: ["☕", "🏡", "🌅"],
    bgEmoji: ["🫖", "🌞", "🌿", "✨"],
  },
  {
    id: "weekend-warrior",
    description: "You have more going on socially than most people have in a year. You're invited everywhere. You show up.",
    definingTraits: ["nightlife-regular", "brunch-person", "social", "expressive", "bold", "street-savvy", "audio-first", "chaotic-human"],
    gradient: "linear-gradient(135deg, #2d0024 0%, #831843 40%, #ec4899 70%, #f472b6 100%)",
    glowColor: "rgba(236, 72, 153, 0.6)",
    accentColor: "#ec4899",
    textColor: "#fce7f3",
    avatarEmoji: ["🎉", "💃", "🌟"],
    bgEmoji: ["✨", "🎵", "🥂", "💖"],
  },
  {
    id: "rain-coded",
    description: "You are the vibe. Rainy days are your main character moments. You have a whole aesthetic and a journal to prove it.",
    definingTraits: ["rain-coded", "rain-romanticizer", "content-creator-brain", "overthinker", "journal-haver", "observant", "sensitive"],
    gradient: "linear-gradient(135deg, #0c1330 0%, #1e3a5f 40%, #2563eb 70%, #60a5fa 100%)",
    glowColor: "rgba(96, 165, 250, 0.6)",
    accentColor: "#3b82f6",
    textColor: "#dbeafe",
    avatarEmoji: ["🌧️", "🎨", "💙"],
    bgEmoji: ["☁️", "🌊", "🎵", "✨"],
  },
];
