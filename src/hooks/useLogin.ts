import { useMutation } from "@tanstack/react-query";
import api from "../services/api";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  refresh_token: string;
  user: {
    name: string;
    email: string;
  };
}

export function useLogin() {
  return useMutation({
    mutationFn: async (data: LoginRequest): Promise<LoginResponse> => {
      const response = await api.post("/sessions", data);
      return response.data;
    },
  });
}
