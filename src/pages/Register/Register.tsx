import { useCreateUser } from "../../hooks/useCreateUser";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Container, Form, Input, Button, ErrorText } from "./styles";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  email: string;
  phone?: string;
  password?: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().email("Email inválido").required("Email obrigatório"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
  phone: yup.string().optional(),
});

export default function RegisterUser() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { mutate: createUser, isPending } = useCreateUser();

  const onSubmit = (data: FormData) => {
    createUser(data, {
      onSuccess: () => {
        toast.success("Usuário cadastrado com sucesso!");
        reset();
        navigate("/login");
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Erro ao cadastrar usuário"
        );
      },
    });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("name")} placeholder="Nome" />
        {errors.name && <ErrorText>{errors.name.message}</ErrorText>}

        <Input {...register("email")} placeholder="Email" />
        {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

        <Input type="password" {...register("password")} placeholder="Senha" />
        {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

        <Input {...register("phone")} placeholder="Telefone" />
        {errors.phone && <ErrorText>{errors.phone.message}</ErrorText>}

        <Button type="submit" disabled={isPending}>
          {isPending ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </Form>
    </Container>
  );
}
