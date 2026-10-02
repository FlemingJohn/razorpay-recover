export const assistantSettings = {
  name: "Razorpay agent",
  model: { provider: "openai", model: "gpt-4o-mini" },
  voice: { provider: "11labs", model: "eleven_flash_v2_5", voiceId: "sarah" },
  transcriber: { provider: "deepgram", model: "nova-2", language: "en" },
  serverMessages: ["status-update", "end-of-call-report"],
  analysisPlan: {
    summaryPlan: { enabled: false },
    successEvaluationPlan: { enabled: false },
  },
};
