import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ButtonGroup,
  CancelButton,
  ErrorText,
  Form,
  FormGroup,
  Input,
  Label,
  Select,
  SubmitButton,
} from "./styles";

export interface UserFormData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  isAdmin: boolean;
}

interface UserFormProps {
  mode: "create" | "edit" | "view";
  initialData?: UserFormData;
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
}

const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  phone: yup.string().required("Telefone é obrigatório"),
  isAdmin: yup.boolean().required("Seleção obrigatória"),
});

export default function UserForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
}: UserFormProps) {
  const isView = mode === "view";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData,
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label>Nome</Label>
        <Input disabled={isView} {...register("name")} />
        {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
      </FormGroup>

      <FormGroup>
        <Label>Email</Label>
        <Input disabled={isView} {...register("email")} />
        {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
      </FormGroup>

      <FormGroup>
        <Label>Telefone</Label>
        <Input disabled={isView} {...register("phone")} />
        {errors.phone && <ErrorText>{errors.phone.message}</ErrorText>}
      </FormGroup>

      <FormGroup>
        <Label>Administrador?</Label>
        <Select disabled={isView} {...register("isAdmin")}>
          <option value="">Selecione</option>
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </Select>
        {errors.isAdmin && <ErrorText>{errors.isAdmin.message}</ErrorText>}
      </FormGroup>

      <ButtonGroup>
        {!isView && <SubmitButton type="submit">Salvar</SubmitButton>}
        <CancelButton type="button" onClick={onCancel}>
          {isView ? "Voltar" : "Cancelar"}
        </CancelButton>
      </ButtonGroup>
    </Form>
  );
}
