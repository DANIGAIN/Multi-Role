import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from 'react-modal';
import { modalStyles } from './../utils/constant'

export default function UserModal(props) {
    const [isLoading, setIsLoading] = useState(false);
    const { req, setIsOpenUser, users, setUsers, user, roles, isOpenUser } = props;
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: user ? {
            username:user.username,
            email: user.email,
            role: user.role._id,
        } : {}
    });

    const onSubmit = async (data) => {
        setIsLoading(true)
        try {
            if (req === 'create') {
                const res = await axios.post('/users', data);
                console.log(res.data)
                if (res.data.success) {
                    setUsers([res.data.data, ...users])
                    toast.success(res.data?.message);
                } else {
                    toast.error(res.data?.message);
                }

            } else if (req === 'update') {
                const res = await axios.put(`/users/${user._id}`, data);
                if (res.data.success) {
                    const filderUser = users.filter((data) => data._id !== user._id);
                    const filterRole = roles.filter((role) => role._id === data.role)[0]
                    data._id = user._id;
                    data.role = {
                        _id: filterRole._id,
                        name: filterRole.name
                    }

                    setUsers([data, ...filderUser]);
                    toast.success(res.data?.message);
                }
            }
            reset()
            setIsOpenUser(false)

        } catch (error) {
            console.log(error);
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }

    }
    return (
        <div>
            <Modal
                isOpen={isOpenUser}
                style={modalStyles}
                contentLabel="User Modal"
                appElement={document.getElementById('root')}
                onRequestClose={() => setIsOpenUser(false)}
            >
                <div className="flex flex-row">
                    <p className="text-xl font-medium mb-4">{req} User </p>
                    <span className="text-lg  pl-40 hover:text-red-600 "
                        onClick={() => setIsOpenUser(false)}
                    >X</span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        {
                            !errors.username ? (
                                <label
                                    htmlFor="username"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Username
                                </label>

                            ) : (

                                <label
                                    htmlFor="username"
                                    className="block text-sm font-medium text-red-700"
                                >
                                    {`${errors.username?.message}`}
                                </label>
                            )
                        }

                        <input
                            type="text"
                            {...register("username",
                                {
                                    required: "Username is required",

                                })}
                            id="username"
                            name="username"
                            placeholder='Enter user username'
                            className={`text-gray-700 block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-gray-400 focus:border-gray-600 ${errors.email
                                ? " border-red-400"
                                : " border-gray-400"
                                }`}
                        />
                    </div>
                    <div>
                        {
                            !errors.email ? (
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>

                            ) : (

                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-red-700"
                                >
                                    {`${errors.email?.message}`}
                                </label>
                            )
                        }

                        <input
                            type="text"
                            {...register("email",
                                {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                            id="email"
                            name="email"
                            placeholder='Enter user email'
                            className={`text-gray-700 block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-gray-400 focus:border-gray-600 ${errors.email
                                ? " border-red-400"
                                : " border-gray-400"
                                }`}
                        />
                    </div>
                    {req == 'create' && <div>
                        {
                            !errors.password ? (
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>

                            ) : (

                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-red-700"
                                >
                                    {`${errors.password?.message}`}
                                </label>
                            )
                        }

                        <input
                            type="password"
                            {...register("password",
                                {
                                    required: "Password is required",
                                    maxLength: {
                                        value: 30,
                                        message: "Password is at max 30 characters"
                                    },
                                    minLength: {
                                        value: 4,
                                        message: "Password is at min 4 characters"
                                    }
                                })}
                            id="password"
                            name="password"
                            placeholder='Enter user password '
                            className={`text-gray-700 block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-gray-400 focus:border-gray-600 ${errors.email
                                ? " border-red-400"
                                : " border-gray-400"
                                }`}
                        />
                    </div>}
                    <div>
                        {
                            !errors.role ? (
                                <label
                                    htmlFor="role"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Role
                                </label>

                            ) : (

                                <label
                                    htmlFor="role"
                                    className="block text-sm font-medium text-red-700"
                                >
                                    {`${errors.role?.message}`}
                                </label>
                            )
                        }

                        <select
                            type="text"
                            {...register("role",
                                {
                                    required: "Role is required",
                                })}
                            id="role"
                            name="role"
                            defaultValue={''}
                            className={`text-gray-700 block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-gray-400 focus:border-gray-600 ${errors.role
                                ? " border-red-400"
                                : " border-gray-400"
                                }`}
                        >
                            <option value='' disabled > Enter user role</option>
                            {roles.map((role, index) => (
                                role.isActive && <option key={index} value={`${role._id}`}>{role.name}</option>
                            ))}
                        </select>
                    </div>


                    <div>
                        {!isLoading ?
                            <button
                                type="submit"
                                className="w-full  bg-blue-500 focus:bg-blue-700  text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                            >
                                Submit
                            </button> : <button
                                type="button"
                                className="w-full  bg-blue-500 focus:bg-blue-700  text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                            >
                                ....
                            </button>}
                    </div>
                </form>
            </Modal>
        </div>

    )
}