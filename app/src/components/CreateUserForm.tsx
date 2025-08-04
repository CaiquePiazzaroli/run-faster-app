import { type FormEvent, useState } from "react";
import { Input } from "./ui/input";

export default function CreateUserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(name);
    if (password !== confirmPassword) {
      return alert("Password not match");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        type="text"
      />
      <Input
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        type="text"
      />
      <Input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        type="text"
      />
      <Input
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        required
        type="text"
      />
      <input type="submit" value="Create user" />
    </form>
  );
}
