import styled from "styled-components";

export const Container = styled.div`
  padding: 90px 2rem 2rem; /* Adiciona espaço no topo para a Head fixa */
`;

export const Title = styled.h1`
  margin-bottom: 1.5rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Thead = styled.thead`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
`;

export const Th = styled.th`
  padding: 0.75rem;
  text-align: left;
`;

export const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #ccc;
`;

export const Tr = styled.tr`
  &:hover {
    background-color: #f9f9f9;
  }
`;

export const ActionButton = styled.button<{ variant?: "edit" | "delete" }>`
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border: none;
  border-radius: 4px;
  color: white;
  background-color: ${({ variant }) =>
    variant === "delete" ? "#e74c3c" : "#2980b9"};
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

// Modal
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  max-width: 500px;
  margin: 10% auto;
  border-radius: 8px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const SaveButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: green;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const CancelButton = styled.button`
  margin-left: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #aaa;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const ErrorText = styled.p`
  color: red;
  margin: -0.5rem 0 0.5rem;
`;
