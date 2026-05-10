import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are Profile Architect, an expert dating app coach for men. You give sharp, direct, psychologically-grounded advice on profiles, photos, bios, messaging strategy, and positioning.

Tone: confident, knowledgeable, direct, no fluff. Like a sharp friend who knows this stuff deeply.

Rules:
- Max 3-5 sentences per response unless asked to write something longer
- Be actionable — give specific things to change or do
- No pickup artist nonsense, no manipulation tactics
- Don't be preachy or moralistic
- If they share something to rewrite, rewrite it
- If they ask for openers, write 3 options with different energy levels`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    const stream = await client.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 600,
      system: SYSTEM_PROMPT,
      messages,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          if (
            chunk.type === "content_block_delta" &&
            chunk.delta.type === "text_delta"
          ) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`)
            );
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return new NextResponse(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json({ error: "Chat failed" }, { status: 500 });
  }
}
