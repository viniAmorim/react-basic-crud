import { useLogout } from "../../hooks/useLogout";
import { Button, ButtonGroup, Header, Logo } from "./styles";

export interface HeadProps {
  onAddUser: () => void;
}

export default function Head({ onAddUser }: HeadProps) {
  const { mutate: logout, isPending } = useLogout();
  return (
    <Header>
      <Logo>CRUD</Logo>
      <ButtonGroup>
        <Button onClick={onAddUser}>Novo Usuário</Button>
        <Button onClick={() => logout()} disabled={isPending}>
          {isPending ? "Saindo..." : "Logout"}
        </Button>
      </ButtonGroup>
    </Header>
  );
}
