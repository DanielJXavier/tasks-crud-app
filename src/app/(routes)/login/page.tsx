import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import LoginForm from "@/components/LoginForm";

import { validateEmail, validatePassword } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Login",
};

export default function Login() {
  const handleLogin = async (_: string, formData: FormData) => {
    "use server";

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      return "Preencha todos os campos";
    }

    if (!validateEmail(email)) {
      return "Email inválido";
    }

    if (!validatePassword(password)) {
      return "A senha precisa ter pelo menos 6 caracteres";
    }

    try {
      const body = { email, password };

      const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const login = await res.json();

      const { token } = login;

      if (token) {
        const cookieStore = await cookies();

        cookieStore.set("token", token, {
          secure: true,
          path: "/",
          maxAge: 60 * 60 * 24,
        });
      } else {
        return login.message;
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

      <LoginForm action={handleLogin} />

      <Link className="text-center underline" href="/register">
        Não tenho cadastro
      </Link>
    </>
  );
}
