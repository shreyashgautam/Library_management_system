import { RegisterFormControls } from "../../components/config/index";
import CommonForm from "../../components/common/form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/auth-slice/index";
import { useToast } from "../../../src/hooks/use-toast"

const initialState = {
    userName: '',
    email: '',
    password: ''
};

function AuthRegister() {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const { toast } = useToast();
    const navigate = useNavigate();
    function onSubmit(event) {
        event.preventDefault(); // ✅ Prevents page reload
        dispatch(registerUser(formData)).then((data) => {
            if (data?.payload?.success) {
                toast({
                    title:data?.payload?.message+" ✅ "
                });
                navigate("/auth/login")
                console.log(data)
            }
            else{
                toast({
                    title:data?.payload?.message,
                    variant:"destructive"
                })
            }
        });


    }

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Create New Account</h1>
                <p className="mt-2">
                    Already have an account?
                    <Link to="/auth/login" className="font-medium text-primary ml-2 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
            <CommonForm
                formControls={RegisterFormControls}
                buttonText="Register"
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
        </div>
    );
}

export default AuthRegister;
