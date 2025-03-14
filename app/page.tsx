import { getServerSession } from "next-auth";

export default async function page() {
  const session = await getServerSession();
  if (!session) {
    return (
      <div>
        <h1>Welcome! Please Log in</h1>
      </div>
    );
  }
  const user = session?.user;
  return (
    <div>
      <h1>Welcome {user?.name}!</h1>
    </div>
  );
}
