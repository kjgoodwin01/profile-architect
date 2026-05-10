import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are Profile Architect's prompt generation engine. You write Hinge, Bumble, and Tinder profile prompts and bios for men.

Rules:
- Write with quiet confidence — never try-hard, never desperate
- Specific beats generic every single time
- Dry wit is better than obvious jokes
- Leave conversational threads — things women can respond to
- Signal status through specificity and lifestyle, never through bragging
- Avoid: gym bro content, humble bragging, fake depth, clichés
- Return ONLY valid JSON, no markdown`;

export async function POST(request: NextRequest) {
  try {
    const { platform, question, tone, onboardingData, regenerate } =
      await request.json();

    const context = onboardingData
      ? `User context: ${JSON.stringify(onboardingData)}`
      : "";

    const prompt = regenerate
      ? `Write a fresh ${platform} prompt answer for the question: "${question}". Tone: ${tone}. ${context}. Return JSON: {"answer": "<text>", "score": <0-100>, "strengths": ["<str>"], "weaknesses": ["<str>"]}`
      : `Generate 3 optimized ${platform} prompt answers for platform: "${platform}". ${context}. 

Return JSON array:
[
  {
    "question": "<common ${platform} prompt question>",
    "answer": "<answer>",
    "score": <0-100>,
    "tone": "${tone || "confident"}",
    "strengths": ["<strength>"],
    "weaknesses": []
  }
]`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: prompt }],
    });

    const raw =
      message.content[0].type === "text" ? message.content[0].text : "[]";
    const data = JSON.parse(raw);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Prompt generation error:", error);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
