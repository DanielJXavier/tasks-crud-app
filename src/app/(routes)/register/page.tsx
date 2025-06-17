import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import RegisterForm from "@/components/RegisterForm";

import { validateEmail, validatePassword } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Cadastro",
};

export default function Register() {
  const handleRegister = async (_: string, formData: FormData) => {
    "use server";

    const username = formData.get("username")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!username || !email || !password) {
      return "Preencha todos os campos";
    }

    if (!validateEmail(email)) {
      return "Email inválido";
    }

    if (!validatePassword(password)) {
      return "A senha precisa ter pelo menos 6 caracteres";
    }

    try {
      const body = { username, email, password };

      const res = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { token, message } = await res.json();

      if (token) {
        const cookieStore = await cookies();

        cookieStore.set("token", token, {
          secure: true,
          path: "/",
          maxAge: 60 * 60 * 24,
        });
      } else {
        return message;
      }
    } catch {
      console.error("handleRegister failed");

      return "Erro no Cadastro";
    }

    redirect("/tasks");
  };

  return (
    <>
      <h1 className="text-4xl text-center font-bold">Cadastro</h1>

      <RegisterForm action={handleRegister} />

      <Link className="text-center underline" href="/login">
        Já tenho cadastro
      </Link>
    </>
  );
}
