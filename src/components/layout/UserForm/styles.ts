import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 4px;
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const ErrorText = styled.span`
  color: red;
  font-size: 12px;
`;

export const SubmitButton = styled.button`
  padding: 10px 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const CancelButton = styled.button`
  padding: 10px 16px;
  background-color: #aaa;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;
