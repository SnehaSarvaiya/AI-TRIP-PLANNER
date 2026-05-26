import { Button } from '../../../components/ui/button';
import React, { useEffect, useState } from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '../../../service/GlobalPhoto';
function PlaceCardItem({ place }) {
    const [photoUrl, setPhotoUrl] = useState();
    useEffect(() => {
        place && getPlacePhoto();
    }, [place])

    const getPlacePhoto = async () => {
        const data = {
            textQuery: place.placeName
        };
        const result = await GetPlaceDetails(data);
        console.log(result.data.places[0].photos[3].name)
        const photoUrl = PHOTO_REF_URL.replace('{NAME}', result.data.places[0].photos[3].name);
        setPhotoUrl(photoUrl);

    }

    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.placeName} target="_blank">
            <div className='border rounded-xl p-3 flex gap-10 mt-2 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
                <img src={photoUrl}
                    className='w-[130px] h-[130px] rounded-xl object-cover' />
                <div>
                    <h2 className='font-bold'>{place.placeName}</h2>
                    <p className='text-xs text-gray-500 p-1 shadow m-1'>{place.placeDetails}</p>
                    <h2 className='font-bold text-sm'>🎫Ticket Price:{place?.ticketPricing}</h2>
                    <Button><FaMapLocationDot /></Button>
                </div>
            </div>
        </Link>
    )
}

export default PlaceCardItem