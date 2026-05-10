// ─── User Profile ────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string;
  email: string;
  created_at: string;
  onboarding_completed: boolean;
  data: OnboardingData | null;
}

export interface OnboardingData {
  age: string;
  city: string;
  height: string;
  career: string;
  education: string;
  income_range: string;
  lifestyle: string;
  hobbies: string[];
  fitness_level: string;
  personality_traits: string[];
  humor_style: string;
  relationship_goal: string;
  desired_partner_traits: string;
  style_aesthetic: string;
  masculine_archetype: string;
  communication_style: string;
  attachment_style: string;
  social_habits: string;
  drinking: string;
  smoking: string;
  travel_frequency: string;
  confidence_level: number;
  strongest_traits: string;
  weakest_traits: string;
}

// ─── Profile Analysis ────────────────────────────────────────────────────────

export interface ProfileScore {
  overall: number;
  attractiveness: number;
  trustworthiness: number;
  masculinity: number;
  conversation_potential: number;
  authenticity: number;
  status_signaling: number;
  differentiation: number;
}

export type FeedbackSeverity = "critical" | "warning" | "strong" | "info";

export interface FeedbackItem {
  severity: FeedbackSeverity;
  category: string;
  message: string;
  fix?: string;
}

export interface ProfileAnalysis {
  scores: ProfileScore;
  feedback: FeedbackItem[];
  archetype: string;
  estimated_match_quality: string;
  estimated_response_rate: string;
  demographic_appeal: string;
  top_improvement: string;
  created_at: string;
}

// ─── Photos ──────────────────────────────────────────────────────────────────

export type PhotoCategory =
  | "coffee_shop_candid"
  | "rooftop_night"
  | "upscale_casual_dinner"
  | "walking_downtown"
  | "gym_tasteful"
  | "beach_travel"
  | "dog_photo"
  | "social_group"
  | "candid_laugh"
  | "masculine_portrait"
  | "relaxed_confident"
  | "bookstore_cafe"
  | "outdoors_hiking"
  | "clean_apartment";

export interface PhotoSlot {
  id: string;
  url: string | null;
  rank: number;
  category?: PhotoCategory;
  score?: number;
  ai_generated: boolean;
  platform: Platform;
}

export interface GeneratedPhoto {
  id: string;
  url: string | null;
  category: PhotoCategory;
  predicted_score: number;
  psychological_reason: string;
  slot_recommendation: string;
  mock?: boolean;
}

// ─── Builder ─────────────────────────────────────────────────────────────────

export type Platform = "hinge" | "bumble" | "tinder";

export type PromptTone =
  | "confident"
  | "witty"
  | "dry_humor"
  | "sophisticated"
  | "playful"
  | "calm_intelligent"
  | "adventurous";

export interface ProfilePrompt {
  id: string;
  platform: Platform;
  question: string;
  answer: string;
  score: number;
  tone: PromptTone;
  strengths: string[];
  weaknesses: string[];
}

export interface Bio {
  platform: Platform;
  text: string;
  score: number;
  tone: PromptTone;
}

// ─── Conversation Engine ─────────────────────────────────────────────────────

export interface ConversationStarter {
  id: string;
  text: string;
  type: "opener" | "follow_up" | "re_engagement" | "date_escalation";
  confidence_level: "low_pressure" | "medium" | "direct";
  score: number;
}

// ─── Chat ────────────────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// ─── Success Engine ──────────────────────────────────────────────────────────

export interface SuccessMetrics {
  estimated_match_quality_score: number;
  estimated_response_rate_pct: number;
  estimated_compatibility_breadth: string;
  strongest_demographic: string;
  weakest_demographic: string;
  profile_fatigue_risk: "low" | "medium" | "high";
  swipe_stopping_power: number;
  conversation_start_probability: number;
}
