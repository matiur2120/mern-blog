import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./pages/CreatePost";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import SignUp from "./pages/SignUp";
import SingIn from "./pages/SingIn";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SingIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
        </Route>
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
