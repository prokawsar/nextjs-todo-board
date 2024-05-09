import { GeistSans } from "geist/font/sans";
import "./globals.css";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Todo board | Nextjs, Supabase",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-7xl flex justify-between items-center p-3">
              <a href="/">
                <h1 className="text-2xl font-bold text-slate-600">Todo</h1>
              </a>
              {<AuthButton />}
            </div>
          </nav>
          {children}
          <footer className="w-full p-6 flex flex-col justify-center text-center text-xs">
            <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-6" />
            <p>
              Powered by{" "}
              <a
                href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                target="_blank"
                className="font-bold hover:underline"
                rel="noreferrer"
              >
                Supabase
              </a>
            </p>
          </footer>
        </main>
      </body>
    </html>
  );
}
