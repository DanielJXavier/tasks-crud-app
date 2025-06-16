"use client";

import { useActionState, useState } from "react";

import { FormButton } from "./FormButton";
import { FormError } from "./FormError";
import { FormInput } from "./FormInput";

type LoginFormProps = {
  action: (_: string, formData: FormData) => Promise<string>;
};

export default function LoginForm({ action }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, formAction, pending] = useActionState(action, "");

  return (
    <>
      {!pending && <FormError message={errorMessage} />}

      <form className="grid gap-y-6" action={formAction}>
        <div className="grid gap-y-3">
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

        <FormButton>Login</FormButton>
      </form>
    </>
  );
}
