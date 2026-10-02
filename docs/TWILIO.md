# Twilio setup

Twilio gives the agent a phone number to call from. Vapi places the call, but it needs a number from a provider like Twilio to do it. Vapi's own free numbers can only receive calls.

You only need this for phone calls. Browser calls ("Talk in browser") work without Twilio.

## What you end up with

| Item | Where it is used |
|---|---|
| A Twilio phone number | The caller ID the customer sees |
| Account SID and Auth Token | Importing the number into Vapi, and the End call button |
| `VAPI_PHONE_NUMBER_ID` | `.env`, so the app knows which Vapi number to call from |

## Steps

### 1. Create a Twilio account
Sign up at twilio.com. You confirm the phone number you sign up with, and Twilio marks it as verified automatically. A trial account can only call verified numbers, and its voice calls are limited to the country you signed up in.

### 2. Get a phone number
In the console, open Phone Numbers, then Buy a number, and pick one with Voice capability. A US number costs about $1.15 a month (price as read on Twilio's pricing page, check it again before you rely on it).

### 3. Find your Account SID and Auth Token
Open the Twilio console and go to the **API keys & tokens** page. The Account SID starts with `AC`. The Auth Token is under Auth Tokens or Live credentials. Click View to reveal it, and you may be asked for a code.

If only a Secondary Auth Token is offered, create it and use that value.

An API key (an `SK...` SID and a secret) is not enough for the Vapi import. Vapi needs the Auth Token.

### 4. Verify every number you want to call (trial accounts)
Open Phone Numbers, then Manage, then Verified Caller IDs, then Add a new Caller ID. Enter the number, choose Text or Call, and enter the code. A trial account allows your sign-up number plus 5 more.

You must do this in the console. Twilio's API refuses it on trial accounts with the message "Placing verification calls is not supported on trial accounts."

### 5. Allow calls to the country
Under Voice, then Settings, then Geo permissions, make sure the country you are calling is enabled. For calls to India, enable India.

### 6. Import the number into Vapi
In the Vapi dashboard, open Phone Numbers, then Import, then Twilio. Enter the number in international form, the Account SID and the Auth Token.

Or with the API:

```
curl -X POST https://api.vapi.ai/phone-number \
  -H "Authorization: Bearer YOUR_VAPI_PRIVATE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"provider":"twilio","number":"+1XXXXXXXXXX","twilioAccountSid":"AC...","twilioAuthToken":"..."}'
```

The reply contains an `id`. That is the phone number ID.

### 7. Tell the app
Put these in `.env`:

```
VAPI_PHONE_NUMBER_ID=the id from step 6
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
```

The Twilio values are only used by the End call button, which cancels a ringing call. Phone calls themselves only need `VAPI_PHONE_NUMBER_ID`. Add the same three values to your Vercel settings if the deployed app should place and end phone calls.

### 8. Test
Open the Customers page and click Call now on a customer whose number is verified. Then open the Calls page to see the result, the transcript and the recording.

## Cost
Prices read from Twilio's pages while building this project:

| Item | Price |
|---|---|
| US local number | $1.15 a month |
| Call to a US number | $0.014 a minute |
| Call to an Indian mobile | $0.0496 a minute |

Twilio's trial includes free voice minutes, and the trial lasts 30 days. Vapi, speech recognition, the AI model and the voice are charged separately. The Calls page shows what each call cost in total.

## Trial account limits
- Only verified numbers can be called.
- Voice calls are limited to the country you signed up in.
- The person may hear a short trial message when they answer, before the agent speaks.
- Upgrading the account removes these limits.

## Problems we hit

| What you see | Cause | Fix |
|---|---|---|
| The call fails at once with `call.start.error-get-transport` and Twilio shows no call | The number is not verified on a trial account | Verify it in the console (step 4) |
| Vapi says "auth token is not valid for account" | An API key secret was used instead of the Auth Token | Use the Auth Token from step 3 |
| Twilio status `no-answer` with 0 seconds, and the phone shows a missed call | The phone rang but nobody answered, often a signal or carrier problem | Try again with good signal, and check call blockers |
| Twilio says verification calls are not supported | The API route is blocked on trial accounts | Verify in the console instead |
| No ring at all on an Indian number | A carrier may filter calls from foreign numbers | Try another number or carrier, or upgrade and test again |

Twilio's call log (Monitor, then Logs, then Calls in the console) shows each call with its status. It is the quickest way to tell whether a problem is on the Twilio side or the Vapi side.

## Keeping the credentials safe
- Never commit `.env`. It is already ignored by git.
- Never paste the Auth Token into chat, tickets or screenshots.
- If a token is exposed, rotate it in the console and update `.env`, Vapi and Vercel.
