import { useNavigate } from "react-router-dom";
import { useLogout } from "../../../hooks/useLogout";
import { Button, ButtonGroup, Header, Logo } from "./styles";
import { FiLogOut } from "react-icons/fi";

export default function Head() {
  const { mutate: logout, isPending } = useLogout();
  const navigate = useNavigate();
  return (
    <Header>
      <Logo>CRUD</Logo>
      <Button onClick={() => logout()} disabled={isPending} title="Sair">
        <FiLogOut size={20} />
      </Button>
    </Header>
  );
}
