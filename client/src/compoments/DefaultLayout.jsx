import Header from "./Header";
import { Outlet } from "react-router-dom";

const DefaultLayout = ({ children }) => {
    return (
        <>
            <div className="bg-gray-200 h-screen">
                <Header/>
                <Outlet/>
            </div>
        </>
    )
}
export default DefaultLayout;