import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());

    if (response.statusCode === 400) {
      return alert(response.message);
    }

    //fow now, storing the token in localStorage
    localStorage.setItem("token", response.token);

    return navigate("/users");
  }

  return (
    <div className="p-6">
      <Card className="gap-2">
        <CardHeader>
          <CardTitle>Login to your Account!</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <Input
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              type="text"
            />
            <Input
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
              type="password"
            />
            <Input name="Login" type="submit" value="Login" />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
