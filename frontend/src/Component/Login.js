import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { isLoggedIn } from './Auth';
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/');
        }
    }, [])
    const submitform = async (e) => {
        e.preventDefault();
        const user = { email, password };
        const res = await axios.post('http://localhost:4000/login', user, { headers: { 'Content-Type': 'application/json' } })
        if (res.status === 200) {
            alert('LoggedIn');
            localStorage.setItem("user", JSON.stringify(res.data));
            navigate('/');
        } else {
            alert(res.data.result);
        }
    }
    return (
        <div>
            <div className='text-center d-flex justify-content-center mt-4'>
                <div className="card shadow p-2" style={{ width: "30rem" }}>
                    <h2>Registration</h2>
                    <div className="card-body">
                        <form onSubmit={submitform}>
                            <div className="mb-3">
                                <input type="email" className="form-control" id="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email Id" autoComplete='off' />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" id="password" name='pass' value={password} onChange={(e) => setPass(e.target.value)} placeholder="Enter Password" />
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
