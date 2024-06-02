import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const Profile = () => {
    const { id } = useParams();
    const [permission, setPermission] = useState([]);
    const getUser = async () => {
        const res = await axios.get(`/users/${id}`);
        if (res.data.success) {
            const info = await axios.get(res.data.data.links.permission)
            setPermission(info.data.data);
        }
    }
    useEffect(() => {
        getUser()
    }, [])


    return (
        <div className="bg-gray-300 h-screen">
            <div className="flex flex-col space-x-5">
                <p className="flex  justify-center font-serif text-2xl h-10 text-center">User permission</p>
                <hr />
                <div  className="h-screen flex flex-col space-y-50">
                    {permission.map((data, ind) => (
                        <div key={ind} className="flex gap-40 justify-center p-5">
                            <span className="text-xl">{ind + 1} .</span>
                            <span className="text-xl">{data?.role.name}</span>
                            <span>{data?.component.name}</span>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    )

}
export default Profile;