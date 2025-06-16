"use client";

import { useActionState, useState } from "react";

import { FormButton } from "./FormButton";
import { FormError } from "./FormError";
import { FormInput } from "./FormInput";

type RegisterFormProps = {
  action: (_: string, formData: FormData) => Promise<string>;
};

export default function RegisterForm({ action }: RegisterFormProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, formAction, pending] = useActionState(action, "");

  return (
    <>
      {!pending && <FormError message={errorMessage} />}

      <form className="grid gap-y-6" action={formAction}>
        <div className="grid gap-y-3">
          <FormInput
            id="username"
            label="Usuário"
            value={username}
            setValue={setUsername}
            error={!!errorMessage && !username}
          />

          <FormInput
            id="email"
            label="Email"
            value={email}
            setValue={setEmail}
            error={!!errorMessage && !email}
          />

          <FormInput
            id="password"
            label="Senha"
            value={password}
            setValue={setPassword}
            error={!!errorMessage && !password}
            type="password"
          />
        </div>

        <FormButton>Cadastrar</FormButton>
      </form>
    </>
  );
}
