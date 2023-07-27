import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useAuth() {
    const authContext = useContext(AuthContext);
    const authObject = authContext?.auth;
    return {
        authObject: authObject,
        isAuthenticated: authObject ? true : false,
        logout: () => {authContext?.setAuth(null)}
    }
}