import { useContext } from 'react';
import { ImProfile } from "react-icons/im";
import axios from 'axios'
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context';
import toast from 'react-hot-toast';
function Header() {
  const { user, setUser, permission, setPermission, } = useContext(GlobalContext);
  const handleLogout = async () => {
    try {
      const res = await axios.delete(`/users/logout/${user._id}`);
      if (res.data.success) {
        setUser((prev) => ({ ...prev, isLogin: false }));
        setPermission([])
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <div className='text-white pr-3 text-xl '>

              <ImProfile />
            </div>
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              CMS
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            {user.isLogin ?
              <button
                onClick={() => handleLogout()}
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Log Out
              </button> :
              <Link
                to="/login"
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Log in
              </Link>
            }


          </div>
          <div
            className={`hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {
                permission.map((data, index) => (
                  <div key={index}>
                    {
                      data.role._id == user.roleId && data.component.isActive ?(
                        <li>
                          <Link
                            to={`${data.component.name}`}
                            className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                          >
                            {data.component.name}
                          </Link>
                        </li>
                      ) : null
                    }

                  </div>
                ))
              }

              {!permission.length ? (

                <>
                  <li>
                    <Link
                      to="/"
                      className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                      aria-current="page"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className="block py-2 pr-4  text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      About
                    </Link>
                  </li>
                </>
              ) : null
              }

            </ul>
          </div>
        </div>
      </nav>
    </header>


  )
}

export default Header;