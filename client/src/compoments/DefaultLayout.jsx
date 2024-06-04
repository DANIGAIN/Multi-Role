import Header from "./Header";

const DefaultLayout = ({ children }) => {
    return (
        <>
            <div className="bg-gray-200 h-screen">
                <Header/>
                {children}
            </div>
        </>
    )
}
export default DefaultLayout;