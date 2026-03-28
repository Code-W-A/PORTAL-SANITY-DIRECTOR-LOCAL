import React from "react";

const SignupOption = ({
  isPassword,
  setIsPassword,
}: {
  isPassword: any;
  setIsPassword: any;
}) => {
  return (
    <div className="border-gray-4 dark:border-strokedark mx-auto mt-9 mb-12.5 flex flex-col items-center justify-center gap-1 rounded-lg border p-1 md:flex-row">
      <button
        className={`hover:border-primary hover:bg-primary/5 hover:text-primary dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary w-full rounded-lg px-6 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:hover:shadow-none ${
          !isPassword && "bg-primary/5 text-primary border-primary border"
        }`}
        onClick={() => setIsPassword(false)}
      >
        Magic Link
      </button>
      <button
        className={`hover:border-primary hover:bg-primary/5 hover:text-primary dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary w-full rounded-lg px-6 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:hover:shadow-none ${
          isPassword && "bg-primary/5 text-primary border-primary border"
        }`}
        onClick={() => setIsPassword(true)}
      >
        Password
      </button>
    </div>
  );
};

export default SignupOption;
