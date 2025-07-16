import { useQuery } from "@tanstack/react-query";

type userSchema = {
  id: string;
  name: string;
};

export default function Home() {
  const query = useQuery({
    queryKey: ["id"],
    queryFn: () =>
      fetch("http://localhost:3000/users").then((res) => res.json()),
  });

  return (
    <div>
      <h1>Users of System</h1>
      <ul>
        {query.data?.map((user: userSchema) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
