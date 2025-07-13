deploy backend on vercel

now go to clerk ->configure-> Webhooks  -> add endpoint -> enter "vercel backend url"/clerk -> subscribe user events  -> create  -> get signing secret  -> put it in .env CLERK_WEBHOOK_SECRET

and also put CLERK_PUBLISHABLE_KEY,
CLERK_SECRET_KEY
in .env file

update .env on vercel also inside settings