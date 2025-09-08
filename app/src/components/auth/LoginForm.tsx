import { type FormEvent, useState } from "react";

type formDataType = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  } as formDataType);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
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
        <input id="password" name="password" type="password" onInput={handleInput}/>
      </div>
      <div>
        <button name="submit" type="submit">
          Login
        </button>
      </div>
    </form>
  );
}
