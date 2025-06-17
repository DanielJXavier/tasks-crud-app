"use client";

import { FC, useActionState, useState } from "react";

import { FormButton } from "../FormButton";
import { FormError } from "../FormError";
import { FormInput } from "../FormInput";

type FormLoginProps = {
  action: (_: string, formData: FormData) => Promise<string>;
};

export const FormLogin: FC<FormLoginProps> = ({ action }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, formAction, isPending] = useActionState(action, "");

  return (
    <>
      {!isPending && <FormError message={errorMessage} />}

      <form className="grid gap-y-6" action={formAction}>
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

        <FormButton>Login</FormButton>
      </form>
    </>
  );
};
