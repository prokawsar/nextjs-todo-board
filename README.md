## Todo Board

## Demo

You can view a fully working demo at [https://nextjs-todo-board.vercel.app/](https://nextjs-todo-board.vercel.app/).

Demo credentials
email: kawsariam@gmail.com
pass: 123456

## Clone and run locally

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)
   For using existing created database, secrets for `.env.local` are shared.

2. Clone this repo command

   ```bash
   git clone https://github.com/prokawsar/nextjs-todo-board.git
   ```

3. Use `cd` to change into the app's directory and install dependencies

   ```bash
   cd nextjs-todo-board
   npm i
   ```

4. Rename `.env.local.example` to `.env.local` and update the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```

   Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

5. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   The app should now be running on [localhost:3000](http://localhost:3000/).

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.
