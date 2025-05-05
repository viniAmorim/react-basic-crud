import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Container, ErrorText, Form, Input } from "./styles";

interface LoginFormData {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().email("Email inválido").required("Email obrigatório"),
    password: yup
      .string()
      .min(6, "Mínimo 6 caracteres")
      .required("Senha obrigatória"),
  })
  .required();

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginFormData) => {
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input type="email" placeholder="Email" {...register("email")} />
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        </div>

        <div>
          <Input
            type="password"
            placeholder="Senha"
            {...register("password")}
          />
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        </div>

        <Button type="submit">Entrar</Button>
      </Form>
    </Container>
  );
}
