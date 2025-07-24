import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type userSchema = {
  id: string;
  name: string;
  email: string;
};

export default function Users() {
  const navigate = useNavigate();

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("http://localhost:3000/users", {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `token ${localStorage.token}`,
        },
      }).then((res) => res.json()),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(users)) {
    navigate("/login");
  }

  return (
    <div className="m-auto max-w-md py-20">
      <h1>Users of System</h1>
      <ul>
        {users?.map((user: userSchema) => {
          return (
            <li key={user.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{user.name}</CardTitle>
                </CardHeader>
                <CardContent>{user.email}</CardContent>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
