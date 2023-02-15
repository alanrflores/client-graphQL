
import React , { useState } from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphql/mutation";
import { useNavigate } from "react-router-dom";


export function UseAuth() {
const client = useApolloClient();
const [loginUser, { data, loading, error}] = useMutation(LOGIN_USER);
const [userData, setUserData] = useState(null);

const authToken = localStorage.getItem('token');
const navigate = useNavigate();

function isAuthenticated() {
    return authToken;
};
async function login(email, password) {
    const { data }= await loginUser({ variables: { loginInput: { email, password }}})
    const { token } = data.loginUser;
    // if (typeof window !== 'undefined') {
    //     // Set the JWT token in the local storage when the user logs in
    //     window.localStorage.setItem('token', token);
    //   }
    localStorage.setItem('token', token);
    localStorage.setItem('data', data);
    client.resetStore();
};

function logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('data')
    setUserData(null);
    client.resetStore();
};


return {
    loading: loading,
    authToken,
    error: error,
    userData,
    setUserData,
    isAuthenticated,
    login,
    logout,

};
}