import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetPlaceDetails, PHOTO_REF_URL } from '../../../service/GlobalPhoto';

function HotelCardItem({ hotel }) {
    const [photoUrl, setPhotoUrl] = useState();
    useEffect(() => {
        hotel && getPlacePhoto();
    }, [hotel])

    const getPlacePhoto = async () => {
        const data = {
            textQuery: hotel?.hotelName
        };
        const result = await GetPlaceDetails(data);
        console.log(result.data.places[0].photos[3].name)
        const photoUrl = PHOTO_REF_URL.replace('{NAME}', result.data.places[0].photos[3].name);
        setPhotoUrl(photoUrl);

    }
    return (
        <div><Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + "," + hotel?.hotelAddress} target="_blank">
            <div className='hover:scale-110 transition-all cursor-pointer'>
                <img src={photoUrl} className='rounded-xl object-cover w-full h-[200px]' />
                <div className='flex flex-col gap-2'>
                    <h2 className='font-medium'>{hotel?.hotelName}</h2>
                    <h2 className='text-xs text-gray-500'>📍{hotel?.hotelAddress}</h2>
                    <h2 className='text-sm'>💲{hotel?.price}</h2>
                    <h2 className='text-sm'>⭐{hotel?.rating}</h2>
                    <p className='p-1 text-xs text-gray-400'>{hotel?.description}</p>
                </div>
            </div>
        </Link></div>
    )
}

export default HotelCardItem