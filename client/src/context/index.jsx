import axios from "axios";
import React, { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

export const GlobalContext = createContext();

const GlobalState = ({ children }) => {
    const [permission, setPermission] = useState([]);
    const [user, setUser] = useState({
        username: '',
        email: '',
        role: '',
        roleId: '',
        _id: '',
        isLogin: false,
    });

    const getProfile = async () => {
        try {
            const res = await axios.get('/users/profile');
            if (res.data.success) {
                setUser({ ...res.data?.data, isLogin: true });
            }

        } catch (error) {
            console.log(error)
        }
    }

    const getPermission = async ()=>{
        try{
            const info = await axios.get(`/mapings/${user.roleId}`)
            setPermission(info.data.data);

        }catch(error){
            console.log(error)
        }
    }
  
    useEffect(() => { 
        getProfile().then(()=>{
            if(user.role){
                getPermission()
            }
        })
     }, [user.isLogin , user?.role])
     
    return (
        <GlobalContext.Provider value={{
            user,
            setUser,
            permission,
            setPermission
        }}>
            {children}
        </GlobalContext.Provider>
    )

}
export default GlobalState;