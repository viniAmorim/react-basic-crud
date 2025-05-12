import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaTimes } from "react-icons/fa";

import { CancelButton, Input } from "../UserForm/styles";
import {
  ButtonGroup,
  ModalContent,
  ModalOverlay,
  SaveButton,
  CloseBtn,
  ModalHeader,
  FormRow,
} from "./styles";

import type { User } from "../../../types";

interface UserModalProps {
  user: User;
  mode: "edit" | "view" | "create";
  onClose: () => void;
  onSubmit?: (data: User) => void;
  isLoading?: boolean;
}

const schema = yup.object({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().email("Email inválido").required("Email obrigatório"),
  phone: yup.string().required("Telefone obrigatório"),
  isAdmin: yup.boolean(),
});

const UserModal: React.FC<UserModalProps> = ({
  user,
  mode,
  onClose,
  onSubmit,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(schema),
    defaultValues: user,
  });

  useEffect(() => {
    reset(user);
  }, [user, reset]);

  const submitForm = (data: User) => {
    if (onSubmit) onSubmit(data);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h2>
            {mode === "edit" && "Editar Usuário"}
            {mode === "view" && "Visualizar Usuário"}
            {mode === "create" && "Adicionar Usuário"}
          </h2>
          <CloseBtn onClick={onClose}>
            <FaTimes />
          </CloseBtn>
        </ModalHeader>

        <form onSubmit={handleSubmit(submitForm)}>
          <FormRow>
            <label>Nome</label>
            <Input {...register("name")} disabled={mode === "view"} />
            {errors.name && <span>{errors.name.message}</span>}
          </FormRow>

          <FormRow>
            <label>Email</label>
            <Input {...register("email")} disabled={mode === "view"} />
            {errors.email && <span>{errors.email.message}</span>}
          </FormRow>

          <FormRow>
            <label>Telefone</label>
            <Input {...register("phone")} disabled={mode === "view"} />
            {errors.phone && <span>{errors.phone.message}</span>}
          </FormRow>

          <FormRow>
            <label>Administrador</label>
            <input
              type="checkbox"
              {...register("isAdmin")}
              disabled={mode === "view"}
            />
          </FormRow>

          {mode !== "view" && (
            <ButtonGroup>
              <CancelButton type="button" onClick={onClose}>
                Cancelar
              </CancelButton>
              <SaveButton type="submit" disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar"}
              </SaveButton>
            </ButtonGroup>
          )}
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default UserModal;
