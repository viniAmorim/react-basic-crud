export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return <h1>Bem-vindo ao Dashboard, {user.email || "visitante"}!</h1>;
}
