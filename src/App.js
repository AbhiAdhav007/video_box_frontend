
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserAccount from "./components/userAccount";
import Login from './components/login';
import Signup from './components/SignUp';
import UserVideos from './components/userVideos';
import { Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import AuthProvider from './context/AuthContext';
import UserList from './components/ListingPage';
import Home from './components/Home';


const App = () => {

  
  return (
    <>
    <AuthProvider>
        <Router>
            <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/signup" element={<Signup/>} />
              <Route path="/account" element={<PrivateRoute><UserAccount/></PrivateRoute>} />
              <Route path="/video_listing" element={<UserList/>} />
              <Route path="/user_videos/:first_name/:user_id" element={<UserVideos />} />
              <Route path="/" element={<Home/>} />
            </Routes>
        </Router>
      </AuthProvider>
    </>
  );
};

export default App;
