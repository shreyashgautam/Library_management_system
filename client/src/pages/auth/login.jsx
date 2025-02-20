
import { loginFromUsername } from "../../components/config/index";
import CommonForm from "../../components/common/form";
import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../store/auth-slice/index";
import { useDispatch } from "react-redux";
import { useToast } from "../../../src/hooks/use-toast"
CommonForm
const initialState={
    
    email:'',
    password:''
}


function AuthLogin(){
    const [formData,setFormData]=useState(initialState);
    const dispatch = useDispatch();
    const { toast } = useToast();
    

    function onSubmit(event) {
        event.preventDefault();
    
        dispatch(loginUser(formData)).then((data) => {
          if (data?.payload?.success) {
            toast({
              title: data?.payload?.message,
            });
          } else {
            toast({
              title: data?.payload?.message,
              variant: "destructive",
            });
          }
        });
      }
    return(
        
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3ml font-bold tracking-tight text-foreground">Welcome Back</h1>
                <p className="mt-2">Not Having Account <Link to='/auth/register' className="font-medium text-primary ml-2 hover:underline">Register</Link>
                </p>
                            </div>
                            <CommonForm
                            formControls={loginFromUsername}
                            buttonText={'Login'}
                            formData={formData}
                            setFormData={setFormData}
                            onSubmit={onSubmit}
                            ></CommonForm>
        </div>
    )
}
export default AuthLogin;