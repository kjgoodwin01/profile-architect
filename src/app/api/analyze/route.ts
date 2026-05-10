import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import type { ProfileAnalysis } from "@/types";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are Profile Architect's AI analysis engine. You analyze men's dating app profiles using evolutionary psychology, social signaling theory, and online dating conversion research.

Analyze the provided profile and return a JSON object with exactly this structure:
{
  "scores": {
    "overall": <0-100>,
    "attractiveness": <0-100>,
    "trustworthiness": <0-100>,
    "masculinity": <0-100>,
    "conversation_potential": <0-100>,
    "authenticity": <0-100>,
    "status_signaling": <0-100>,
    "differentiation": <0-100>
  },
  "feedback": [
    {
      "severity": "critical" | "warning" | "strong" | "info",
      "category": "<category name>",
      "message": "<specific honest feedback>",
      "fix": "<actionable fix>"
    }
  ],
  "archetype": "<2-3 word archetype label>",
  "estimated_match_quality": "<description>",
  "estimated_response_rate": "<percentage range>",
  "demographic_appeal": "<description>",
  "top_improvement": "<single most impactful change>",
  "created_at": "<ISO date string>"
}

Rules:
- Be brutally honest. No fake positivity.
- Give 4-7 feedback items covering critical issues, warnings, and genuine strengths
- Scores should be calibrated to reality — most men score 40-65 overall
- Focus on psychology, positioning, differentiation, and conversion
- Return ONLY valid JSON, no markdown, no preamble`;

export async function POST(request: NextRequest) {
  try {
    const { profileText } = await request.json();

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Analyze this dating app profile:\n\n${profileText}`,
        },
      ],
    });

    const raw = message.content[0].type === "text" ? message.content[0].text : "";
    const analysis: ProfileAnalysis = JSON.parse(raw);
    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Analysis failed" },
      { status: 500 }
    );
  }
}
