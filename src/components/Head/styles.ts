import styled from "styled-components";

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: white;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  z-index: 1000;
`;

export const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Button = styled.button`
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background || "#00509d"};
  }
`;
