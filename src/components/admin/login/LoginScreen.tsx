import { LoginForm } from "./LoginForm";
import { LoginHero } from "./LoginHero";

export function LoginScreen() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <section className="flex items-center justify-center px-6 py-12">
        <LoginForm />
      </section>
      <LoginHero />
    </div>
  );
}
