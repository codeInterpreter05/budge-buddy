import React, { useState } from 'react'
import Input from '../Input'
import Button from '../Button';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className='w-[85%] sm:w-[70%] max-w-[400px] h-[100%] mt-6 sm:px-4 pt-8 pb-4 rounded-lg shadow-xl flex flex-col justify-start items-center'>
      <h2 className="text-center text-2xl font-semibold text-[#2970FF] px-2">
        Create a new account
      </h2>
      <form action="" className='w-full h-[100%] px-6 sm:px-8 flex flex-col justify-evenly items-center'>
        <Input state={name} setState={setName} placeholder={"Enter name"} type={"text"}></Input>
        <Input state={email} setState={setEmail} placeholder={"Enter email"} type={"email"}></Input>
        <Input state={password} setState={setPassword} placeholder={"Enter password"} type={"password"}></Input>
        <Input state={confirmPassword} setState={setConfirmPassword} placeholder={"Confirm password"} type={"password"}></Input>
        <Button text={"Register"} blue={false} className='mt-2'></Button>
        <div>or</div>
        <Button text={"Google signup"} blue={true}></Button>
      </form>
    </div>
  )
}

export default Register
