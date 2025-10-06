
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { BulbIcon } from "../icons/BulbIcon";
import { MainLogo } from "../icons/MainLogo";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-grey-200 text-center px-6">
      
      
      <div className="text-purple-600 mb-4 ">
        <MainLogo/>
      </div>

      
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 font-sans">
        Your Digital <span className="text-purple-600">Second Brain</span>
      </h1>

     
      <p className="mt-6 text-lg md:text-2xl  text-gray-500 max-w-2xl">
        Organize your thoughts, ideas, and information in one place. Accessible
        from anywhere, at any time.
      </p>

     
      <p className="mt-4 text-md  text-gray-600">
        Sign up now to start organizing your thoughts and ideas without worrying about emails
      </p>

     
      <div className="flex gap-4 mt-8 ">
        <Button
          varient="primary"
          text="Get Started"
          startIcon={<BulbIcon/>}
          onClick={() => navigate("/signup")}
        />
        {/* <Button
          varient="secondary"
          text="Explore Shared Brains"
          startIcon={<span>📤</span>}
          onClick={() => navigate("/explore")}
        /> */}
      </div>
    </div>
  );
}
