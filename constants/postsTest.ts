export interface posts {
  id: number;
  title: string;
  description: string;
  audio: null | string;
  createdAt: string;
  images: string[];
}

export const testPosts: posts[] = [
  {
    id: 1,
    title: "Morning Reflections",
    description: `
### Morning Reflections

- A short piece about **clarity**
- Focuses on starting the day with intention

> Sometimes silence teaches more than noise.
    `,
    audio:
      "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3",
    images: [
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.l_CdQuF34A5cTa55Kc53TQHaF7%3Fpid%3DApi&f=1&ipt=89c93c999ed65e63bf2220daae1fb962fba2bb9703ca4d18e2466508a14e8175&ipo=images",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.JLKaa745AKVMR1gDBfyC2AHaEo%3Fpid%3DApi&f=1&ipt=aaea58d1ed2aebaa095436bf1ba5d796b0667e0ac64f494b901c9959fbd15fe1&ipo=images",
      "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    ],
    createdAt: "2025-01-01T08:00:00.000Z",
  },
  {
    id: 2,
    title: "Learning to Pause",
    description: `
## Learning to Pause

**Key ideas:**
- Slow down
- Observe before acting
- Avoid impulsive decisions
- Kill a man
- Kill another man
- kill an extra man
- just keep on killing, bud

\`Pause > React\`
    `,
    audio: null,
    images: [
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.eFIRwbcEoEcJi30i_NLHiwHaH2%3Fpid%3DApi",
    ],
    createdAt: "2025-01-02T08:00:00.000Z",
  },

  {
    id: 3,
    title: "Creative Momentum",
    description: `
### Creative Momentum

Creativity grows when you:
1. Start small
2. Stay consistent
3. Ignore perfection early
    `,
    audio:
      "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3",
    images: [
      "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.IFYMiHANYrBgtKRQUg_8OAHaHa%3Fpid%3DApi&f=1&ipt=eaabc23c27158e694e8a6c3158945f78d38306cda2247eb84d66d1f56ca33a56&ipo=images",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.FNO-lhjUqZdtKKz3lVCvzAHaKL%3Fpid%3DApi&f=1&ipt=b2867a25f2422744ee708a590720eafb81bd5ad89879b29ca50d5cf07e218d2e&ipo=images",
      "",
    ],
    createdAt: "2025-01-03T08:00:00.000Z",
  },
];
