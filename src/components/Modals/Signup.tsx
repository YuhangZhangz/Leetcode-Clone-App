import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';
import { auth, firestore } from '@/firebase/firebase';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const Signup: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = () => setAuthModalState(prev => ({ ...prev, type: "login" }));
  const router = useRouter();

  const [inputs, setInputs] = useState({
    email: "",
    displayName: "",
    password: "",
  });

  const [
    createUserWithEmailAndPassword,
    , // 忽略未使用的 user
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password || !inputs.displayName) {
      alert("Please fill in all fields");
      return;
    }
    try {
      toast.loading("Creating account...", { position: "top-center", toastId: "loadingToast" });
      const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
      if (!newUser) return;
      const userData = {
        uid: newUser.user.uid,
        email: newUser.user.email,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        likeProblem: [],
        dislikeProblem: [],
        solvedProblem: [],
        starredProblem: [],
      };
      await setDoc(doc(firestore, "users", newUser.user.uid), userData);
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message, { position: "top-center" });
      } else {
        console.error(err);
      }
    } finally {
      toast.dismiss("loadingToast");
    }
  };

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  return (
    <form className='space-y-6 px-6 pb-4' onSubmit={handleRegister}>
      <h3 className='text-xl font-medium text-white'>Register to LeetClone</h3>
      <div>
        <label htmlFor="email" className='text-sm font-medium block mb-2 text-gray-300'>Email</label>
        <input
          onChange={handleChangeInput}
          type="email"
          name="email"
          id="email"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="name@company.com"
        />
      </div>
      <div>
        <label htmlFor="displayName" className='text-sm font-medium block mb-2 text-gray-300'>Display Name</label>
        <input
          onChange={handleChangeInput}
          type="text"
          name="displayName"
          id="displayName"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label htmlFor="password" className='text-sm font-medium block mb-2 text-gray-300'>Password</label>
        <input
          onChange={handleChangeInput}
          type="password"
          name="password"
          id="password"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="********"
        />
      </div>
      <button
        type="submit"
        className='w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-500 hover:bg-green-600'
      >
        {loading ? "Registering..." : "Register"}
      </button>
      <div className="text-sm font-medium text-gray-500 text-center">
        Already have an account?
        <a href="#" className="text-blue-700 hover:underline ml-1" onClick={handleClick}>
          Log In
        </a>
      </div>
    </form>
  );
};

export default Signup;
