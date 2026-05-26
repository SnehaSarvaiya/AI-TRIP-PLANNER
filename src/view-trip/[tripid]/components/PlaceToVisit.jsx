import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlaceToVisit({ trip }) {
    return (
        <div>
            <h2 className='font-bold text-lg'>Places To Visit</h2>
            <div className='mt-5' >
                {trip?.tripData?.itinerary.map((item, index) => (
                    <div >
                        <h2 className='font-bold text-sm' >Day {item?.day}</h2>
                        <div className='grid md:grid-cols-2 gap-5'>
                            {item.places.map((place, index) => (
                            <div>
                           <h2 className='text-sm text-orange-600'>⌚{place.bestTimeToVisit} -- <span className='text-xs text-gray-900'>{place.timeTravel}</span></h2>
                                <PlaceCardItem place={place} />
                            </div>
                        ))}
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlaceToVisit