import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets.js'

const Order = ({ token }) => {

    const [order, setOrder] = useState([])

    const fetchAllOrder = async () => {
        if (!token) {
            return null
        }
        try {
            const res = await axios.post(backendUrl + '/api/order/list',
                {}, { headers: { token } })
            console.log(res.data);

            if (res.data.success) {
                setOrder(res.data.order.reverse())
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const statusHandler = async (e, orderId) => {
        try {
            const res = await axios.post(backendUrl + '/api/order/status',
                { orderId, status: e.target.value }, { headers: { token } })

            if (res.data.success) {
                await fetchAllOrder()
            }
        } catch (error) {
            console.log(error);
            toast.error(res.data.message)
        }
    }

    useEffect(() => {
        fetchAllOrder()
    }, [token])


    return (
        <div>
            <h3>Order Page</h3>
            <div>
                {
                    order.map((order, index) => (
                        <div key={index}
                            className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr]
                        lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 border-2 items-start
                        border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm
                        text-gray-700'>
                            <img src={assets.parcel_icon} className='w-12' />
                            <div>
                                <div>
                                    {
                                        order.items.map((item, index) => {
                                            if (index === order.items.length - 1) {
                                                return <p key={index}
                                                    className='py-0.5'>
                                                    {item.name} x {item.quantity}
                                                    <span>{item.size}</span>
                                                </p>
                                            } else {
                                                return <p key={index}
                                                    className='py-0.5'>
                                                    {item.name} x {item.quantity}
                                                    <span>{item.size}</span> ,
                                                </p>
                                            }
                                        })
                                    }
                                </div>
                                <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                                <div>
                                    <p>
                                        {order.address.street + ", "}
                                    </p>
                                    <p>
                                        {order.address.city + ", " + order.address.state + ", "
                                            + order.address.country + ", " + order.address.zipcode}
                                    </p>
                                </div>
                                <p>{order.address.phone}</p>
                            </div>
                            <div>
                                <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
                                <p className='mt-3'>Method: {order.paymentMethod}</p>
                                <p>Payment: {order.payment ? "Done" : "Pending"}</p>
                                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                            </div>
                            <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
                            <select onChange={(e) => statusHandler(e, order._id)} value={order.status} className='p-2 font-semibold'>
                                <option value="OrderPlaced">OrderPlaced</option>
                                <option value="Packing">Packing</option>
                                <option value="Ship">Ship</option>
                                <option value="Out for delivery">Out for delivery</option>
                                <option value="Delivery">Delivery</option>
                            </select>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Order
