import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

export function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // in a real app you would authenticate here
    navigate("/dashboard");
  };

  return (
    <div className="page login-page">
      <div className="login-card">
        <h1>Login</h1>
        <p>Please click the button to proceed to the dashboard.</p>
        <Button className="login-button" onClick={handleLogin}>
          Log In
        </Button>
      </div>
    </div>
  );
}
