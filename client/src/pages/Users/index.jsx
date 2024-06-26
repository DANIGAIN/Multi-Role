import axios from "axios";
import { GrEdit } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import RoleModal from "../../compoments/RoleModal";
import ComponentModal from "./../../compoments/ComponentModal";
import UserModal from "../../compoments/UserModal";
import MapingModal from './../../compoments/MapingModal';

export default function Users() {
    const [role, setRole] = useState(null);
    const [user, setUser] = useState(null);
    const [component, setComponent] = useState(null);
    const [maping, setMaping] = useState(null);
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const [components, setComponents] = useState([]);
    const [mapings, setMapings] = useState([]);
    const [isOpenRole, setIsOpenRole] = useState(false);
    const [isOpenUser, setIsOpenUser] = useState(false);
    const [isOpenComponent, setIsOpenComponent] = useState(false);
    const [isOpenMaping, setIsOpenMaping] = useState(false);
    const [req, setReq] = useState(null);
    const navigate = useNavigate();
   
    const getAllRoles = async () => {
        try {
            const res = await axios.get('/roles');
            if (res.data.success) {
                setRoles(res.data?.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const getAllComponents = async () => {
        try {
            const res = await axios.get('/components');
            if (res.data.success) {
                setComponents(res.data?.data);
            }

        } catch (error) {
            console.log(error)
        }
    }
    const getAllUsers = async () => {
        try {
            const res = await axios.get('/users');
            if (res.data.success) {
                setUsers(res.data?.data);
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getAllMapings = async () => {
        try {
            const res = await axios.get('/mapings');
            if (res.data.success) {
                setMapings(res.data?.data);
            }
        } catch (error) {
            console.log(error);
        }
    
}
const handelComponentUpdate = async (id) => {
    const data = components.filter((data) => data._id == id)[0];
    setReq('update');
    setComponent(data);
    setIsOpenComponent(true);
}
const handelRoleUpdate = async (id) => {
    const data = roles.filter((data) => data._id === id)[0]
    setReq('update')
    setRole(data)
    setIsOpenRole(true)
}
const handelUserUpdate = async (id) => {
    const data = users.filter((data) => data._id === id)[0];
    setReq('update')
    setUser(data)
    setIsOpenUser(true)
}
const handelMapingUpdate = async (id) =>{
    const data =mapings.filter((data) => data._id === id)[0];
    setReq('update')
    setMaping(data)
    setIsOpenMaping(true)
}
useEffect(() => {
    getAllMapings()
    getAllRoles()
    getAllComponents()
    getAllUsers()

}, [])
return (
    <>
        {isOpenRole && <RoleModal
            req={req}
            isOpenRole={isOpenRole}
            setIsOpenRole={setIsOpenRole}
            role={role}
            roles={roles}
            setRoles={setRoles}
        />}
        {isOpenComponent && <ComponentModal
            req={req}
            isOpenComponent={isOpenComponent}
            setIsOpenComponent={setIsOpenComponent}
            component={component}
            components={components}
            setComponents={setComponents}
        />}
        {isOpenUser && <UserModal
            req={req}
            isOpenUser={isOpenUser}
            setIsOpenUser={setIsOpenUser}
            user={user}
            users={users}
            setUsers={setUsers}
            roles={roles}
        />}
        {isOpenMaping && <MapingModal
            req={req}
            isOpenMaping={isOpenMaping}
            setIsOpenMaping={setIsOpenMaping}
            maping={maping}
            mapings={mapings}
            setMapings={setMapings}
            roles={roles}
            components={components}
        />}

        <div className="h-screen flex flex-col">
            <div className="flex flex-row justify-between p-10 bg-gray-300">
                <div className="basic-1/4">
                    <button
                        className="w-60 h-10 focus:outline-none rounded-full text-black  bg-sky-600 hover:bg-purple-600 hover:text-white  ring-2 "
                        onClick={() => (setIsOpenUser(true), setReq('create'), setUser(null))}
                    >
                        <span> + </span>
                        <span className="mr-2">add</span>
                        <span className="text-lg  font-medium">users</span>
                    </button>
                </div>
                <div className="basic-1/4">
                    <button
                        className="w-60 h-10 focus:outline-none rounded-full text-black  bg-sky-600 hover:bg-purple-600 hover:text-white  ring-2 "
                        onClick={() => (setIsOpenMaping(true), setReq('create'), setMaping(null))}
                    >
                        <span> + </span>
                        <span className="mr-2">add</span>
                        <span className="text-lg  font-medium">rc maping</span>
                    </button>
                </div>
                <div className="basic-1/4">
                    <button
                        className="w-60 h-10 focus:outline-none rounded-full text-black  bg-sky-600 hover:bg-purple-600 hover:text-white  ring-2 "
                        onClick={() => (setIsOpenRole(true), setReq('create'), setRole(null))}
                    >
                        <span> + </span>
                        <span className="mr-2">add</span>
                        <span className="text-lg  font-medium">role</span>
                    </button>
                </div>
                <div className="basic-1/4">
                    <button
                        className="w-60 h-10 focus:outline-none rounded-full text-black  bg-sky-600 hover:bg-purple-600 hover:text-white  ring-2 "
                        onClick={() => (setIsOpenComponent(true), setReq('create'), setComponent(null))}
                    >
                        <span> + </span>
                        <span className="mr-2">add</span>
                        <span className="text-lg  font-medium">component</span>
                    </button>
                </div>
            </div>
            <div className="flex-1 overflow-hidden ">
                <div className="flex flec-row md:justify-between p-3 justify-center gap-10">
                    <div className="basic-1/4">
                        <div className="flex flex-col space-y-4 ">
                            {users.map((user, index) => (
                                <div key={index}
                                    className="flex justify-between items-center space-x-20 bg-slate-200 p-3 "
                                >
                                    <span className="text-bold"
                                        onClick={()=> navigate(`/users/${user._id}`)}
                                    >{user?.username}</span>
                                    <span className="text-bold">{user?.role.name}</span>
                                    <span className=" pl-4" onClick={() => handelUserUpdate(user._id)}>
                                        <GrEdit />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="basic-1/4">
                        <div className="flex flex-col space-y-4 ">
                            {mapings.map((rc, index) => (
                                <div key={index}
                                    className="flex justify-between items-center space-x-20 bg-slate-200 p-3 "
                                >
                                    <span className="text-bold">{rc?.role.name}</span>
                                    <span className="text-bold">{rc?.component.name}</span>
                                    <span className=" pl-4" onClick={() => handelMapingUpdate(rc._id)}>
                                        <GrEdit />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="basic-1/4 hidden md:block lg:block">
                        <div className="flex flex-col space-y-4 ">
                            {roles.map((role, index) => (
                                <div key={index}
                                    className="flex justify-between space-x-20 bg-slate-200 p-3 "
                                >
                                    <span className="text-bold lg:pr-40 md:pr-20 sm:10">{role.name}</span>
                                    <div className="flex justify-center lg:space-x-5 md:space-x-3">
                                        {!role.isActive ?
                                            <span className="bg-red-100 h-6 items-center  text-wight text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-gray-600 dark:text-gray-300">

                                                UnActive
                                            </span> :
                                            <span className="bg-green-100 h-6 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">

                                                Active
                                            </span>
                                        }
                                        <span className=" pl-4" onClick={() => handelRoleUpdate(role._id)}>
                                            <GrEdit />
                                        </span>
                                    </div>


                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="basic-1/4 hidden xl:block">
                        <div className="flex flex-col space-y-4 ">
                            {components.map((component, index) => (
                                <div key={index}
                                    className="flex justify-between space-x-20 bg-slate-200 p-3 "
                                >
                                    <span className="text-bold lg:pr-40 md:pr-20 sm:10">{component.name}</span>
                                    <div className="flex justify-center ">
                                        {!component.isActive ?
                                            <span className="bg-red-100 h-6 items-center  text-wight text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-gray-600 dark:text-gray-300">

                                                UnActive
                                            </span> :
                                            <span className="bg-green-100 h-6 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">

                                                Active
                                            </span>
                                        }
                                        <span className="pl-4" onClick={() => handelComponentUpdate(component._id)}>
                                            <GrEdit />
                                        </span>
                                    </div>


                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>



)
}
