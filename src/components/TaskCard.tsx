"use client";

import { FC, PropsWithChildren } from "react";

import classNames from "classnames";

interface TaskCardProps extends PropsWithChildren {
  id: string;
  completed: boolean;
  completeAction: (formData: FormData) => Promise<void>;
  deleteAction: (formData: FormData) => Promise<void>;
}

export const TaskCard: FC<TaskCardProps> = ({
  id,
  completed,
  completeAction,
  deleteAction,
  children,
}) => (
  <li
    className={classNames(
      "p-4 grid grid-cols-[auto_1fr_auto] gap-x-2 text-[#7b7c7b] border border-[#e8e9e9] rounded-lg",
      {
        "opacity-50": completed,
        "hover:border-[#b1b2b2]": !completed,
      }
    )}
  >
    <form className="flex" action={completeAction}>
      <input name="id" type="hidden" value={id} />

      <input
        className="accent-[#141516]"
        name="completed"
        type="checkbox"
        defaultChecked={completed}
        onChange={(e) => !completed && e.target.form?.requestSubmit()}
        disabled={completed}
      />
    </form>

    <p
      className={classNames("cursor-default", {
        "line-through": completed,
      })}
    >
      {children}
    </p>

    {!completed && (
      <form action={deleteAction}>
        <input name="id" type="hidden" value={id} />

        <button className="cursor-pointer hover:[&_svg_path]:stroke-red-500">
          <svg
            className="size-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14"
          >
            <path
              className="stroke-red-700"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            ></path>
          </svg>
        </button>
      </form>
    )}
  </li>
);
