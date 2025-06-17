import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { FormLogin } from "@/components/forms/FormLogin";

import { COOKIE } from "@/contants/constants";

import { checkInvalidEmail, checkInvalidPassword } from "@/lib/utils";

const PAGE_TITLE = "Login";

export const metadata: Metadata = {
  title: PAGE_TITLE,
};

export default function Login() {
  const handleLogin = async (_: string, formData: FormData) => {
    "use server";

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      return "Preencha todos os campos";
    }

    if (checkInvalidEmail(email)) {
      return "Email inválido";
    }

    if (checkInvalidPassword(password)) {
      return "A senha precisa ter pelo menos 6 caracteres";
    }

    try {
      const body = {
        email,
        password,
      };

      const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { token, message } = await res.json();

      if (!token) {
        return message;
      } else {
        const cookieStore = await cookies();

        cookieStore.set("token", token, COOKIE);
      }
    } catch {
      console.error("handleLogin failed");

      return "Erro no Login";
    }

    redirect("/tasks");
  };

  return (
    <>
      <h1 className="text-4xl text-center font-bold">Login</h1>

      <FormLogin action={handleLogin} />

      <Link className="text-center underline" href="/register">
        Não tenho cadastro
      </Link>
    </>
  );
}
