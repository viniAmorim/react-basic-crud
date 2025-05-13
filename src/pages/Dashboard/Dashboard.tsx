import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
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

import { useDebounce } from "../../hooks/useDebounce";
import toast from "react-hot-toast";
import UserModal from "../../components/layout/UserModal/UserModal";

import {
  ActionButton,
  ButtonGroup,
  CancelButton,
  ConfirmButton,
  Container,
  Input,
  Table,
  Td,
  Th,
  Thead,
  Tr,
} from "./styles";
import Head from "../../components/layout/Head/Head";

const schema = yup.object({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().email("Email inválido").required("Email obrigatório"),
  phone: yup.string().required("Telefone obrigatório"),
  isAdmin: yup.boolean().required("isAdmin obrigatório"),
});

export default function Dashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [searchIsAdmin, setSearchIsAdmin] = useState(""); // "", "true", "false"
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    phone: "",
    isAdmin: "",
  });

  // Debounce filters
  const debouncedSetFilters = useDebounce((newFilters) => {
    setFilters(newFilters);
  }, 500);

  useEffect(() => {
    debouncedSetFilters({
      name: searchName,
      email: searchEmail,
      phone: searchPhone,
      isAdmin: searchIsAdmin,
    });
  }, [searchName, searchEmail, searchPhone, searchIsAdmin]);

  const {
    data: users = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users", filters],
    queryFn: () => fetchUsers(filters),
    keepPreviousData: true,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const saveMutation = useMutation({
    mutationFn: (user) => (editingUser ? updateUser(user) : createUser(user)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(
        editingUser
          ? "Usuário editado com sucesso."
          : "Usuário criado com sucesso."
      );
      setEditingUser(null);
    },
  });

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleView = async (user) => {
    try {
      const freshUser = await findUserById(user.id);
      setViewingUser(freshUser);
    } catch (err) {
      toast.error("Erro ao buscar usuário.");
    }
  };

  const handleDelete = (id) => {
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

  const onSubmit = (data) => {
    saveMutation.mutate(data);
  };

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar usuários</p>;

  return (
    <Container>
      <Head />
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Input
          placeholder="Buscar por nome"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <Input
          placeholder="Buscar por email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <Input
          placeholder="Buscar por telefone"
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
        />
        <select
          value={searchIsAdmin}
          onChange={(e) => setSearchIsAdmin(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="true">Administradores</option>
          <option value="false">Usuários comuns</option>
        </select>
      </div>

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
