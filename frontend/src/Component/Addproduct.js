import React, { useState } from 'react'
import axios from 'axios';
import productimage from '../Image/download.png'
import { UserData } from './Auth';
export default function Addproduct() {
    const [pname, setPname] = useState('');
    const [flag, setFlag] = useState('');
    const [pprice, setPprice] = useState('');
    const [pcategory, setPcategory] = useState('');
    const [pcompany, setPcomapny] = useState('');
    const [pimage, setPimage] = useState(productimage);
    const addProduct = async (e) => {
        e.preventDefault();
        if (!pname || !pprice || !pcompany || !pcategory) {
            setFlag(true);
            return;
        }
        try {
            const product = { name: pname, price: pprice, categoty: pcategory, userid: UserData()._id, company: pcompany, image: pimage }
            await axios.post('http://localhost:4000/add-product', product, { headers: { 'Content-Type': 'multipart/form-data' } })
            setPname(''); setPprice(''); setPcomapny(''); setPcategory('');
            alert("Add Product");
            setFlag(false);
        } catch (error) {
            alert(error);
        }

    }
    return (
        <div>
            <div className='text-center d-flex justify-content-center mt-4'>
                <div className="card shadow p-2" style={{ width: "30rem" }}>
                    <h2>Add Product</h2>
                    <div className="card-body">
                        <form onSubmit={addProduct}>
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
                                <label htmlFor="image"><img src={pimage} alt="image" style={{ height: "150px", width: "200px" }} /></label>
                                <input type="file" onChange={(e) => setPimage(URL.createObjectURL(e.target.files[0]))} className="form-control" id="image" name='image' style={{ display: "none" }} />
                                {flag && !pimage ? <div className='text-start text-danger'>
                                    Please Upload the Product Image

                                </div> : ''}


                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}