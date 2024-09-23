import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

    const [method, setMethod] = useState("cod")
    const { navigate, backendUrl, token,
        cartItems, setCartItems, getCartAmount,
        delivery_fee, products } = useContext(ShopContext)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (e) => {
        const name = e.target.name
        const value = e.target.value

        setFormData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {

            let orderItems = []

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo =
                            structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }

            switch (method) {
                //Api call for COD
                case "cod":
                    const res = await axios.post(backendUrl + "/api/order/place",
                        orderData, { headers: { token } })
                    if (res.data.success) {
                        setCartItems({})
                        navigate('/order')
                    } else {
                        toast.error(res.data.message)
                    }
                    break;
                case "stripe":
                    const resStripe = await axios.post(backendUrl + '/api/order/stripe',
                        orderData, { headers: { token } }
                    )
                    if (resStripe.data.success) {
                        const { session_url } = resStripe.data
                        window.location.replace(session_url)
                    } else {
                        toast.error(resStripe.data.message)
                    }
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between 
        gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            {/*Left side */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>
                <div className='flex gap-3'>
                    <input required className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                        type="text" placeholder='First name'
                        onChange={onChangeHandler} name='firstName' value={formData.firstName} />
                    <input required className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                        type="text" placeholder='Last name'
                        onChange={onChangeHandler} name='lastName' value={formData.lastName} />
                </div>
                <input required className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                    type="email" placeholder='Email address'
                    onChange={onChangeHandler} name='email' value={formData.email} />
                <input required className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                    type="text" placeholder='Street'
                    onChange={onChangeHandler} name='street' value={formData.street} />
                <div required className='flex gap-3'>
                    <input required className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                        type="text" placeholder='City'
                        onChange={onChangeHandler} name='city' value={formData.city} />
                    <input required className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                        type="text" placeholder='State'
                        onChange={onChangeHandler} name='state' value={formData.state} />
                </div>
                <div className='flex gap-3'>
                    <input required className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                        type="number" placeholder='Zipcode'
                        onChange={onChangeHandler} name='zipcode' value={formData.zipcode} />
                    <input required className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                        type="text" placeholder='Country'
                        onChange={onChangeHandler} name='country' value={formData.country} />
                </div>
                <input required className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                    type="number" placeholder='Phone'
                    onChange={onChangeHandler} name='phone' value={formData.phone} />
            </div>

            {/*Right side */}
            <div className='mt-8'>
                <div className='mt-8 min-w-80'>
                    <CartTotal />
                </div>
                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                    {/*Payment Method */}
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
                        </div>
                        <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
                        </div>
                        <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                        </div>
                    </div>
                    <div className='w-full text-end mt-8'>
                        <button type='submit'
                            className='bg-black text-white px-16 py-3 text-sm'>
                            PLACE ORDER
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder
