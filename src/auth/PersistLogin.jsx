import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';
import { useRefreshUserMutation } from "./authApiSlice";
import usePersist from "../hooks/usePersist";
import { useSelector } from 'react-redux';
import { selectCurrentToken } from "./authSlice";
import { CircularProgress } from '@chakra-ui/react';

const PersistLogin = () => {
    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)
    const [trueSuccess, setTrueSuccess] = useState(false)
    const [refreshUser, {isUninitialized, isLoading,isSuccess,isError,error}] = useRefreshUserMutation()
    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode
            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {
                    //const response = 
                    await refreshUser()
                    // const { accessToken } = response.data
                    setTrueSuccess(true)
                }
                catch (err) {
                    console.error(err)
                }
            }

            if (!token && persist) verifyRefreshToken()
        }

        return () => effectRan.current = true

        // eslint-disable-next-line
    }, [])


    let content
    if (!persist) { // persist: no
        console.log('no persist')
        content = <Outlet />
    } else if (isLoading) { //persist: yes, token: no
        content = <CircularProgress isIndeterminate color='red.700' style={{display:"flex", justifyContent:"center"}}/>
    } else if (isError) { //persist: yes, token: no
        console.log('error')
        content = (
            <p className='text-red-700 font-semibold mt-4 flex justify-center' dir="rtl">
                {`${error?.data?.message} - `}
                <Link to="/login">يرجي تسجيل الدخول</Link>.
            </p>
        )
    } else if (isSuccess && trueSuccess) { 
        console.log('success')
        content = <Outlet />
    } else if (token && isUninitialized) { 
        console.log('token and uninit')
        console.log(isUninitialized)
        content = <Outlet /> 
    }

    return content
}
export default PersistLogin