import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../store/slices/auth/loginSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user)

  useEffect(()=>{
    if(user){
        navigate("/")
    }
  },[])

  const handelClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(
          setLogin({
            name: user.displayName,
            email: user.email,
            token: user.accessToken,
            id: user.uid,
            image: user.photoURL,
            emailVerified: user.emailVerified,
          })
        );
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return <div onClick={handelClick}>Login</div>;
};

export default Login;
