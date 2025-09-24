import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router";

type formDataType = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  } as formDataType);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const  res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    if (res.status !== 200) {
      return window.alert("Inválid login");
    }

    const json = await res.json();
    localStorage.setItem("token", json.token);

    navigate("/user/profile");
  }

  function handleInput(event: FormEvent<HTMLInputElement>): void {
    const inputTag = event.target as HTMLInputElement;
    setFormData({ ...formData, [inputTag.name]: inputTag.value });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" onInput={handleInput} />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          id="password"
          name="password"
          type="password"
          onInput={handleInput}
        />
      </div>
      <div>
        <button name="submit" type="submit">
          Login
        </button>
      </div>
    </form>
  );
}
