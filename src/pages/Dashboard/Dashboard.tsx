import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchUsers,
  deleteUser,
  updateUser,
  createUser,
  findUserById,
} from "../../services/api";

import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

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
import Head from "../../components/layout/Head/Head";

import toast from "react-hot-toast";
import type { User } from "../../types";
import UserModal from "../../components/layout/UserModal/UserModal";

const schema = yup.object({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().email("Email inválido").required("Email obrigatório"),
  phone: yup.string().required("Telefone obrigatório"),
  isAdmin: yup.boolean().required("isAdmin obrigatório"),
});

export default function Dashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);

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
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });

      toast.success(
        editingUser
          ? "Usuário editado com sucesso."
          : "Usuário criado com sucesso."
      );

      setEditingUser(null);
      reset();
    },
  });

  const handleEdit = (user: User) => {
    setEditingUser(user);
    reset(user);
  };

  const handleView = async (user: User) => {
    try {
      const freshUser = await findUserById(user.id);
      setViewingUser(freshUser);
    } catch (err) {
      toast.error("Erro ao buscar usuário.");
    }
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
      <Head />

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
                <ActionButton
                  title="Visualizar"
                  onClick={() => handleView(user)}
                >
                  <FaEye />
                </ActionButton>
                <ActionButton
                  title="Editar"
                  variant="edit"
                  onClick={() => handleEdit(user)}
                >
                  <FaEdit />
                </ActionButton>
                <ActionButton
                  title="Excluir"
                  variant="delete"
                  onClick={() => handleDelete(user.id)}
                >
                  <FaTrash />
                </ActionButton>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      {editingUser && (
        <UserModal
          user={editingUser}
          mode="edit"
          onClose={() => setEditingUser(null)}
          onSubmit={onSubmit}
          isLoading={saveMutation.isLoading}
        />
      )}

      {viewingUser && (
        <UserModal
          user={viewingUser}
          mode="view"
          onClose={() => setViewingUser(null)}
        />
      )}
    </Container>
  );
}
