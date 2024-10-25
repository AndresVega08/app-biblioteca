import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    user: null,
    isFetching: false,
    error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: JSON.parse(storedUser) });
        }
    }, []);

    const logout = () =>{
        localStorage.removeItem('user');
        dispatch({type: 'LOGOUT'});
    }

    useEffect(() => {
        const logoutTimer = setTimeout(logout, 3300000);
        return () => clearTimeout(logoutTimer);
    }, [state.user]);
    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
                logout
            }}>
            {children}
        </AuthContext.Provider>
    );

}