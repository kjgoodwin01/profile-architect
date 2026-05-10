import { NextRequest, NextResponse } from "next/server";

const PHOTO_PROMPTS: Record<string, string> = {
  coffee_shop_candid:
    "candid photo of a confident man in a cozy coffee shop, natural lighting, warm tones, genuine smile, casual well-fitted clothes, lifestyle photography, authentic, not posed",
  rooftop_night:
    "stylish man on a rooftop at night, city lights behind, relaxed confident posture, smart casual outfit, natural candid feel, urban lifestyle",
  outdoors_hiking:
    "man hiking outdoors, natural landscape, genuine expression, athletic but not posed, authentic adventure photography, golden hour",
  clean_apartment:
    "man relaxing in a clean modern apartment, lifestyle photography, natural light, well-designed space, casual confident, not posed",
  candid_laugh:
    "man laughing candidly, genuine joy, natural expression, social setting, warm lighting, authentic not staged",
  masculine_portrait:
    "confident masculine portrait of a man, direct eye contact, clean background, natural lighting, not overly posed, authentic",
};

const PHOTO_SCORES: Record<string, { score: number; reason: string; slot: string }> = {
  coffee_shop_candid: { score: 84, reason: "Warm + approachable. Intellectual signaling. Strong opener.", slot: "Photo #1 — highest-performing first impression type" },
  rooftop_night: { score: 78, reason: "Urban lifestyle, social proof, relaxed confidence.", slot: "Photo #2 — good trust-building follow-up" },
  outdoors_hiking: { score: 71, reason: "Active lifestyle, health signaling, non-try-hard.", slot: "Photo #3-4 — lifestyle anchor" },
  clean_apartment: { score: 68, reason: "Self-sufficiency, taste, security signaling.", slot: "Photo #4-5 — status without bragging" },
  candid_laugh: { score: 80, reason: "Emotional warmth, social calibration, authenticity.", slot: "Photo #2-3 — trust builder" },
  masculine_portrait: { score: 76, reason: "Direct confidence, eye contact, unambiguous intent.", slot: "Photo #1-2 — high initial attraction" },
};

export async function POST(request: NextRequest) {
  try {
    const { style } = await request.json();
    const token = process.env.REPLICATE_API_TOKEN;

    if (!token) {
      // Return mock data if no token
      const meta = PHOTO_SCORES[style] || PHOTO_SCORES.coffee_shop_candid;
      return NextResponse.json({
        id: crypto.randomUUID(),
        url: null,
        category: style,
        predicted_score: meta.score,
        psychological_reason: meta.reason,
        slot_recommendation: meta.slot,
        mock: true,
      });
    }

    const promptText = PHOTO_PROMPTS[style] || PHOTO_PROMPTS.coffee_shop_candid;

    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
        input: {
          prompt: promptText,
          negative_prompt: "fake luxury, private jet, expensive watch, uncanny, plastic, AI-looking, overexposed, bad anatomy",
          num_inference_steps: 30,
          guidance_scale: 7.5,
        },
      }),
    });

    const prediction = await response.json();
    const meta = PHOTO_SCORES[style] || PHOTO_SCORES.coffee_shop_candid;

    return NextResponse.json({
      id: prediction.id,
      url: prediction.urls?.get || null,
      category: style,
      predicted_score: meta.score,
      psychological_reason: meta.reason,
      slot_recommendation: meta.slot,
      prediction_id: prediction.id,
    });
  } catch (error) {
    console.error("Photo generation error:", error);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
