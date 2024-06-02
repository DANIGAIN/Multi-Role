import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Users from './pages/Users';
import Modal from 'react-modal';
import Profile from './pages/Profile';
import PrivateRoute from './routes/ProvateRoute';
Modal.setAppElement('#root');

function App() {
  axios.defaults.baseURL = 'http://localhost:8000/api/v1';
  axios.defaults.withCredentials = true;

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route element={<PrivateRoute/>}>
           <Route path='/users' element={<Users/>}/>
           <Route path='/users/:id' element={<Profile/>}/>
        </Route>
      </Routes>
      <Toaster/>
    </div>
      
  )
}
export default App;
