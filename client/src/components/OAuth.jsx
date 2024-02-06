import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { app } from "../firebase";
import { signInFailure, signInSuccess } from "../redux/user/userSlice";

const OAuth = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhoto: resultFromGoogle.user.photoURL,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
      console.log(resultFromGoogle);
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      className="w-full mt-4"
      outline
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className="w-6 h-6" />
      <span className="ml-2">Continue with google</span>
    </Button>
  );
};

export default OAuth;
