import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Thead = styled.thead`
  background-color: #f0f0f0;
`;

export const Tr = styled.tr``;

export const Th = styled.th`
  padding: 0.75rem;
  text-align: left;
`;

export const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #ccc;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const SaveButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
`;

export const ConfirmButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

export const CancelButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

export const ActionButton = styled.button<{ variant?: "edit" | "delete" }>`
  margin-right: 0.5rem;
  padding: 0.25rem 0.5rem;
  border: none;
  background-color: ${({ variant }) =>
    variant === "edit"
      ? "#ffc107"
      : variant === "delete"
      ? "#dc3545"
      : "#17a2b8"};
  color: white;
  border-radius: 0.25rem;
  cursor: pointer;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
