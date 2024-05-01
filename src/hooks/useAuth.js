import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isEmployee = false
    let status = "Employee"

    if (token) {
        const decoded = jwtDecode(token)
        const { id, username, name, roles, tel, emp_no, userPhoto, email } = decoded.UserInfo

        isEmployee = roles.includes('employee')
        
        if (isEmployee) status = "employee"
        
        return { id, username,email, name, roles, status,isEmployee, tel, emp_no, userPhoto }
    } 

    return { username: '', roles: [], isEmployee, status }
}
export default useAuth