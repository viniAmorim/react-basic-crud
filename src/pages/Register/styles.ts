import styled from "styled-components";

export const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

export const Button = styled.button`
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:disabled {
    background-color: #a0a0a0;
  }
`;

export const ErrorText = styled.span`
  color: red;
  font-size: 0.875rem;
`;
