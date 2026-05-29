import React, { useEffect, useState } from 'react'
import { GetPlaceDetails, PHOTO_REF_URL } from '../../service/GlobalPhoto';
import { Link } from 'react-router-dom';

function MyTripsCardItem({ trip }) {
    const [photoUrl, setPhotoUrl] = useState();
    useEffect(() => {
        trip && getPlacePhoto();
    }, [trip])

    const getPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        };
        const result = await GetPlaceDetails(data);
        console.log(result.data.places[0].photos[3].name)
        const photoUrl = PHOTO_REF_URL.replace('{NAME}', result.data.places[0].photos[3].name);
        setPhotoUrl(photoUrl);

    }
    return (
        <Link to ={'/view-trip/'+trip?.id}>
        <div className='hover:scale-105 transition-all hover:shadow-md'>
            <img src={photoUrl?photoUrl:"/place.jpg"} className='object-cover w-full h-[300px] rounded-2xl' />
            <div className='mt-2 p-2'>
                <h2 className='font-bold text-xl'> {trip?.userSelection?.location?.label}</h2>
                <div className='text-xs font-medium'>{trip?.userSelection?.NoOfDays} Days trip in  {trip?.userSelection?.budget} budget for {trip?.userSelection?.travelers} </div>
            </div>
        </div>
       </Link> 
    )
}

export default MyTripsCardItem