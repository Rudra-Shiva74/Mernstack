import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { UserData, api_key } from './Auth';
import { useParams, useNavigate } from 'react-router-dom'
export default function UpdateProduct() {
    const [pname, setPname] = useState('');
    const [flag, setFlag] = useState('');
    const [pprice, setPprice] = useState('');
    const [pcategory, setPcategory] = useState('');
    const [pcompany, setPcomapny] = useState('');
    const navigate = useNavigate();
    const param = useParams();

    const updateProduct = async (e) => {
        e.preventDefault();
        if (!pname || !pprice || !pcompany || !pcategory) {
            setFlag(true);
            return;
        }
        try {
            const product = { name: pname, price: pprice, categoty: pcategory, userid: UserData()._id, company: pcompany }
            await axios.put(`http://localhost:4000/product/${param.id}`, product, { headers: { Authorization: UserData().token } })
            alert("Update Product");
            navigate('/product')
        } catch (error) {
            alert(error);
        }
    }
    const getDateProduct = async () => {
        const res = await axios.get(`http://localhost:4000/product/${param.id}`, { headers: { Authorization: UserData().token } })
        console.log(res);
        if (!res.data) {
            navigate('/product')
        }
        setPname(res.data.name)
        setPcomapny(res.data.company)
        setPcategory(res.data.categoty)
        setPprice(res.data.price)
    }
    useEffect(() => {
        getDateProduct();
        api_key();
    }, [])
    return (
        <div>
            <div className='text-center d-flex justify-content-center mt-4'>
                <div className="card shadow p-2" style={{ width: "30rem" }}>
                    <h2>Update Product</h2>
                    <div className="card-body">
                        <form onSubmit={updateProduct}>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="pname" name='pname' value={pname} onChange={(e) => setPname(e.target.value)} placeholder="Enter Product Name" autoComplete='off' />
                                {flag && !pname ? <div className='text-start text-danger'>
                                    Please Enter Product Name
                                </div> : ''}
                            </div>
                            <div className="mb-3">
                                <input type="number" className="form-control" id="price" name='price' value={pprice} onChange={(e) => setPprice(e.target.value)} placeholder="Enter Product Price" autoComplete='off' />
                                {flag && !pprice ? <div className='text-start text-danger'>
                                    Please Enter Product Price
                                </div> : ''}
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="categoty" name='categoty' value={pcategory} onChange={(e) => setPcategory(e.target.value)} placeholder="Enter Product Category" autoComplete='off' />
                                {flag && !pcategory ? <div className='text-start text-danger'>
                                    Please Enter Product Category
                                </div> : ''}
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="campany" name='campany' value={pcompany} onChange={(e) => setPcomapny(e.target.value)} placeholder="Enter Campany Name" />
                                {flag && !pcompany ? <div className='text-start text-danger'>
                                    Please Enter Product Company
                                </div> : ''}
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
