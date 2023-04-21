import Link from 'next/link';
import React from 'react'
const InvalidModal = () => {
  return (
    <div className = "invalidmodaloverlay">
      <div className = "invalidmodaldiv">
            <div className='invalidmodalhead'>User Is not Logged in!! Kindly login Or SignUp</div>
            <div className='invalidmodaldiv2'>
            <div className='invalidmodalbutton'> <Link href={"/login"}>Log In</Link> </div>
            <div className='invalidmodalbutton'> <Link href={"/signin"}>Sign In</Link> </div>
            </div>
      </div>
    </div>
  )
}

export default InvalidModal;