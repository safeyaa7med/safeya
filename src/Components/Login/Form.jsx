import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../auth/authSlice";
import { useLoginMutation } from "../../auth/authApiSlice";
import usePersist from "../../hooks/usePersist";
import { Flex, Container, Spinner, VStack, Box } from "@chakra-ui/react";

function Login() {
  const language = localStorage.getItem("language") || "عربي";
  const userRef = useRef();
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [persist, setPersist] = usePersist();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const parentDir = language === "English" ? "ltr" : "rtl";
  const navigate = useNavigate();
  useEffect(() => {
    userRef.current?.focus();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("/refresh/user");
      console.log('response.data is :', response.data.emp_no);
      setUser({
        ...user,
        accessToken: response.data.accessToken,
        refreshToken: response.data.newRefreshToken,
      });
      console.log('user is :', user);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  
  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwt_decode(user.accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        config.headers["authorization"] = "Bearer" + data.accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  const handleToggle = () => setPersist((prev) => !prev);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      const decodedToken = jwt_decode(accessToken);
      const employeeNo = decodedToken.UserInfo.emp_no;
      setUsername("");
      setPassword("");
      navigate("/user/profile", { state: { employee: employeeNo } });
    } catch (err) {
      if (!err.status) {
        setError("لا يوجد إتصال بالسيرفر");
      } else if (err.status === 400) {
        setError("إسم المستخدم أو كلمة المرور غير صحيحة");
      } else if (err.status === 401) {
        setError("المستخدم غير مصرح");
      } else {
        setError(err.data?.message);
      }
    }
  };
  
  return (
    <div id="contact" className="font-semibold w-full h-80">
      <Flex className="mx-auto">
        <Container
          className="dark:bg-transparent p-5 rounded-md"
          dir={parentDir}
        >
          <div className="flex flex-col gap-3 items-center">
            <h1 className="text-black text-lg">
              {language === "English" ? `Sign in` : `تسجيل دخول`}
            </h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className="p-8 flex flex-col gap-5 items-center"
            encType="multipart/form-data"
          >
            <VStack width={"full"}>
              <Box width={"full"}>
                <label
                  htmlFor="emp_no"
                  className="p-2 w-full md:full text-right dark:text-white"
                >
                  {language === "English" ? `Computer ID :` : `الرقم الوظيفي :`}
                </label>
              </Box>
              <input
                required
                className="p-2 w-full md:full ring-1 ring-indigo-300 rounded-md dark:bg-slate-800 dark:ring-0 dark:text-white"
                type="text"
                id="emp_no"
                name="emp_no"
                placeholder={
                  language === "English" ? `Computer ID` : `الرقم الوظيفي`
                }
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                ref={userRef}
              />
            </VStack>
            <VStack width={"full"}>
              <Box width={"full"}>
                <label
                  htmlFor="iqama_no"
                  className="p-1 w-full md:full text-right dark:text-white"
                >
                  {language === "English" ? `Iqama No. :` : `رقم الإقامة :`}
                </label>
              </Box>
              <input
                required
                className="p-2 w-full md:full ring-1 ring-indigo-300 rounded-md dark:bg-slate-800 dark:ring-0 dark:text-white"
                type="text"
                id="iqama_no"
                name="iqama_no"
                placeholder={
                  language === "English" ? `iqama no.` : `رقم الإقامة`
                }
                aria-label="iqama_no"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </VStack>
            <div
              dir="rtl"
              className="flex flex-row justify-between gap-1 w-full md:full"
            >
              <Box
                className="flex flex-row gap-2"
                width={"full"}
                dir={parentDir}
              >
                <input
                  type="checkbox"
                  className="w-5 rounded-md"
                  onChange={handleToggle}
                  checked={persist}
                />
                <h6 className="dark:text-white">
                  {language === "English" ? `Trust device` : `تذكرني`}
                </h6>
              </Box>
            </div>
            {error && (
              <span className="text-red-700 text-sm dark:text-red-400">
                {language === "English"
                  ? `Computer number or Iqama number is incorrect`
                  : `الرقم الوظيفي أو رقم الإقامة غير صحيح`}
              </span>
            )}
            <div className="flex flex-row justify-between items-center w-full gap-2">
              <button
                className="w-full mt-5 bg-indigo-600 text-white font-medium px-3 py-2 rounded-md cursor-pointer"
                type="submit"
              >
                {isLoading
                  ? <Spinner color="white" />
                  : language === "English"
                  ? `Sign in`
                  : `تسجيل الدخول`}
              </button>
            </div>
          </form>
        </Container>
      </Flex>
    </div>
  );
}
export default Login;
