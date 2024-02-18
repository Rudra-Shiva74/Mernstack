import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { UserData } from './Auth';
export default function Product() {
    const [product, setProduct] = useState([]);
    const getProduct = async () => {
        try {
            const res = await axios.get('http://localhost:4000/product-list', {
                headers: {
                    Authorization: UserData().token
                }
            });
            setProduct(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    const deleteProduct = async (pid) => {
        const res = await axios.delete(`http://localhost:4000/product/${pid}`, {
            headers: {
                Authorization: UserData().token
            }
        });
        if (res.data.acknowledged) {
            alert("deleted");
            getProduct();
        }
    }
    const Action = (n) => {
        if (n === 1) alert("You Don't Have Access to Delete");
        else alert("You Don't Have Access to Edit");
    }
    useEffect(() => {
        getProduct();
    }, [])

    const searchProductLive = async (value) => {
        try {
            const res = await axios.get(`http://localhost:4000/search/${value}`, {
                headers: {
                    Authorization: UserData().token
                }
            });
            setProduct(res.data);
        } catch (error) {
            getProduct();
        }

    }
    return (
        <><input type="text" className='control' onChange={(e) => searchProductLive(e.target.value)} placeholder='Search Your Product' />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Categoty</th>
                        <th scope="col">Company</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {product && product.map((Element, index) => {
                        return (

                            <tr key={Element._id} >
                                <th className={UserData()._id === Element.userid ? 'text-danger' : ''}>{++index}</th>
                                <th className={UserData()._id === Element.userid ? 'text-danger' : ''} scope="row">{Element.name}</th>
                                <td className={UserData()._id === Element.userid ? 'text-danger' : ''}>{Element.price}</td>
                                <td className={UserData()._id === Element.userid ? 'text-danger' : ''}>{Element.categoty}</td>
                                <td className={UserData()._id === Element.userid ? 'text-danger' : ''}>{Element.company}</td>
                                {
                                    UserData()._id === Element.userid ?
                                        <td><i className="fa-solid fa-trash" onClick={() => deleteProduct(Element._id)} style={{ cursor: 'pointer' }}></i>{ } <Link to={`/updateproduct/${Element._id}`}><i className="fa-solid fa-pen-to-square" style={{ cursor: 'pointer' }}></i></Link></td> : <td><i className="fa-solid fa-trash" onClick={() => Action(1)} style={{ cursor: 'pointer' }}></i> { } <i className="fa-solid fa-pen-to-square" onClick={() => Action(2)} style={{ cursor: 'pointer' }}></i></td>
                                }
                            </tr>
                        )
                    })}

                </tbody>
            </table ></>
    )
}
