export default function Footer() {
  return (
    <footer className="flex w-full flex-col justify-center pb-6 text-center text-xs">
      <div className="my-6 w-full bg-gradient-to-r from-transparent via-slate-600/10 to-transparent p-[1px]" />
      <p>
        Powered by{' '}
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
  )
}
