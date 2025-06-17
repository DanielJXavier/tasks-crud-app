"use client";

import { FC, useActionState, useEffect, useState } from "react";

import classNames from "classnames";

import { FormError } from "../FormError";

type FormTasksProps = {
  action: (_: string, formData: FormData) => Promise<string>;
};

export const FormTasks: FC<FormTasksProps> = ({ action }) => {
  const [task, setTask] = useState("");

  const [errorMessage, formAction, isPending] = useActionState(action, "");

  useEffect(() => {
    if (!isPending && !errorMessage) {
      setTask("");
    }
  }, [isPending, errorMessage]);

  return (
    <>
      {!isPending && <FormError message={errorMessage} />}

      <form className="relative shadow-lg rounded-lg" action={formAction}>
        <input
          className={classNames(
            "w-full pl-2 pr-10 py-1 text-[#7b7c7b] border border-[#e8e9e9] outline-none rounded-lg",
            {
              "border-red-400 placeholder:text-red-200": errorMessage && !task,
              "hover:border-[#b1b2b2] focus:border-[#b1b2b2]": !errorMessage,
            }
          )}
          name="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Informe o título da task"
        />

        <button
          className="absolute top-0 right-0 bottom-0 px-3 bg-[#141516] text-white rounded-r-lg cursor-pointer"
          disabled={isPending}
        >
          +
        </button>
      </form>
    </>
  );
};
