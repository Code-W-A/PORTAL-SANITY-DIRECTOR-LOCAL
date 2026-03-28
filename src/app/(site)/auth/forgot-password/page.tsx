import React from "react";
import ForgetPassword from "@/components/Auth/ForgetPassword";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/libs/metadata";

export const metadata = buildMetadata({
  title: `Recuperare parola | ${siteConfig.name}`,
  description: "Pagina privata pentru recuperarea parolei.",
  path: "/auth/forgot-password",
  noIndex: true,
});

const ForgotPasswordPage = () => {
  return (
    <main className="bg-gray">
      <ForgetPassword />
    </main>
  );
};

export default ForgotPasswordPage;
