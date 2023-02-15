import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { LOGIN_USER } from "../../graphql/mutation.js";
import ReactLoading from 'react-loading';
import './login.scss';

const Login = () => {
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email && !password) return;

    try {
      const { data } = await loginUser({
        variables: { loginInput: { email, password } },
      });
      const { token } = data.loginUser;
      localStorage.setItem("token", token);
      localStorage.setItem("data", JSON.stringify(data));
      navigate("/home");
    //   client.resetStore();
    } catch (error) {
      console.error(error.message);
    }
  };
  if (data) {
    return toast.success(`Bienvenido usuario, ${data?.loginUser?.email}!`, {
      duration: 4000,
      position: "top-center",
      icon: "👏",
    });
    
  }
  if (loading) {
    return <div>
                <ReactLoading type={"spokes"} color={"black"} height={40} width={40} />
           </div>
  }

  return (
    <>
    <div className="container-form-div">
      <form onSubmit={onSubmit} className="form-div">
        <label>Email </label>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Ingrese su Email"
          onChange={(e) => setEmail(e.target.value)}

        />
        <label>Contraseña </label>
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Ingrese su contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="div-button-login">
        <button className="buttonLogin" type="submit">
          Acceso
        </button>
        </div>
        <Toaster />
        <div className="divError">{error && <p>{error.message}</p>}</div>
      </form>
      </div>
    </>
  );
};

export default Login;
