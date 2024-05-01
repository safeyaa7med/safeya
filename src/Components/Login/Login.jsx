import Navbar from "./Navbar";
import Footer from "./Footer";
import Form from "./Form"
function Login() {
  return (
    <div className="h-screen flex flex-col font-semibold bg-gradient-to-t from-indigo-200 dark:from-slate-800 dark:to-slate-400 relative overflow-hidden">
      <Navbar className="sticky top-0" />
      <div className="flex-1 flex items-center justify-center">
        <Form />
      </div>
      <Footer className="sticky bottom-0" />
    </div>
  );
}
export default Login;
