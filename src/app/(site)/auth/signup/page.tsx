import Signup from "@/components/Auth/SignUp";
import React from "react";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/libs/metadata";

export const metadata = buildMetadata({
  title: `Creare cont | ${siteConfig.name}`,
  description: "Pagina privata pentru inregistrare.",
  path: "/auth/signup",
  noIndex: true,
});

const SingupPage = () => {
  return (
    <main>
      <Signup />
    </main>
  );
};

export default SingupPage;
