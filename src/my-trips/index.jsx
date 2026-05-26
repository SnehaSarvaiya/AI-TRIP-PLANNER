import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom';
import { db } from '../service/firebaseConfig';
import MyTripsCardItem from './components/MyTripsCardItem';

function MyTrips() {
    const [userTrips, setUserTrips] = useState([]);
    useEffect(() => {
        GetUserTrips();
    }, [])
    const navigation = useNavigation();

    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (!user) {
            navigation = ('/')
            return;
        }
        const q = query(collection(db, "AITrips"), where("userEmail", "==", user?.email));
        const querySnapshot = await getDocs(q);
         setUserTrips([]);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data())

            setUserTrips(prevValue => [...prevValue, doc.data()]);
        });

    }
    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            <div className='font-lg font-bold text-2xl'>My Trips</div>
            <div className='grid grid-cols-2 md:grid-cols-3 mt-5 gap-5'>
                {userTrips.map((trip,index)=>(
                    <MyTripsCardItem trip ={trip}/>
                ))}
            </div>
     
        </div>
     

        
    )
}

export default MyTrips