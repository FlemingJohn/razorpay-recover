export const testCases = [
  { say: "Yes, send me the link", result: "A Razorpay link is sent and the outcome is paid now" },
  { say: "I need a few days", result: "A promise to pay date is saved" },
  { say: "I want to cancel", result: "The cancel reason is asked once and saved" },
  { say: "That charge is wrong", result: "Saved as a dispute for a person to follow up" },
  { say: "Stop calling me", result: "Saved as opted out, and the customer cannot be called again" },
  { say: "Do not answer", result: "Saved as no answer" },
];
