import { useNavigate } from 'react-router-dom';
const Home = ()=>{
    const navigate = useNavigate();
    return (
        <>
        <div className='container'>
            <h4><button className="btn btn-link mt-3" onClick={()=>{navigate(`/video_listing`)}}>
                    View All Videos
            </button></h4>
            <h4><button className="btn btn-link mt-3" onClick={()=>{navigate(`/login`)}}>
                    Login
            </button></h4>
            <h4><button className="btn btn-link mt-3" onClick={()=>{navigate(`/signup`)}}>
                    Sign Up
            </button></h4>
            <h4><button className="btn btn-link mt-3" onClick={()=>{navigate(`/account`)}}>
                    User Account
            </button></h4>
        </div>
        </>
    )
}

export default Home;