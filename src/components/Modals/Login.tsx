import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';
import { auth } from '@/firebase/firebase';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = (type: "login" | "register" | "forgotPassword") => {
    setAuthModalState(prev => ({ ...prev, type }));
  };

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [
    signInWithEmailAndPassword,
    ,           // 忽略未使用的 `user`
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const router = useRouter();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await signInWithEmailAndPassword(inputs.email, inputs.password);
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  return (
    <form className="space-y-6 px-6 pb-4" onSubmit={handleLogin}>
      <h3 className="text-xl font-medium text-white">Sign in LeetClone</h3>

      <div>
        <label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">
          Your Email
        </label>
        <input
          onChange={handleInputChange}
          type="email"
          name="email"
          id="email"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="name@company.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="text-sm font-medium block mb-2 text-gray-300">
          Your Password
        </label>
        <input
          onChange={handleInputChange}
          type="password"
          name="password"
          id="password"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="********"
        />
      </div>

      <button
        type="submit"
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-500 hover:bg-green-600"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <div className="flex w-full justify-end" onClick={() => handleClick("forgotPassword")}>
        <a href="#" className="text-sm block text-brand-orange hover:underline text-right">
          Forgot Password?
        </a>
      </div>

      <div className="text-sm font-medium text-gray-500 text-center">
        Not Registered?
        <a
          href="#"
          className="text-blue-700 hover:underline ml-1"
          onClick={() => handleClick("register")}
        >
          Create account
        </a>
      </div>
    </form>
  );
};

export default Login;
