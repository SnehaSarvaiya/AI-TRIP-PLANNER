import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "../ui/button"
function Hero() {
    return (
        <div className=" flex flex-col items-center mx-56 gap-9">
            <h1 className='font-extrabold text-center text-[45px] mt-16 '>
                <span className='text-red-500'>Discover Your Next Adventure with AI:</span> <br />Personalized Itineraries at Your Fingertips
            </h1>
            <p className='text-center text-shadow-black text-xl'>
                Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
            </p>
            <Link to={"/create-trip"}>
                <Button >
                    Get Started, It's Free
                </Button>
            </Link>
        </div>
    )


}

export default Hero