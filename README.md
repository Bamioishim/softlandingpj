# Soft Landing

Build "Soft Landing", a voice-first AI chat app that helps people moving to New York City find the neighborhoods, food spots, and scenes that match their taste. It is an entry for the Qloo Agentic Hackathon, so it must look polished and clearly show an AI agent reasoning step by step.

Design: dark, modern, premium look (deep navy/black background, warm orange-to-pink gradient accent, glassmorphism cards, rounded corners, smooth subtle animations). Mobile-first and responsive. App name "Soft Landing" with tagline "Move to NYC. Feel at home on day one."

Layout:
1. Landing hero with tagline, a big glowing microphone button, and 3 clickable example prompts:
   - "I love Afrobeats, spicy food and I'm on a student budget. Where should I live?"
   - "I'm into indie films, coffee shops and quiet streets."
   - "Hip-hop, sneakers, late-night food, mid budget."
2. Chat screen: ChatGPT-style conversation. User can speak (mic button) or type (text box always available as fallback). Assistant replies appear as text AND are read aloud.
3. Each assistant answer shows rich cards: top 3 neighborhood matches (name, borough, match score %, 1-line why, rent vibe $/$$/$$$), 4-6 place cards (restaurant/venue/cafe with category, neighborhood, short reason), and a collapsible "First 30 days" plan (week 1-4 bullet list).
4. A collapsible "Agent steps" panel under each answer that lists what the agent did, e.g. "1. Understood your tastes: Afrobeats, spicy food, budget", "2. Matched taste signals (Qloo)", "3. Scored NYC neighborhoods (Qloo heatmap)", "4. Found places you'd love (Qloo insights)", "5. Wrote your plan", each with a check icon and small timing.
5. A toggle at top: "Qloo-grounded" vs "LLM-only" so judges can compare answers (for now just a UI toggle that changes a label in the answer).

Voice: use the browser Web Speech API. SpeechRecognition (webkitSpeechRecognition) for input with a pulsing listening state and live transcript; speechSynthesis to read replies aloud, with a speaker on/off toggle and a stop button. If the browser doesn't support speech recognition, hide the mic and show a small note "Voice works best in Chrome" while text input keeps working.

Data: for now, do NOT call any external API. Create a mock agent function (in a separate file, e.g. src/lib/agent.ts) with an async function runAgent(userMessage) that simulates ~2 seconds of step-by-step progress and returns structured results from a realistic local mock dataset of NYC neighborhoods (e.g. Bed-Stuy, Harlem, Crown Heights, Astoria, Williamsburg, Jackson Heights, Lower East Side, Park Slope) and places, picking matches based on simple keyword matching of the user's tastes. Keep this function isolated so it can later be replaced by real calls to the Qloo API and an LLM through a server function.

Add a small footer: "Powered by Qloo Taste AI" and an "About" modal explaining the app in 3 sentences.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://softlandingpj.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/06c0b190-8038-419c-bd9e-81023daa0304).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
