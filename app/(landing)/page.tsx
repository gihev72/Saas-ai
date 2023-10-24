import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <Link href="/sign-in">
        <Button>Sign In</Button>
      </Link>
      <Link href="/sign-up">
        <Button>Register</Button>
      </Link>
    </main>
  );
}
