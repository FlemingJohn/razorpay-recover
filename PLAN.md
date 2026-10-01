# Razorpay Recover

A voice agent that phones customers whose autopay failed and gets them to pay.
Two fictional customers. Every call goes to one verified demo number.

## Stack

- Next.js with TypeScript, deployed on Vercel
- Vapi for calls, with ElevenLabs Flash v2.5 as the voice
- Twilio number imported into Vapi for outbound calls
- Razorpay Payment Links in test mode
- A small database for call results

## Flow

1. The dashboard starts a call for a customer.
2. Vapi rings the demo number and the agent follows the prompt files.
3. The agent uses `send_payment_link` or `log_outcome` through the webhook.
4. After the call Vapi sends the end of call report with the structured result.
5. The dashboard shows the outcome, the cancel reason and whether they will continue.

## Folders

- `src/prompts` one file per prompt section and per tool description
- `src/schemas` the structured result the call must return
- `src/customers` the fictional customer records
- `src/calls` starting calls and reading the webhook
- `src/payments` creating Razorpay payment links
- `src/lib` logic with no screen attached

## Rules the server enforces

- The amount comes from the customer record, never from the model.
- The payment link is sent only after the customer agrees.
- Customers who have paid or opted out are skipped.
- Calls go only to the verified demo number.

## Open items

- Phone number country and the Twilio setup
- Whether the agent offers a pause or discount to someone who wants to cancel
- Which database to use on Vercel
