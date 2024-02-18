import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from './Auth';
export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [cpass, setCpass] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/');
        }
    }, [])
    const submitform = async (e) => {
        e.preventDefault();
        if (cpass === password) {
            const user = { name, email, password };
            const res = await axios.post('http://localhost:4000/register', user, { headers: { 'Content-Type': 'application/json' } });
            if (res.status === 200) {
                setName(''); setEmail(''); setPass(''); setCpass('');
                alert(res.data);
                navigate('/login');
            }
            else {
                alert("User Already Exist");
            }
        }
        else {
            alert("Wrong password");
        }
    }
    return (
        <div className='text-center d-flex justify-content-center mt-4'>
            <div className="card shadow p-2" style={{ width: "30rem" }}>
                <h2>Registration</h2>
                <div className="card-body">
                    <form onSubmit={submitform}>
                        <div className="mb-3">
                            <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} name='name' placeholder="Enter Your Name" autoComplete='off' />
                        </div>
                        <div className="mb-3">
                            <input type="email" className="form-control" id="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email Id" autoComplete='off' />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" id="password" name='pass' value={password} onChange={(e) => setPass(e.target.value)} placeholder="Enter Password" />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" id="cpassword" name='cpass' value={cpass} onChange={(e) => setCpass(e.target.value)} placeholder="Enter Confirm Password" />
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
