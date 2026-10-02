# Razorpay Recover

A voice agent that phones customers whose autopay failed and gets them to pay.
Ten customer records: two with the owner's details and eight dummies with numbers that cannot ring anyone. Every call goes to the phone number saved on the record.

## Stack

- Next.js with TypeScript, deployed on Vercel
- Vapi for calls and browser calls, with ElevenLabs Flash v2.5 as the voice
- Twilio number imported into Vapi for outbound calls
- Razorpay Payment Links in test mode
- Supabase for customers, call results and settings

## Flow

1. The dashboard starts a call for a customer.
2. Vapi rings the customer's saved number and the agent follows the prompt files.
3. The agent uses `send_payment_link` or `log_outcome` through the webhook.
4. After the call Vapi sends the end of call report with the structured result.
5. The dashboard shows the outcome, the cancel reason and whether they will continue.

## Folders

- `src/prompts` one file per prompt section and per tool description
- `src/schemas` the structured result the call must return
- `src/customers` reading, adding and checking customers
- `src/calls` starting and ending calls, and reading the webhook
- `src/payments` creating Razorpay payment links
- `src/settings` the saved settings and their checks
- `src/components` the pieces of each screen
- `src/lib` logic with no screen attached

## Rules the server enforces

- The amount comes from the customer record, never from the model.
- The payment link is sent only after the customer agrees.
- Customers who have paid or opted out are skipped.
- Calls go only to the number saved on the customer record, which is the owner's own.

## Open items

- Whether the agent offers a pause or discount to someone who wants to cancel
- A login for the dashboard
- A live Razorpay notification when a payment link is paid
- A notice at the start of the call that it may be recorded
- Voicemail detection
