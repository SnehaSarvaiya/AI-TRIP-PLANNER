import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'
import { PHOTO_REF_URL } from '../../../service/GlobalPhoto';

function Hotels({ trip }) {
    
    return (

        <div className='my-5'>
            <h2 className='font-extrabold text-xl'>Hotels Recommendation</h2>
            <div className=' mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 '>
                {trip?.tripData?.hotels.map((hotel, item) =>
                (
                    <HotelCardItem hotel={hotel}/>
                  ))}

            </div>
        </div>
    )
}

export default Hotels