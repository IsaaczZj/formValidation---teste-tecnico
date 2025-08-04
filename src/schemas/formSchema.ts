import z from "zod";

export const formSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Digite um email válido"),
  telefone: z.string().min(1, "Telefone é obrigatório"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmarSenha: z.string().min(1, "Confirme sua senha")
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "As senhas não coincidem",
  path: ["confirmarSenha"]
});

export type FormData = z.infer<typeof formSchema>;