import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  width: 400px;
  max-width: 100%;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  label {
    width: 30%;
    text-align: left;
    font-weight: bold;
  }

  input {
    width: 65%;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const CancelButton = styled.button`
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #ddd;
  }
`;

export const SaveButton = styled.button`
  background-color: #007bff;
  border: none;
  padding: 10px 20px;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:disabled {
    background-color: #f5f5f5;
  }
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #000;
  &:hover {
    color: blue;
  }
`;
