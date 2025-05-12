import React from "react";
import { FaTimes } from "react-icons/fa";

import { CancelButton, Input } from "../UserForm/styles";
import type { User } from "../../../types";
import {
  ButtonGroup,
  ModalContent,
  ModalOverlay,
  SaveButton,
  CloseBtn,
  ModalHeader,
  FormRow,
} from "./styles";

interface UserModalProps {
  user: User;
  mode: "edit" | "view";
  onClose: () => void;
  onSubmit?: (data: User) => void;
  isLoading?: boolean;
}

const UserModal: React.FC<UserModalProps> = ({
  user,
  mode,
  onClose,
  onSubmit,
  isLoading,
}) => {
  const { name, email, phone, isAdmin } = user;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h2>{mode === "edit" ? "Editar Usuário" : "Visualizar Usuário"}</h2>
          <CloseBtn onClick={onClose}>
            <FaTimes />
          </CloseBtn>
        </ModalHeader>

        <form>
          <FormRow>
            <label>Nome</label>
            <Input name="name" defaultValue={name} disabled={mode === "view"} />
          </FormRow>

          <FormRow>
            <label>Email</label>
            <Input
              name="email"
              defaultValue={email}
              disabled={mode === "view"}
            />
          </FormRow>

          <FormRow>
            <label>Telefone</label>
            <Input
              name="phone"
              defaultValue={phone}
              disabled={mode === "view"}
            />
          </FormRow>

          <FormRow>
            <label>Administrador</label>
            <Input
              type="checkbox"
              name="isAdmin"
              defaultChecked={isAdmin}
              disabled={mode === "view"}
            />
          </FormRow>

          <ButtonGroup>
            {mode === "edit" && (
              <CancelButton onClick={onClose}>Cancelar</CancelButton>
            )}
            {mode === "edit" && (
              <SaveButton
                onClick={() => onSubmit && onSubmit(user)}
                disabled={isLoading}
              >
                {isLoading ? "Salvando..." : "Salvar"}
              </SaveButton>
            )}
          </ButtonGroup>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default UserModal;
