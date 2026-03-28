import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { validateEmail } from "@/libs/validateEmail";
import Loader from "../Common/Loader";
import z from "zod";
import { integrations, messages } from "../../../integrations.config";

const schema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

const MagicLinkSignin = ({ isSignup }: any) => {
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);

  const signinWithMail = (e: any) => {
    e.preventDefault();

    if (!integrations?.isAuthEnabled) {
      toast.error(messages?.auth);
      return;
    }

    const result = schema.safeParse({ email });
    if (!result.success) {
      const firstError = result.error.errors[0]?.message;
      toast.error(firstError);
      return;
    }

    setLoader(true);
    if (!validateEmail(email)) {
      setLoader(false);
      return toast.error("Please enter a valid email address.");
    } else {
      signIn("email", {
        redirect: false,
        email: email,
      })
        .then((callback) => {
          if (callback?.ok) {
            toast.success("Email sent");
            setEmail("");
          }
        })
        .catch((error) => {
          toast.error(error);
        });

      setLoader(false);
    }
  };

  return (
    <form onSubmit={signinWithMail}>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="text-custom-sm text-dark mb-3 block font-medium"
        >
          Email
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          type="email"
          name="email"
          required
          placeholder="Enter your email"
          className="border-gray-4 placeholder:text-dark-2 focus:border-gray-7 focus:shadow-input focus:ring-dark-4/20 w-full rounded-md border bg-white px-6 py-3.5 outline-hidden duration-200 focus:border-transparent focus:ring-2"
        />
      </div>

      <button
        type="submit"
        className="bg-dark flex w-full items-center justify-center rounded-md px-5 py-3.5 font-medium text-white transition-all duration-200 hover:opacity-90"
      >
        Sign in {loader && <Loader />}
      </button>

      {isSignup ? (
        <p className="mt-5 text-center">
          Don&apos;t have an account?
          <Link href="/auth/signup" className="text-dark ml-1">
            Sign Up for Free
          </Link>
        </p>
      ) : (
        <p className="mt-5 text-center">
          Already a member?
          <Link href="/auth/signin" className="text-dark ml-1">
            Sign in
          </Link>
        </p>
      )}
    </form>
  );
};

export default MagicLinkSignin;
