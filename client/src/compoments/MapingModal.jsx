import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from 'react-modal';
import { modalStyles } from './../utils/constant'

export default function ComponentModal(props) {
    const [isLoading, setIsLoading] = useState(false);
    const { req, setIsOpenMaping, isOpenMaping, roles, components, setMapings, mapings, maping } = props;
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: maping ? {
            role: maping.role._id,
            component: maping.component._id,
        } : {}
    });
   


    const onSubmit = async (data) => {
        setIsLoading(true)
        try {
            if (req === 'create') {
                const res = await axios.post('/mapings', data);
                if (res.data.success) {
                
                    setMapings([res.data.data, ...mapings])
                    toast.success(res.data?.message);
                }
               
            } else if (req === 'update') {
               
                const res = await axios.put(`/mapings/${maping._id}`, data);
                if (res.data.success) {
                    const filterMap = mapings.filter((data) => data._id !== maping._id);
                    const filterRole = roles.filter((role) => role._id === data.role)[0];
                    const filterComponent = components.filter((comp) => comp._id === data.component)[0];
                    
                    data._id = maping._id;
                    data.role = {
                        _id: filterRole._id,
                        name: filterRole.name
                    }
                    data.component ={
                        _id: filterComponent._id,
                        name: filterComponent.name
                    }
                 
                    setMapings([data, ...filterMap]);
                    toast.success(res.data?.message);
                }
            }
            reset()
            setIsOpenMaping(false)

        } catch (error) {
            if(!error.response.data?.success){
                 toast.error(error.response.data?.message)
            }
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <>
            <div>
                <Modal
                    isOpen={isOpenMaping}
                    style={modalStyles}
                    contentLabel="User Maping"
                    appElement={document.getElementById('root')}
                    onRequestClose={() => setIsOpenMaping(false)}
                >
                    <div className="flex flex-row">
                        <p className="text-xl font-medium mb-4">{req} Component</p>
                        <span className="text-lg  pl-40 hover:text-red-600 "
                            onClick={() => setIsOpenMaping(false)}
                        >X</span>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                                    role.isActive  && <option key={index} value={`${role._id}`}>{role.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            {
                                !errors.component ? (
                                    <label
                                        htmlFor="component"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Component
                                    </label>

                                ) : (

                                    <label
                                        htmlFor="component"
                                        className="block text-sm font-medium text-red-700"
                                    >
                                        {`${errors.component?.message}`}
                                    </label>
                                )
                            }

                            <select
                                type="text"
                                {...register("component",
                                    {
                                        required: "Component is required",
                                    })}
                                id="component"
                                name="component"
                                defaultValue={''}
                                className={`text-gray-700 block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-gray-400 focus:border-gray-600 ${errors.role
                                    ? " border-red-400"
                                    : " border-gray-400"
                                    }`}
                            >
                                <option value='' disabled > Enter compoment </option>
                                {components.map((component, index) => (
                                    component.isActive && <option key={index} value={`${component._id}`}>{component.name}</option>
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
        </>
    )
}