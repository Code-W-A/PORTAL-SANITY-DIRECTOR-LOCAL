import SignIn from "@/components/Auth/SignIn";
import React from "react";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/libs/metadata";

export const metadata = buildMetadata({
  title: `Autentificare | ${siteConfig.name}`,
  description: "Pagina privata pentru autentificare.",
  path: "/auth/signin",
  noIndex: true,
});

const SignInPage = () => {
  return (
    <main>
      <SignIn />
    </main>
  );
};

export default SignInPage;
