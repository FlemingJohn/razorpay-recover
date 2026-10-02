# Prompt guidelines

How the agent's prompt is built and how to change it safely.

## Structure

The system prompt is assembled from files in `src/prompts`, in this order:

| Order | Section | File | Job |
|---|---|---|---|
| 1 | Identity | identity.md | Who the agent is and its tone |
| 2 | Response guidelines | responseGuidelines.md | How short and plain each reply is |
| 3 | Guardrails | guardrails.md | Hard rules that beat everything else |
| 4 | Context | context.md | The customer's details for this call |
| 5 | Workflow | workflow.md | The steps of the call |
| 6 | Error handling | errorHandling.md | What to do when the call goes off script |
| 7 | Examples | examples.md | Sample conversations |

The order is set in `src/lib/promptSections.ts`. Each file becomes a heading plus its text. Placeholders such as `{{name}}` are filled from the customer record.

The two tool files, `toolSendPaymentLink.md` and `toolLogOutcome.md`, are not part of the system prompt. They are the descriptions given to Vapi for each tool.

## Rules for writing prompt text

1. **One job per file.** If a file does two things, split it.
2. **Short.** Every extra word adds silence on the phone. Cut anything the agent can work out alone.
3. **One idea per line.** Plain sentences, not paragraphs.
4. **Say what to do.** Write "Ask once for the reason", not "Try to understand the reason".
5. **Use the real tool names.** `send_payment_link` and `log_outcome` must match the names given to Vapi.
6. **No numbers or amounts typed into the text.** They come from `{{amount}}` and the customer record.
7. **Safety rules go only in guardrails.md.** Do not repeat them elsewhere, so there is one place to check.
8. **Every path ends.** Each branch of the workflow finishes with a tool call or an end of call.

## Changing a prompt

1. Edit the one file that owns the topic.
2. Add a placeholder only if the value exists in `src/lib/getPromptValues.ts`.
3. Add a new example to `examples.md` when you add a new branch to the workflow.
4. Place a test call to the demo number and listen for the changed behaviour.
5. Check the saved call result still matches `src/schemas/callOutcomeSchema.json`.

## Checklist before a prompt change is done

- The agent never asks for card details, OTP, PIN or password.
- Wrong person, voicemail and opt out all end the call without revealing the amount.
- Every outcome in the schema can be reached from the workflow.
- The agent admits it is an AI if asked.
- Replies stay at two short sentences.
