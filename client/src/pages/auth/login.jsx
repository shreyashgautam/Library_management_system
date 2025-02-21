import { loginFromUsername } from "../../components/config/index";
import CommonForm from "../../components/common/form";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../store/auth-slice/index";
import { useDispatch } from "react-redux";
import { useToast } from "../../../src/hooks/use-toast";

const initialState = {
  email: '',
  password: ''
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

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

  return (
    <div className={`mx-auto w-full max-w-md space-y-6 transition-opacity duration-1000 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`text-center transform transition-transform duration-1000 ${show ? 'translate-y-0' : 'translate-y-5'}`}>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome Back</h1>
        <p className="mt-2">
          Not Having an Account? 
          <Link 
            to='/auth/register' 
            className="font-medium text-primary ml-2 hover:underline transition-all duration-300 hover:text-[#432818]"
          >
            Register
          </Link>
        </p>
      </div>

      <div className={`transition-transform duration-1000 ${show ? 'translate-y-0' : 'translate-y-5'}`}>
        <CommonForm
          formControls={loginFromUsername}
          buttonText={'Login'}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

export default AuthLogin;
