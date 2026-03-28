import React from "react";
import ResetPassword from "@/components/Auth/ResetPassword";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/libs/metadata";

export const metadata = buildMetadata({
  title: `Resetare parola | ${siteConfig.name}`,
  description: "Pagina privata pentru resetarea parolei.",
  path: "/auth/reset-password",
  noIndex: true,
});

const ResetPasswordPage = async (props: { params: Promise<{ token: string }> }) => {
  const params = await props.params;
  if (!params.token) {
    return <div>Invalid token</div>;
  }

  const token = params.token;

  return (
    <main className="bg-gray">
      <ResetPassword token={token} />
    </main>
  );
};

export default ResetPasswordPage;
