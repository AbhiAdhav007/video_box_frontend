import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert  from 'react-bootstrap/Alert';
import { BACKEND_URI } from '../config/constants';

const Signup = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [mobile_number, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState(null);
    const [alertType, setAlertType] = useState('success');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(first_name , last_name , mobile_number , email);
            const {data} = await axios.post(`${BACKEND_URI}/api/user/sign_up`, { first_name, last_name , mobile_number , email });
            console.log(data);
            if(data.status && data.status === 'success'){
                setAlertType('success');
                setAlertMessage(`Register Successful use Password to login [ ${data.user.password} ] Redirecting to login...`);
                setTimeout(() => {
                    navigate('/login');
                }, 5000);
            }else{
                setAlertType('danger');
                setAlertMessage(data.msg);
            }
        } catch (error) {
            console.error('Error signing up', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Signup</h2>
            {alertMessage && (
                <Alert variant={alertType} onClose={() => setAlertMessage(null)} dismissible>
                    {alertMessage}
                </Alert>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="first_name"
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="last_name"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mobile_number">Mobile Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="mobile_number"
                        value={mobile_number}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        required
                    />
                </div>
                <br/>
                <button type="submit" className="btn btn-primary">Signup</button>
                <br/>
                <button className="btn btn-link mt-3" onClick={() => navigate('/login')}>
                    Already have an account? Login here.
                </button>
            </form>
        </div>
    );
};

export default Signup;
