import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <div className="p-6">
      <header className="bg-background-offset/50 flex items-center justify-between p-6 rounded-lg container mx-auto shadow-md shadow-primary">
        <div className="grid-cols-2 flex">
          <div className="grid-rows-1 mr-4">
              <Image 
                src="/chipsxp-logo-crop.jpg"
                alt="ChipsXP Logo"
                width={32}
                height={32}
                className="h-18 w-auto border-transparent rounded-3xl"
              />
            </div>
            <div className="grid-rows-2 max-w-48 ">
              <Link
                className="text-foreground md:text-xl font-bold tracking-tight max-w-48"
                href="/"
              >
                ChipsXP Research and Advancements
              </Link>
             </div> 
        </div>
        <ul className="flex items-center gap-4 font-semibold">
          <li>
            <Link
              className="hover:text-pink-500 transition-colors"
              href="/posts"
            >
              Posts
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-pink-500 transition-colors"
              href="/studio"
            >
              Sanity Studio
            </Link>
          </li>
        </ul>
      </header>
    </div>
  );
}
