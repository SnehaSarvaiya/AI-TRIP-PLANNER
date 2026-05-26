import React from 'react'
import { useState, useEffect } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete-next'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { SelectBudgetOptions, SelectTravelsList } from '../constants/options'
import { toast } from "sonner"
import { generateAITrip, initialPrompt } from '../service/AIModels'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../service/firebaseConfig'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom'

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  }
  useEffect(() => {
    console.log("formData:", formData);
  }, [formData])
  const logIn = useGoogleLogin({
    onSuccess: credentialResponse => {
      getUserProfile(credentialResponse);
    },
    onError: () => {
      console.log('Login Failed');
    },
  })

  const onGenerateTrip = async () => {

    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return
    }
    if (!formData.location || !formData.NoOfDays || !formData.budget || !formData.travelers) {
      toast.error("Please fill in all the fields before generating the trip.");
      return;
    }
    setLoading(true)
    const FinalPrompt = initialPrompt
      .replace("{location}", formData?.location?.label)
      .replace("{totalDays}", formData?.NoOfDays)
      .replace("{budget}", formData?.budget)
      .replace("{traveler}", formData?.travelers)
      .replace(' {totalDays} ', formData?.NoOfDays) // Replacing the second occurrence of {totalDays}
    console.log("FinalPrompt:", FinalPrompt);
    try {
      const result = await generateAITrip(FinalPrompt, false);
      console.log("__", result);
      setLoading(false)
      saveTrip(result);
    }catch (error) {
      console.error("Error generating trip:", error);
      toast.error("An error occurred while generating the trip. Please try again.");
      setLoading(false);
    }
    
  }
  const saveTrip = async (TripData) => {
    setLoading(true)
    const user = JSON.parse(localStorage.getItem('user'))
    const docId = Date.now().toString()
    await setDoc(doc(db, "AITrips", "docId"), {
      userSelection: formData,
      tripData: (TripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false)
    navigate('/view-trip/' + docId)
  }
  const getUserProfile = (tokenInfo) => {

    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers:
      {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      onGenerateTrip();
    });
  }
  return (
    <div className='ps-30  gap-8 p-10 md:px-20 lg:px-44 xl:px-56 '>
      <div className='pl-10 flex flex-col gap-4 ps-10 mt-10 '>
        <h1 className='font-extrabold text-[30px] text-black'>Tell us your travel preferences 🏕️🌴</h1>
        <p className='items-center mr-60 text-lg text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
      </div>
      <div className='mt-10 ps-10 mr-100 gap-4 flex flex-col ml-5'>
        <h2 className='font-medium text-black text-2xl'>What is destination of choice?</h2>
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
          selectProps={{
            place,
            onChange: (v) => {
              setPlace(v);
              handleInputChange("location", v);
            }
          }}
        />
      </div>
      <div className='mt-10 ps-10 mr-100 gap-4 flex flex-col ml-5'>
        <h2 className='font-medium text-black text-2xl'>How many days are you planning?</h2>
        <Input
          placeholder={"EX. 3"}
          type="number"
          onChange={(e) => handleInputChange("NoOfDays", parseInt(e.target.value))}
        />
      </div>
      <div className='mt-10 mr-100 ps-10  gap-4 ml-5 '>
        <h2 className='font-medium text-black text-2xl'>What is your Budget?</h2>
        <div className='grid grid-cols-3 gap-4 mt-4  text-xl text-extrabold'>
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border rounded-lg hover:bg-gray-100 cursor-pointer gap-3
               ${formData?.budget === item.title && "shadow-lg border-black"}`}>
              <h2 className='text-2xl font-bold mb-2'>{item.icon}</h2>
              <h2 className='font-bold'>{item.title}</h2>
              <h2 className='text-gray-600 text-sm'>{item.desc}</h2>
            </div>
          )
          )}
        </div>

      </div>
      <div className='mt-10 ps-10 mr-100 gap-4 flex flex-col ml-5'>
        <h2 className='font-medium text-black text-2xl'>Who do you plan on traveling with on your next adventure?</h2>
        <div className='grid grid-cols-4 gap-4 mt-4 text-xl text-extrabold '>
          {SelectTravelsList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("travelers", item.people)}
              className={`p-4 border rounded-lg hover:bg-gray-100 cursor-pointer gap-3
               ${formData?.travelers === item.people && "shadow-lg border-black"}`}>
              <h2 className='text-2xl font-bold mb-2'>{item.icon}</h2>
              <h2 className='font-bold'>{item.title}</h2>
              < h2 className='text-gray-600 font-medium text-md'>{item.people}</h2>
              <h2 className='text-gray-500 text-sm'>{item.desc}</h2>
            </div>
          )
          )}
        </div>
      </div>
      <div className=' flex justify-end mt-10 ps-10 mr-100 ml-5 mb-20'>
        <Button
          disabled={loading}
          className='px-6 py-3 w-medium'
          onClick={onGenerateTrip} >

          {loading ?
            <AiOutlineLoading3Quarters className=' h-7 w-7 animate-spin' /> :
            "Generate Trip"
          }
        </Button>
        <Dialog>
          <DialogTrigger></DialogTrigger>
          <DialogContent>
            <DialogHeader className="flex flex-col justify-center ">
              <DialogTitle className='mt-4'>
                <img src="./logo.svg" />

                Sign In With Google

              </DialogTitle>
              <DialogDescription className="text-gray-600">
                To generate the trip, please sign in with Google securely.
                <Button
                  onClick={logIn} className="w-full mt-4" >

                  <FcGoogle className='h-10 w-10' />

                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>


      </div>
    </div>
  )
}

export default CreateTrip