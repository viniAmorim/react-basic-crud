import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
}

// Adiciona o token de autenticação em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Função para buscar os usuários com filtros opcionais
export const fetchUsers = async (
  filters: {
    name?: string;
    email?: string;
    phone?: string;
    isAdmin?: string;
  } = {}
) => {
  const params = new URLSearchParams();

  if (filters.name) params.append("name", filters.name);
  if (filters.email) params.append("email", filters.email);
  if (filters.phone) params.append("phone", filters.phone);
  if (filters.isAdmin !== "") params.append("isAdmin", filters.isAdmin); // "true" ou "false"

  const response = await api.get(`/users?${params.toString()}`);
  return response.data;
};

// Função para deletar um usuário
export const deleteUser = async (id: string) => {
  await api.delete(`/users/${id}`);
};

// Função para criar um novo usuário
export const createUser = async (user: User) => {
  await api.post("/users", user);
};

// Função para atualizar um usuário existente
export const updateUser = async (user: User) => {
  await api.put(`/users/${user.id}`, user);
};

// Buscar usuário por ID
export const findUserById = async (id: string) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export default api;
