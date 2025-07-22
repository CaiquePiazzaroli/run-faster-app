import { useQuery } from "@tanstack/react-query";

type userSchema = {
  id: string;
  name: string;
};

export default function Home() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("http://localhost:3000/users", {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "token <API-KEY>",
        },
      }).then((res) => res.json()),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(users)) {
    return window.alert(users.message);
  }

  return (
    <div>
      <h1>Users of System</h1>
      <ul>
        {users?.map((user: userSchema) => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ul>
    </div>
  );
}
