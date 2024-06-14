import { Logout } from "@/lib/actions";
import "../globals.css";

export const metadata = {
  title: "Next Auth",
  description: "Next.js Authentication",
};

export default function AuthRootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header id="auth-header">
          <p>Welcome Back</p>
          <form action={Logout}>
            <button type="submit">Logout</button>
          </form>
        </header>
        {children}
      </body>
    </html>
  );
}
