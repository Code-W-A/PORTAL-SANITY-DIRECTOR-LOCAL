"use client";

import AuthProvider from "../context/AuthContext";
import { StripeSessionProvider } from "../context/StripeSessionContext";
import ToasterContext from "../context/ToastContext";

const SiteProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ToasterContext />
      <StripeSessionProvider>{children}</StripeSessionProvider>
    </AuthProvider>
  );
};

export default SiteProviders;
