import { useState } from "react";
import { useNavigate } from "react-router";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Erro ao fazer login");

      localStorage.setItem("token", data.token);
      navigate("/races");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-linear-to-br from-blue-600 via-sky-500 to-indigo-500">
      {/* Painel Esquerdo (branding) */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 text-white px-10">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight drop-shadow-lg">
          Run Fast App
        </h1>
        <p className="text-lg text-blue-100 max-w-md text-center leading-relaxed">
          Acompanhe suas corridas, melhore seus tempos e mantenha-se motivado a
          cada passo. 💨
        </p>
        <div className="mt-10">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4834/4834075.png"
            alt="Runner Icon"
            className="w-40 h-40 opacity-90 drop-shadow-xl"
          />
        </div>
      </div>

      {/* Painel Direito (login) */}
      <div className="flex flex-1 justify-center items-center bg-white rounded-t-3xl md:rounded-none shadow-2xl">
        <div className="w-full max-w-md p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Bem-vindo de volta 👋
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Entre para continuar acompanhando suas corridas.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                E-mail
              </label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                placeholder="Digite sua senha"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {errorMessage && (
              <p className="text-red-600 text-sm text-center">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 shadow-md"
              }`}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-8">
            © {new Date().getFullYear()} Run Fast App — Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
