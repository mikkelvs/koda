import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen flex-col gap-8">
      <Link
        href="/step1"
        className="text-2xl w-64 p-4 bg-gray-800 text-white text-center rounded-lg"
      >
        Start registrering
      </Link>
    </main>
  );
}
