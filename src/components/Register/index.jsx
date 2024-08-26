import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Input from '../Input';
import Button from '../Button';
import { auth,  db, provider } from '../../firebase';
import {setDoc, doc, getDoc} from 'firebase/firestore'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const signupWithEmail = () => {
    setLoading(true);
    if (name.length < 3) {
      toast.error("Name should have minimum 3 letters");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (password.length < 5) {
      toast.error("Password must be at least 5 characters long!");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      setLoading(false);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoading(false);
        toast.success("Account created successfully");
        createDocument(user);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setLoginForm(false);
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error("User already exists");
        setLoading(false);
      });
  };

  async function createDocument(user) {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if(!userData.exists()){
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,  
          email: user.email,
          uid: user.uid,
          photoURL: user.photoURL,
          createdAt: new Date(),
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      toast.info("User already exists");
    }
  }

  function loginUsingEmail(){
    setLoading(true);
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (password.length < 5) {
      toast.error("Password must be at least 5 characters long!");
      setLoading(false);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Login successful");
        setLoading(false);
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error("Invalid credentials");
        setLoading(false);

      });
  }

  function googleAuth() {
    setLoading(true);
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    createDoc(user)
    setLoading(false);
    toast.success("User authenticated");  
    navigate("/dashboard");

   
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    setLoading(false)
    toast.error("There was an error")
  });
  }

  return (
    <div className={`w-[85%] sm:w-[70%] max-w-[400px] ${loginForm ? "h-[90%]" : "h-[100%]"}  mt-6 sm:px-4 pt-8 pb-4 rounded-lg shadow-xl flex flex-col justify-start items-center`}>
      {loginForm ? (
        <>
          <h2 className="text-center text-2xl font-semibold text-[#2970FF] px-2">
            Login to your account
          </h2>
          <form
            className="w-full h-[100%] px-6 sm:px-8 flex flex-col justify-evenly items-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input state={email} setState={setEmail} placeholder="Enter email" type="email" />
            <Input state={password} setState={setPassword} placeholder="Enter password" type="password" />
            <Button
              disabled={loading}
              text={loading ? "Verifying..." : "Login"}
              blue={false}
              onClick={() => loginUsingEmail()}
              className="mt-2"
            />
            <div>or</div>
            <Button
              disabled={loading}
              text={loading ? "Verifying..." : "Google login"}
              blue={true}
              onClick={() => googleAuth()}
            />
          </form>
          <p className="mt-4">
            Don't have an account?{" "}
            <span className="text-blue-500 cursor-pointer" onClick={() => setLoginForm(false)}>
              Register here
            </span>
          </p>
        </>
      ) : (
        <>
          <h2 className="text-center text-2xl font-semibold text-[#2970FF] px-2">
            Create a new account
          </h2>
          <form
            className="w-full h-[100%] px-6 sm:px-8 flex flex-col justify-evenly items-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input state={name} setState={setName} placeholder="Enter name" type="text" />
            <Input state={email} setState={setEmail} placeholder="Enter email" type="email" />
            <Input state={password} setState={setPassword} placeholder="Enter password" type="password" />
            <Input state={confirmPassword} setState={setConfirmPassword} placeholder="Confirm password" type="password" />
            <Button
              disabled={loading}
              text={loading ? "Creating user..." : "Register"}
              blue={false}
              onClick={signupWithEmail}
              className="mt-2"
            />
            <div>or</div>
            <Button
              disabled={loading}
              text={loading ? "Creating user..." : "Google signup"}
              blue={true}
              onClick={() => googleAuth()}
            />
          </form>
          <p className="mt-4">
            Have an account?{" "}
            <span className="text-blue-500 cursor-pointer" onClick={() => setLoginForm(true)}>
              Login here
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default Register;



