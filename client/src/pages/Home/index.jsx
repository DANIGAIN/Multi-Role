import { useState } from "react";
import DefaultLayout from "../../compoments/DefaultLayout";

const Home = () => {
    return (
        <>
            <DefaultLayout>
                <div className="flex  justify-center items-center">
                    <p className="text-black font-serif text-lg"> welcome to my app</p>
                </div>
            </DefaultLayout>
        </>
    )
}

export default Home; 