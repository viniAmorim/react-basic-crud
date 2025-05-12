import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().email("Email inválido").required("Email obrigatório"),
  phone: yup.string().required("Telefone obrigatório"),
  isAdmin: yup.boolean().required("isAdmin obrigatório"),
});
