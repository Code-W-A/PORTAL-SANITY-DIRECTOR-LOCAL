import Loader from "@/components/Common/Loader";
import Link from "next/link";

const EmailSignup = ({ handleSubmit, data, setData, loader }: any) => {
  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="text-custom-sm text-dark mb-3 block font-medium"
          >
            Name
          </label>
          <input
            value={data.name}
            onChange={(e) =>
              setData({
                ...data,
                [e.target.name]: e.target.value,
              })
            }
            name="name"
            type="name"
            placeholder="Enter your name"
            className="border-gray-4 placeholder:text-dark-2 focus:shadow-input focus:ring-dark-4/20 w-full rounded-md border bg-white px-6 py-3.5 outline-hidden duration-200 focus:border-transparent focus:ring-2"
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
            value={data.email}
            onChange={(e) =>
              setData({
                ...data,
                [e.target.name]: e.target.value,
              })
            }
            name="email"
            type="email"
            placeholder="Enter your email"
            className="border-gray-4 placeholder:text-dark-2 focus:shadow-input focus:ring-dark-4/20 w-full rounded-md border bg-white px-6 py-3.5 outline-hidden duration-200 focus:border-transparent focus:ring-2"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="text-custom-sm text-dark mb-3 block font-medium"
          >
            Password
          </label>
          <input
            value={data.password}
            onChange={(e) =>
              setData({
                ...data,
                [e.target.name]: e.target.value.toLowerCase(),
              })
            }
            name="password"
            type="password"
            placeholder="Confirm password"
            className="border-gray-4 placeholder:text-dark-2 focus:shadow-input focus:ring-dark-4/20 w-full rounded-md border bg-white px-6 py-3.5 outline-hidden duration-200 focus:border-transparent focus:ring-2"
          />
        </div>

        <button
          type="submit"
          className="bg-dark flex w-full items-center justify-center rounded-md px-5 py-3.5 font-medium text-white transition-all duration-200 hover:opacity-90"
        >
          Sign up {loader && <Loader />}
        </button>

        <p className="mt-5 text-center">
          Already a member?
          <Link href="/auth/signin" className="text-dark ml-1">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default EmailSignup;
