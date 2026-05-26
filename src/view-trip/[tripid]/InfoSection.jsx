import { Button } from '#components/ui/button';
import React, { useEffect, useState } from 'react'
import { BsSendFill } from "react-icons/bs";
import { GetPlaceDetails, PHOTO_REF_URL } from '../../service/GlobalPhoto';
function InfoSection({ trip }) {
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
        <>
            <div >
                <img src={photoUrl} alt="place" className='w-full h-[300px] object-cover rounded-4xl' />
                <div className='flex flex-col justify-between  '>
                    <div className='flex my-3 gap-2 justify-between items-center'>
                        <h2 className='font-black text-2xl '>{trip?.userSelection?.location?.label}</h2>
                    </div>
                    <div className='flex gap-4 font-bold text-gray-500 text-sm items-center  '>
                        <h2 className='p-1 px-3 rounded-full bg-gray-300 text-shadow-mauve-500'>📅{trip?.userSelection?.NoOfDays}Days</h2>
                        <h2 className='p-1 px-3 rounded-full bg-gray-300 text-shadow-mauve-500'>💰{trip?.userSelection?.budget}Budget</h2>
                        <h2 className='p-1 px-3 rounded-full bg-gray-300 text-shadow-mauve-500'>🧑🏻‍🤝‍🧑🏻 No. Of Travelers{trip?.userSelection?.travelers}</h2>
                        <div>
                             <Button> <BsSendFill /> </Button>
                        </div>
                       

                    </div>

                </div>

            </div>
        </>

    )
}

export default InfoSection