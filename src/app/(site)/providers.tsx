"use client";

import ToasterContext from "../context/ToastContext";

const SiteProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ToasterContext />
      {children}
    </>
  );
};

export default SiteProviders;
