"use server";

import { fetchWithToken } from "@/lib/fetchWithToken";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const handleCreateTask = async (_: string, formData: FormData) => {
  const task = formData.get("task");

  if (!task) {
    return "Você precisa informar o título da Task";
  }

  try {
    const body = { title: task };

    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return "Token não encontrado";
    } else {
      const { message } = await fetchWithToken(
        `${process.env.BACKEND_URL}/tasks`,
        token,
        {
          method: "POST",
          body: JSON.stringify(body),
        }
      );

      revalidateTag("get-tasks");

      return message;
    }
  } catch {
    console.error("handleCreateTask failed");

    return "Erro ao criar Task";
  }
};

export const handleDeleteTask = async (formData: FormData) => {
  const id = formData.get("id");

  if (!id) {
    return "Você precisa informar o id da Task";
  }

  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return "Token não encontrado";
    } else {
      const { message } = await fetchWithToken(
        `${process.env.BACKEND_URL}/tasks/${id}`,
        token,
        {
          method: "DELETE",
        }
      );

      revalidateTag("get-tasks");

      return message;
    }
  } catch {
    console.error("handleDeleteTask failed");

    return "Erro ao excluir Task";
  }
};

export const handleCompleteTask = async (formData: FormData) => {
  const id = formData.get("id");

  if (!id) {
    return "Você precisa informar o id da Task";
  }

  const completed = formData.get("completed");

  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return "Token não encontrado";
    } else {
      const endpoint = completed !== null ? "complete" : "uncomplete";

      const { message } = await fetchWithToken(
        `${process.env.BACKEND_URL}/tasks/${id}/${endpoint}`,
        token,
        {
          method: "PUT",
        }
      );

      revalidateTag("get-tasks");

      return message;
    }
  } catch {
    console.error("handleCompleteTask failed");

    return "Erro ao excluir Task";
  }
};
