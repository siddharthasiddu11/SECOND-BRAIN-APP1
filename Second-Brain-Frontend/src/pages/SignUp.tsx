import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Logo } from "../icons/Logo";
import {BACKEND_URL} from '../config'
import axios  from "axios"; 
import { useNavigate } from "react-router-dom";

export function SignUp () {
    const usernameRef = useRef<HTMLInputElement>(null); 
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    async function signup() {
      const username = usernameRef.current?.value;
      console.log(usernameRef.current); 
      const password = passwordRef.current?.value;
     await axios.post(BACKEND_URL + "/api/v1/signup/", {
          username,
          password
      }) 
     alert("You have signed up!");
     navigate("/signin")
    }

    return <div className="h-screen w-screen bg-grey-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8 border-grey-200">
              <div className="flex  pt-4 items-center justify-center text-2xl font-black">
                <div className=" pr-2 text-purple-600">
                    <Logo/>
                </div>
                Second Brain
              </div>
              <div className="pt-4">
                <Input ref={usernameRef} type="text" placeholder="Username"/>
               <Input ref={passwordRef} type="password" placeholder="Password"/>
              </div>
              <div className="pt-2 text-slate-600 flex justify-center ">
                <h1>Already a user? </h1> 
                <a href="/signin" className="hover:underline ml-1"> Sign in</a>
              </div>
              <div className="flex justify-center pt-4">
                <Button onClick={signup} loading={false} varient="primary" text="SignUp"/>
              </div>
        </div>
    </div>
}