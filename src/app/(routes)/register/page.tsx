import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { FormRegister } from "@/components/forms/FormRegister";

import { COOKIE } from "@/contants/constants";

import { checkInvalidEmail, checkInvalidPassword } from "@/lib/utils";

const PAGE_TITLE = "Cadastro";

export const metadata: Metadata = {
  title: PAGE_TITLE,
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

    if (checkInvalidEmail(email)) {
      return "Email inválido";
    }

    if (checkInvalidPassword(password)) {
      return "A senha precisa ter pelo menos 6 caracteres";
    }

    try {
      const body = {
        username,
        email,
        password,
      };

      const res = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
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
      console.error("handleRegister failed");

      return "Erro no Cadastro";
    }

    redirect("/tasks");
  };

  return (
    <>
      <h1 className="text-4xl text-center font-bold">{PAGE_TITLE}</h1>

      <FormRegister action={handleRegister} />

      <Link className="text-center underline" href="/login">
        Já tenho cadastro
      </Link>
    </>
  );
}
