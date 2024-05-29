import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ComponentModal(props) {
    const [isLoading, setIsLoading] = useState(false);
    const { req, setIsOpenComponent, components, setComponents, component } = props;
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: component ? {
          name: component.name,
          isActive: component.isActive,
        } : {}
      });


    const onSubmit = async(data) => {
        setIsLoading(true)
        try{  
            if(req === 'create'){
                const res = await axios.post('/components', data);
                if(res.data.success){
                    setComponents([res.data.data, ...components])
                    toast.success(res.data?.message);
                }
            }else if(req === 'update'){
                const res = await axios.put(`/components/${component._id}`, data);
                if(res.data.success){
                    const filderCom= components.filter((data)=> data._id !== component._id); 
                    data._id = component._id;
                    setComponents([data , ...filderCom]);
                    toast.success(res.data?.message);
                }
            }
            reset()
            setIsOpenComponent(false)
        
        }catch(error){
           console.log(error);
           setIsLoading(false)
        }finally{
            setIsLoading(false)
        }
    
    }
  
    return (
        <> 
            <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex flex-row">
                        <p className="text-xl font-medium mb-4">{req} component</p>
                        <span className="text-lg  pl-40 hover:text-red-600 "
                           onClick={()=> setIsOpenComponent(false)}
                        >X</span>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            {
                                !errors.name ? (
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Name
                                    </label>

                                ) : (

                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-red-700"
                                    >
                                        {`${errors.name?.message}`}
                                    </label>
                                )
                            }

                            <input
                                type="text"
                                {...register("name",
                                    {
                                        required: "Name is required"
                                    })}
                                id="name"
                                name="name"
                                placeholder='Enter your name'
                                className={`text-gray-700 block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-gray-400 focus:border-gray-600 ${errors.email
                                    ? " border-red-400"
                                    : " border-gray-400"
                                    }`}
                            />
                        </div>
                        <div>
                            <input
                                id="checkbox"
                                type="checkbox"
                                {
                                    ...register('isActive')
                                }
                                name="isActive"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="checkbox" className="ms-2 text-sm font-medium text-gray-600 ">Make sure role is active or not</label>
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

                </div>
            </div>
        </>
    )
}