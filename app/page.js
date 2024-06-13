import AuthForm from "@/components/auth-form";

export default async function Home({ searchParams }) {
  const formMode = searchParams.mode || "signup";
  return <AuthForm mode={formMode} />;
}
