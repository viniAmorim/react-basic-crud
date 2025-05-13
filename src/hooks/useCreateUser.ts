// hooks/useCreateUser.ts
import { useMutation } from "@tanstack/react-query";
import type { User } from "../types";
import { createUser } from "../services/api";

export function useCreateUser() {
  return useMutation({
    mutationFn: (user: User) => createUser(user),
  });
}
