import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export function useLogout() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      // Se sua API tiver uma rota de logout, você pode chamá-la aqui
      // await api.post("/logout", {}); ← opcional
      return;
    },
    onSuccess: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");

      navigate("/login");
    },
  });
}
