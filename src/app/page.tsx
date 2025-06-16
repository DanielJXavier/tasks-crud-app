import Link from "next/link";

export default function Home() {
  return (
    <main className="grid px-4 gap-y-4">
      <h1 className="text-4xl">Bem vindo!</h1>

      <div>
        <p className="font-bold">Telas disponíveis:</p>

        <ul className="list-disc ml-6 underline">
          <li className="">
            <Link href="/register">Cadastro</Link>
          </li>

          <li className="">
            <Link href="/login">Login</Link>
          </li>

          <li className="">
            <Link href="/tasks">Tasks</Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
