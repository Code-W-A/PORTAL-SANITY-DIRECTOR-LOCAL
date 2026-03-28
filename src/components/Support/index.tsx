"use client";
import { useForm } from "formbold-react";
import z from "zod";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long" }),
});

const Support = ({ formId }: { formId: string }) => {
  const [state, handleSubmit] = useForm(formId);

  if (state.succeeded) {
    return (
      <div className="mx-auto mt-40 text-center">
        <h1 className="text-custom-1 text-dark mb-3.5 font-bold">Thank you!</h1>
        <p>Our support team will get back to you ASAP via email.</p>
        <button className="bg-dark mt-10 rounded-lg px-6 py-3 font-medium text-white hover:opacity-90">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-40 max-w-[550px] rounded-xl">
      <div className="text-center">
        <h1 className="text-custom-1 text-dark mb-3.5 font-bold">
          Need any Help?
        </h1>
        <p>Our support team will get back to you ASAP via email.</p>
      </div>

      <div className="shadow-box my-10 bg-white p-4 sm:p-7.5 xl:p-10">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="text-custom-sm text-dark mb-3 block font-medium"
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              required
              name="name"
              className="border-gray-4 placeholder:text-dark-2 focus:border-gray-7 focus:ring-primary w-full rounded-md border bg-white px-6 py-3.5 outline-hidden duration-200 focus:border-transparent focus:ring-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="text-custom-sm text-dark mb-3 block font-medium"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              name="email"
              className="border-gray-4 placeholder:text-dark-2 focus:border-gray-7 focus:ring-primary w-full rounded-md border bg-white px-6 py-3.5 outline-hidden duration-200 focus:border-transparent focus:ring-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="text-custom-sm text-dark mb-3 block font-medium"
            >
              Message
            </label>
            <textarea
              name="message"
              className="border-gray-4 placeholder:text-dark-2 focus:border-gray-7 focus:ring-primary w-full rounded-md border bg-white px-6 py-3.5 outline-hidden duration-200 focus:border-transparent focus:ring-2"
              cols={20}
              rows={5}
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-dark flex w-full justify-center rounded-md px-5 py-3.5 font-medium text-white transition-all duration-200 hover:opacity-90"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Support;
