import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"; // Adicionado o useMutation para as requisições POST e DELETE
import {
  fetchUsers,
  deleteUser,
  updateUser,
  createUser,
} from "../../services/api"; // Funções de API

import {
  ActionButton,
  ButtonGroup,
  CancelButton,
  ConfirmButton,
  Container,
  ErrorText,
  Input,
  ModalContent,
  ModalOverlay,
  SaveButton,
  Table,
  Td,
  Th,
  Thead,
  Tr,
} from "./styles";
import Head from "../../components/Head/Head";

import toast from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isAdmin: boolean;
}

const schema = yup.object({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().email("Email inválido").required("Email obrigatório"),
  phone: yup.string().required("Telefone obrigatório"),
  isAdmin: yup.boolean().required("isAdmin obrigatório"),
});

export default function Dashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // Usado para atualizar o cache após uma operação

  const [editingUser, setEditingUser] = useState<User | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(schema),
  });

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const saveMutation = useMutation({
    mutationFn: (user: User) =>
      editingUser ? updateUser(user) : createUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleEdit = (user: User) => {
    setEditingUser(user);
    reset(user);
  };

  const handleDelete = (id: string) => {
    toast((t) => (
      <span>
        Deseja realmente excluir?
        <ButtonGroup>
          <ConfirmButton
            onClick={() => {
              deleteMutation.mutate(id);
              toast.dismiss(t.id);
              toast.success("Usuário excluído com sucesso.");
            }}
          >
            Confirmar
          </ConfirmButton>
          <CancelButton onClick={() => toast.dismiss(t.id)}>
            Cancelar
          </CancelButton>
        </ButtonGroup>
      </span>
    ));
  };

  const onSubmit = (data: User) => {
    saveMutation.mutate(data);
  };

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar usuários</p>;

  return (
    <Container>
      <Head
        onAddUser={() => {
          setEditingUser(null); // Reseta a edição
          reset({ name: "", email: "", phone: "", isAdmin: "" });
        }}
      />

      <Table>
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th>Telefone</Th>
            <Th>isAdmin</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <tbody>
          {users?.map((user) => (
            <Tr key={user.id}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.phone}</Td>
              <Td>{user.isAdmin ? "Sim" : "Não"}</Td>
              <Td>
                <ActionButton variant="edit" onClick={() => handleEdit(user)}>
                  Editar
                </ActionButton>
                <ActionButton
                  variant="delete"
                  onClick={() => handleDelete(user.id)}
                >
                  Excluir
                </ActionButton>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      {editingUser && (
        <ModalOverlay>
          <ModalContent>
            <h2>{editingUser ? "Editar Usuário" : "Adicionar Usuário"}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input placeholder="Nome" {...register("name")} />
              {errors.name && <ErrorText>{errors.name.message}</ErrorText>}

              <Input placeholder="Email" {...register("email")} />
              {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

              <Input placeholder="Telefone" {...register("phone")} />
              {errors.phone && <ErrorText>{errors.phone.message}</ErrorText>}

              <select {...register("isAdmin")}>
                <option value="">Selecione</option>
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
              {errors.isAdmin && (
                <ErrorText>{errors.isAdmin.message}</ErrorText>
              )}

              <div>
                <SaveButton type="submit" disabled={saveMutation.isLoading}>
                  {saveMutation.isLoading ? "Salvando..." : "Salvar"}
                </SaveButton>
                <CancelButton onClick={() => setEditingUser(null)}>
                  Cancelar
                </CancelButton>
              </div>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}
