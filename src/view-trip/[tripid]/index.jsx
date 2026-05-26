import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc, getDocFromCache } from "firebase/firestore";
import { db } from '../../service/firebaseConfig';
import InfoSection from './InfoSection';
import Hotels from './components/Hotels';
import PlaceToVisit from './components/PlaceToVisit';

function ViewTrip() {
    const { tripid } = useParams()
    const [trip, setTrip] = useState()
    useEffect(() => {
        tripid && onGetTripData();
    }, [tripid])

    const onGetTripData = async () => {
        const docRef = doc(db, "AITrips", "docId");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setTrip(docSnap.data())
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }

    }
    return (
        <>
            {/* Info Section */}
            <div className='p-10 md:px-20 lg:px-44 xl:px-56'> 
                <InfoSection trip={trip} />
                </div>
            {/* Recommended Hotel */}
            <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
                 <Hotels trip ={trip} />
            </div>
           
            {/* Daily Plan */}
            <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            <PlaceToVisit trip ={trip}/>
            </div>
            
            {/* Footer */}
        </>
    )
}

export default ViewTrip