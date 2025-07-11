import { Metadata } from "next";
import { cookies } from "next/headers";

import { FormTasks } from "@/components/forms/FormTasks";
import { TaskCard } from "@/components/TaskCard";

import { fetchWithToken } from "@/lib/fetchWithToken";

import {
  handleCompleteTask,
  handleCreateTask,
  handleDeleteTask,
} from "./actions";

const PAGE_TITLE = "Tasks";

export const metadata: Metadata = {
  title: PAGE_TITLE,
};

type TaskType = {
  _id: string;
  userId: string;
  title: string;
  completed: boolean;
  deleted: boolean;
  createDate: string;
  modifyDate: string;
};

export default async function Tasks() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  const { tasks }: { tasks: TaskType[] } = await fetchWithToken(
    `${process.env.BACKEND_URL}/tasks`,
    token,
    {
      next: {
        tags: ["get-tasks"],
      },
    }
  );

  return (
    <>
      <h1 className="text-4xl text-center font-bold">Tasks</h1>

      <FormTasks action={handleCreateTask} />

      <ul className="grid gap-y-3">
        {tasks
          .reverse()
          .sort((a, b) => (!a.completed && b.completed ? -1 : 1))
          .map((task) => (
            <TaskCard
              key={task._id}
              id={task._id}
              completed={task.completed}
              completeAction={handleCompleteTask}
              deleteAction={handleDeleteTask}
            >
              {task.title}
            </TaskCard>
          ))}
      </ul>
    </>
  );
}
