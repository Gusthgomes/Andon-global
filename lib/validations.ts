import { z } from "zod";

export const signUpSchema = z
  .object({
    fullName: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
  })
  .transform((data) => ({
    ...data,
    role: "COMMON",
  }));

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const ticketitem = z.array(
  z.object({
    item: z
      .string()
      .min(1, "Item deve ter no mínimo 1 caractere")
      .max(15, "Item deve ter no máximo 15 caracteres"),
    quantity: z
      .string()
      .min(1, "Quantidade deve ser maior que 0")
      .max(100, "Quantidade deve ser menor que 100"),
    description: z
      .string()
      .min(1, "Descrição deve ter no mínimo 1 caractere")
      .max(30, "Descrição deve ter no máximo 100 caracteres"),
  })
);

export const ticketschema = z.object({
  number: z
    .string()
    .min(3, "Este campo deve ter no mínimo 3 caracteres")
    .max(6, "Este campo deve ter no máximo 6 caracteres"),
  kit: z.string().min(1, "Kit é obrigatório"),
  area: z.string().min(1, "Area é obrigatório"),
  line: z.string().min(1, "Area é obrigatório"),
  posto: z.string().min(1, "Area é obrigatório"),
  motivo: z.string().min(1, "Area é obrigatório"),
  ticketItem: ticketitem,
});
