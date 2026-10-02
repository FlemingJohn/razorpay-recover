# Local setup

How to run Razorpay Recover on your own computer, from a fresh copy of the code to your first test call.

## What you need

| Item | Why |
|---|---|
| Node.js 20 or newer | Runs the app |
| A Vapi account | Places the calls. You need the private key and the public key |
| A Razorpay account with test keys | Creates the payment links. Test mode moves no real money |
| A Supabase project | Stores customers, calls and settings |
| A phone number imported into Vapi | Only for phone calls. See [TWILIO.md](TWILIO.md). Browser calls need none |
| Your own mobile number | The number the test customers ring. Use only a number you control or have explicit permission to call |

## Steps

### 1. Get the code and install
```
git clone <your repository address>
cd razorpay-recover
npm install
```

### 2. Create the database tables
Open your Supabase project, then the SQL editor, then run both files in `supabase/migrations`, in this order:

1. `20261002000000_create_tables.sql` creates the `customers` and `calls` tables and adds 10 customers: two with the owner's details and eight dummies with numbers that cannot ring anyone.
2. `20261002010000_create_settings.sql` creates the settings table.

Before you run the first file, change the phone number and email in the two owner rows to your own. The phone number must be in international form, for example `+917604831363`.

Until the second file runs, the Settings page shows the defaults and cannot save.

### 3. Create your settings file
On Windows:
```
copy .env.example .env
```
On Mac or Linux:
```
cp .env.example .env
```

### 4. Fill in `.env`

| Setting | Where to find it |
|---|---|
| `VAPI_API_KEY` | Vapi dashboard, API keys, the private key |
| `NEXT_PUBLIC_VAPI_PUBLIC_KEY` | Vapi dashboard, API keys, the public key. It is safe to expose |
| `VAPI_PHONE_NUMBER_ID` | Vapi dashboard, Phone Numbers, the ID of the imported number. Not needed for browser calls |
| `VAPI_WEBHOOK_SECRET` | Any long random text you choose. The app checks it on every message from Vapi |
| `RAZORPAY_KEY_ID` | Razorpay Dashboard, Settings, API Keys, Generate Test Key. Starts with `rzp_test_` |
| `RAZORPAY_KEY_SECRET` | Shown once with the key ID |
| `SUPABASE_URL` | Supabase project settings, API, the project URL |
| `SUPABASE_SECRET_KEY` | Supabase project settings, API keys, the secret key. Starts with `sb_secret_`. Server only |
| `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN` | Twilio console. Only used by the End call button on phone calls |
| `PUBLIC_BASE_URL` | The public address Vapi can reach, see step 6 |

To make a random webhook secret:
```
node -e "console.log(require('crypto').randomBytes(24).toString('hex'))"
```

Never commit `.env`. It is already in `.gitignore`. After you change `.env`, restart the app.

### 5. Start the app
```
npm run dev
```
Open http://localhost:3000. You should see the Overview page, and the Customers page should list 10 customers.

### 6. Let Vapi reach the app
During a call, Vapi sends messages back to the app, such as "send the payment link" and "the call ended". It can only do that if the app has a public address. `localhost` is only visible on your own computer.

Use one of these:

- **The deployed site.** If the app is on Vercel, set `PUBLIC_BASE_URL` to its address, for example `https://your-project.vercel.app`. No tunnel is needed, and the local app and the live site can share the same database.
- **A tunnel.** Start a tool such as ngrok in a second terminal and copy the address it prints into `PUBLIC_BASE_URL`.
  ```
  ngrok http 3000
  ```
  The address changes each time ngrok restarts, so update `.env` and restart the app when it does.

Without a public address, the call still happens and the agent talks, but the payment link is never created and the outcome is never saved.

### 7. Try a call
1. Open **Customers**.
2. Press **Talk in browser** on a customer and allow the microphone. Or press **Call now** to ring the number saved on the customer. That needs a verified number, see [TWILIO.md](TWILIO.md).
3. Answer as the customer. Say "yes, send me the link", and a Razorpay test link is created.
4. Open **Calls** to see the summary, the transcript, the recording, and what the call cost.

Then try the other paths: ask for more time, say you want to cancel, say the charge is wrong, or ask it to stop calling.

To test your own customer, open **Test customers**, pick a case, fill in the name, phone and email, tick the permission box, and save.

## Check that it works
```
npx tsc --noEmit
```
This type-checks the code and should print nothing. Then:

| Check | What you should see |
|---|---|
| http://localhost:3000/api/customers | A list of 10 customers |
| http://localhost:3000/api/settings | The settings, with the defaults until you save |
| The Customers page | 10 rows, each with a Call now and a Talk in browser button |

## Problems and fixes

| What you see | Cause | Fix |
|---|---|---|
| "Could not load this page" | The app cannot reach Supabase | Check `SUPABASE_URL` and `SUPABASE_SECRET_KEY`, then restart |
| "Missing setting SOMETHING" | A value is empty in `.env` | Fill it in and restart the app |
| "Settings could not be saved" | The settings table does not exist | Run the second SQL file |
| The call connects but no payment link and no saved outcome | `PUBLIC_BASE_URL` is not a public address | See step 6 |
| `call.start.error-get-transport` on a phone call | The number is not verified in Twilio | Verify it, see [TWILIO.md](TWILIO.md) |
| The browser asks for the microphone and nothing happens | The microphone is blocked for the page | Allow it in the browser's site settings |
| A customer's buttons are greyed out | They are on a call, have paid, or asked to stop | Wait, or check their status on the Customers page |
| Settings changes do not seem to apply | They apply to new calls only | Start a new call |

## Where to go next
- [TWILIO.md](TWILIO.md) sets up phone calls.
- [PLAN.md](PLAN.md) holds the plan and the open items.
- [PROMPTS.md](PROMPTS.md) explains how the agent's prompt is built and changed.
