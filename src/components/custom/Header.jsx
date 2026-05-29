import React, { useEffect, useState } from 'react'
import { Button } from "../ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { FcGoogle } from "react-icons/fc";
import axios from 'axios'

function Header() {
  const [openDialog, setOpenDialog] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    console.log(user)
  }, [])
  const logIn = useGoogleLogin({
    onSuccess: credentialResponse => {
      getUserProfile(credentialResponse);
    },
    onError: () => {
      console.log('Login Failed');
    },
  })
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
      window.location.reload();
    });
  }
  return (
    // <div className='p-2 shadow-sm flex items-center justify-between'>
    //   <img src="/logo.svg" alt="Logo" />
    //   <div className='flex items-center gap-6'>
    //     {user ?
    //       <div className='flex items-center gap-6'>
    //         <Button variant='outline' className="p-4">My Trips</Button>

    //         <Popover>
    //           <PopoverTrigger asChild>
    //             <img src={user?.picture} className='w-15 h-10 rounded-full' />
    //           </PopoverTrigger>
    //           <PopoverContent>
    //             <PopoverHeader>
    //               <PopoverTitle></PopoverTitle>
    //               <PopoverDescription className='font-medium text-xl' > <span className='cursor-pointer shadow' onClick={() => {
    //                 googleLogout();
    //                 localStorage.clear();
    //                 window.location.reload();
    //               }
    //               }>Logout</span></PopoverDescription>
    //             </PopoverHeader>
    //           </PopoverContent>
    //         </Popover>
    //       </div>
    //       :
    //       <Button variant="destructive" onClick={() => setOpenDialog(true)}>
    //         SignIn
    //       </Button>
    //     }
    //   </div>
    //   <Dialog asChild
    //    open={openDialog}>
    //     <DialogTrigger></DialogTrigger>
    //     <DialogContent>
    //       <DialogHeader className="flex flex-col justify-center ">
    //         <DialogTitle className='mt-4'>
    //           <img src="/logo.svg" className='items-end w-7 h-7 rounded-b-full m-2' />
    //           Sign In With Google
    //         </DialogTitle>
    //         <DialogDescription className="text-gray-600">
    //           To generate the trip, please sign in with Google securely.
    //           <Button onClick={logIn} className="w-full mt-4" >
    //             <FcGoogle className='h-10 w-10' />Sign In with Google
    //           </Button>
    //         </DialogDescription>
    //       </DialogHeader>
    //     </DialogContent>
    //   </Dialog>



    // </div>

    <div className='p-2 shadow-sm flex items-center justify-between'>

      {/* Left — Logo */}
      <img src="/logo.svg" alt="Logo" />

      {/* Right — User or SignIn */}
      <div className='flex items-center gap-6'>
        {user ? (
          <>
            <Button variant='outline' className="p-4" onClick={getUserProfile}>My Trips</Button>
            <Popover>
              <PopoverTrigger asChild>
                <img src={user?.picture} className='w-10 h-10 rounded-full cursor-pointer' alt="profile" />
              </PopoverTrigger>
              <PopoverContent>
                <span className='cursor-pointer font-medium text-xl' onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  setUser(null);  // ✅ clears state, no reload needed
                }}>
                  Logout
                </span>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <Button variant="destructive" onClick={() => setOpenDialog(true)}>
            Sign In  {/* ✅ this will now show when user is null */}
          </Button>
        )}
      </div>

      {/* Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>  {/* ✅ added onOpenChange */}
        <DialogContent>
          <DialogHeader className="flex flex-col justify-center">
            <DialogTitle className='mt-4 flex items-center gap-2'>
              <img src="/logo.svg" className='w-7 h-7' alt="logo" />
              Sign In With Google
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              To generate the trip, please sign in with Google securely.
              <Button onClick={logIn} className="w-full mt-4">
                <FcGoogle className='h-6 w-6' /> Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Header