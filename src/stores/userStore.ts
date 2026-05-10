import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  OnboardingData,
  ProfileAnalysis,
  ProfilePrompt,
  GeneratedPhoto,
  Platform,
  ChatMessage,
} from "@/types";

interface UserStore {
  // Onboarding
  onboardingData: Partial<OnboardingData> | null;
  onboardingStep: number;
  onboardingComplete: boolean;
  setOnboardingData: (data: Partial<OnboardingData>) => void;
  setOnboardingStep: (step: number) => void;
  completeOnboarding: () => void;

  // Analysis
  latestAnalysis: ProfileAnalysis | null;
  setAnalysis: (analysis: ProfileAnalysis) => void;

  // Builder
  activePlatform: Platform;
  prompts: ProfilePrompt[];
  setActivePlatform: (platform: Platform) => void;
  setPrompts: (prompts: ProfilePrompt[]) => void;
  updatePrompt: (id: string, answer: string) => void;

  // Photos
  generatedPhotos: GeneratedPhoto[];
  setGeneratedPhotos: (photos: GeneratedPhoto[]) => void;

  // Chat
  chatHistory: ChatMessage[];
  addChatMessage: (msg: ChatMessage) => void;
  clearChat: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      // Onboarding
      onboardingData: null,
      onboardingStep: 0,
      onboardingComplete: false,
      setOnboardingData: (data) =>
        set((state) => ({
          onboardingData: { ...state.onboardingData, ...data },
        })),
      setOnboardingStep: (step) => set({ onboardingStep: step }),
      completeOnboarding: () => set({ onboardingComplete: true }),

      // Analysis
      latestAnalysis: null,
      setAnalysis: (analysis) => set({ latestAnalysis: analysis }),

      // Builder
      activePlatform: "hinge",
      prompts: [],
      setActivePlatform: (platform) => set({ activePlatform: platform }),
      setPrompts: (prompts) => set({ prompts }),
      updatePrompt: (id, answer) =>
        set((state) => ({
          prompts: state.prompts.map((p) =>
            p.id === id ? { ...p, answer } : p
          ),
        })),

      // Photos
      generatedPhotos: [],
      setGeneratedPhotos: (photos) => set({ generatedPhotos: photos }),

      // Chat
      chatHistory: [],
      addChatMessage: (msg) =>
        set((state) => ({
          chatHistory: [...state.chatHistory, msg],
        })),
      clearChat: () => set({ chatHistory: [] }),
    }),
    {
      name: "profile-architect-store",
      partialize: (state) => ({
        onboardingData: state.onboardingData,
        onboardingStep: state.onboardingStep,
        onboardingComplete: state.onboardingComplete,
        latestAnalysis: state.latestAnalysis,
        activePlatform: state.activePlatform,
        prompts: state.prompts,
        generatedPhotos: state.generatedPhotos,
        chatHistory: state.chatHistory,
      }),
    }
  )
);
