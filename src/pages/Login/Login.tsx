import { useLogin } from "../../hooks/useLogin";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Form, Input, Button, ErrorText } from "./styles";
import toast from "react-hot-toast"; // ✅ Importa toast

interface LoginFormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email obrigatório"),
  password: yup.string().required("Senha obrigatória"),
});

export default function Login() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(data, {
      onSuccess: ({ token, refresh_token, user }) => {
        localStorage.setItem("token", token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      },
      onError: () => {
        toast.error("Erro ao fazer login. Verifique suas credenciais.");
      },
    });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input type="email" {...register("email")} placeholder="Email" />
        {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

        <Input type="password" {...register("password")} placeholder="Senha" />
        {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

        <Button type="submit" disabled={isPending}>
          {isPending ? "Entrando..." : "Entrar"}
        </Button>
        {/* ✅ Link para cadastro */}
        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </Form>
    </Container>
  );
}
