// import { useNavigate } from 'react-router-dom';
import '../styles/Home.css'
import Navbar from './NavBar';
const Home = ()=>{
    // const navigate = useNavigate();
    return (
        <>
         <Navbar />
        <div className="home-content">
            <h1>Project Name: Video Box</h1>
            <p>Host Name: Abhishek Adhav</p>
            <p>Email: abhishekadhav7449@gmail.com</p>
        </div>
        </>
    )
}

export default Home;