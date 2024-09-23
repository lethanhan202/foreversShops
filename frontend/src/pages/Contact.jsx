import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
const Contact = () => {
    return (
        <div>
            <div className='text-center text-2xl pt-10 border-t'>
                <Title text1={'CONTACT'} text2={'US'} />
            </div>

            <div className='my-10 flex flex-col md:flex-row justify-center gap-10 mb-28'>
                <img className='w-full md:max-w-[480px]' src={assets.contact_img} />
                <div className='flex flex-col justify-center items-start gap-6'>
                    <p className='font-semibold text-xl text-gray-600'>Our Store</p>
                    <p className='text-gray-500'>ABC Street <br /> Texas, USA</p>
                    <p className='text-gray-500'>Tel: (555) 666-1235 <br /> Email: forever@.com</p>
                    <p className='font-semibold text-xl text-gray-600'>Careers forever</p>
                    <p className='text-gray-500'>Learn about jobs and teams</p>
                    <button className='border border-black px-8 py-4 
                    text-sm hover:bg-black hover:text-white 
                    transition-all duration-500'>
                        Explore Jobs
                    </button>
                </div>
            </div>
            <NewsletterBox />
        </div>
    )
}

export default Contact
