import { useState } from 'react'
import './LoginForm.css'

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm() {

  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Digite seu email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Digite sua senha"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Entrar</button>
    </form>
  );
}
