import { useState } from "react";
import { IMaskInput } from "react-imask";
import { formSchema } from "./schemas/formSchema";
import { ZodError } from "zod";

export function App() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      nome: formData.get("nome")?.toString(),
      email: formData.get("email")?.toString(),
      telefone: formData.get("telefone")?.toString(),
      senha: formData.get("senha")?.toString(),
      confirmarSenha: formData.get("confirmarSenha")?.toString(),
    };

    try {
      formSchema.parse(data);
      setErrors({});
      setOpenConfirmationModal(true);
      e.currentTarget.reset();
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-zinc-900 text-zinc-200">
      <form
        className="p-10 bg-zinc-800 rounded-xl flex flex-col gap-4 md:min-w-[500px] w-auto"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="nome">Nome</label>
          <input
            className="w-full bg-zinc-700 px-4 py-3 outline-none"
            placeholder="Digite seu nome"
            name="nome"
          />
          {errors.nome && <p className="text-red-500 text-sm">{errors.nome}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            className="w-full bg-zinc-700 px-4 py-3 outline-none"
            placeholder="Digite seu email"
            type="email"
            name="email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="telefone">Telefone</label>
          <IMaskInput
            className="w-full bg-zinc-700 px-4 py-3 outline-none"
            placeholder="(11) 99999-9999"
            mask="(00) 00000-0000"
            name="telefone"
          />
          {errors.telefone && (
            <p className="text-red-500 text-sm">{errors.telefone}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="senha">Senha</label>
          <input
            className="w-full bg-zinc-700 px-4 py-3 outline-none"
            placeholder="Digite sua senha"
            type="password"
            name="senha"
          />
          {errors.senha && (
            <p className="text-red-500 text-sm">{errors.senha}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirmarSenha">Confirmar senha</label>
          <input
            className="w-full bg-zinc-700 px-4 py-3 outline-none"
            placeholder="Confirme sua senha"
            type="password"
            name="confirmarSenha"
          />
          {errors.confirmarSenha && (
            <p className="text-red-500 text-sm">{errors.confirmarSenha}</p>
          )}
        </div>
        <button className="w-full bg-zinc-900 p-4 rounded-lg hover:opacity-90 cursor-pointer">
          Cadastrar
        </button>
      </form>
      {openConfirmationModal && (
        <div className="h-screen w-screen bg-black/70 flex items-center justify-center inset-0 fixed">
          <div className="w-[400px] py-4 px-6 bg-zinc-900 rounded-lg">
            <h1 className="text-center text-2xl mb-7">
              Cadastro realizado com sucesso!
            </h1>
            <button
              onClick={() => setOpenConfirmationModal(false)}
              className="w-full bg-zinc-800 p-4 rounded-lg hover:opacity-90 cursor-pointer"
            >
              Voltar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
