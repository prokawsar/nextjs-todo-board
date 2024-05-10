export default function Footer() {
  return (
    <footer className="w-full pb-6 flex flex-col justify-center text-center text-xs">
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
  );
}
