// Core
import Link from "next/link";

// Components
import { Button } from "@/components/shadcn";

export default function Home() {
  return (
    <section className="mx-48 flex flex-grow items-center justify-center">
      <Link href="/overview">
        <Button variant="secondary" className="px-32 py-16">
          Start
        </Button>
      </Link>
    </section>
  );
}
