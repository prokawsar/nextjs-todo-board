## Todo Board

## Demo

You can view a fully working demo at [https://nextjs-todo-board.vercel.app/](https://nextjs-todo-board.vercel.app/).

Demo credentials

email: kawsariam@gmail.com

password: 123456

## Clone and run locally

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new).

   For using existing created database, secrets for `.env.local` are shared in the email.

3. Clone this repo command

   ```bash
   git clone https://github.com/prokawsar/nextjs-todo-board.git
   ```

4. Use `cd` to change into the app's directory and install dependencies

   ```bash
   cd nextjs-todo-board
   npm i
   ```

5. Rename `.env.local.example` to `.env.local` and update the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```


6. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   The app should now be running on [localhost:3000](http://localhost:3000/).

