# Bangalore Avatar

Tiny quiz. Big personality reveal. Mildly dramatic AI portrait energy. ✨

This app turns your Bangalore-coded choices into a custom avatar profile: name, tagline, traits, prompt, and, when the image API is configured, a generated portrait. It is built for the person who says "just one quick quiz" and then emotionally identifies with the result. Very unserious. Secretly accurate.

```txt
answer quiz -> receive avatar -> stare at it -> say "wait why is this me"
```

## What It Does

- Asks a short personality quiz, because attention spans are precious
- Optionally lets you upload a reference photo
- Merges answers into aesthetic, energy, lifestyle, fashion, props, and environment traits
- Picks an archetype from local data
- Generates a cute avatar name and tagline
- Builds an image prompt locally
- Calls the `/api/generate-avatar` route to generate an image
- Shows a shareable/downloadable result card for maximum main-character distribution

## The Vibe

Think:

- rainy Bangalore windows 🌧️
- third-wave cafe laptop aura ☕
- overthinking as a lifestyle
- cozy cyberpunk, but make it emotionally specific
- "this is a joke" until the result is too accurate
- a little dramatic, a little caffeinated, a little `npm run dev`

## Tech Stack

- Next.js Pages Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Hugging Face Inference client for image generation

## Project Map

```txt
src/pages/index.tsx              home screen
src/pages/quiz.tsx               quiz flow + generation trigger
src/pages/result.tsx             final avatar result
src/pages/api/generate-avatar.ts image generation API route

src/lib/traits.ts                quiz answers -> merged profile
src/lib/prompt-generator.ts      merged traits -> image prompt
src/lib/avatar-name.ts           merged traits -> avatar name
src/lib/tagline-generator.ts     merged traits -> tagline

src/components/AvatarCard.tsx    result card UI
src/components/PhotoUpload.tsx   optional photo upload
src/components/LoadingScreen.tsx loading stage UI
```

## Getting Started

Clone, install, run. The holy trinity.

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Environment

Image generation needs a Hugging Face token. No token, no portrait. The app will still serve personality, just not pixels.

Create `avatar/.env`:

```env
HF_TOKEN=your_hugging_face_token_here
```

Then restart the dev server. Server env vars are not a hot-reload girlie.

If `HF_TOKEN` is missing, the quiz can still build the local profile, but `/api/generate-avatar` will return:

```txt
HF_TOKEN not configured
```

## How Generation Works

The quiz does not ask an LLM to decide your personality. The logic is local and deterministic-ish. The image model only gets the final prompt after the app has already assembled your whole Bangalore lore.

```txt
answers
  -> buildAvatarProfile()
  -> mergeTraits()
  -> calculateArchetype()
  -> generateAvatarName()
  -> generateTagline()
  -> generatePrompt()
  -> /api/generate-avatar
  -> generated image
```

The actual prompt text is assembled in:

```txt
src/lib/prompt-generator.ts
```

The API call lives in:

```txt
src/pages/api/generate-avatar.ts
```

## Useful Commands

For when the repo needs a little supervision:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Notes For Future Chaos

- Want different image style? Edit `src/lib/prompt-generator.ts`.
- Want different personality outcomes? Edit `src/data/archetypes.ts`.
- Want different quiz inputs? Edit `src/data/questions.ts`.
- Want a local model instead of a hosted API? Replace `/api/generate-avatar` with a bridge to ComfyUI or another local image server.
- Want more lore? Add more trait mappings. Let the archetypes become suspiciously specific.

## Deployment Check

Before deploying, make sure:

- `HF_TOKEN` is configured in the deployment environment
- the image provider/model in `generate-avatar.ts` is available to your token
- generated image data URLs are acceptable for your hosting/runtime limits
- you have tested the full quiz-to-result flow, not just the home page

## Moodboard

Built for Bangalore avatars who are caffeinated, rain-aware, slightly online, emotionally attached to their neighborhood, and somehow still debugging in production.

May your prompts be vivid, your tokens valid, and your generated avatar oddly validating. 💅
