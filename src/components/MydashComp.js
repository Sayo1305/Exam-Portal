import React, { useEffect, useState } from 'react'
import { MutatingDots } from 'react-loader-spinner';
import Mydash from './Mydash';
const MydashComp = () => {
  const [Userdata , setUserdata] = useState([]);
  const [load , setload] = useState(false);
  useEffect(()=>{
    getuser();
  },[]);
  const getuser = async()=>{
    const email = localStorage.getItem("Email");
    let rep;
      await fetch("http://localhost:3000/api/getUserdetail" , {
      method : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({email}),
    }).catch((err)=>{
      console.log(err);
    }).then((res) => res.json()).then((ew) => {rep= ew});
    setUserdata(rep);

    if(rep.status === 200)
    {
      setTimeout(() => {
        setload(true);
      }, 3000);
    } 
  }
  return (
    <div>
      {
        load === false && <MutatingDots 
        height="100"
        width="100"
        color="#000"
        secondaryColor= '#000'
        radius='12.5'
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass="LoadingscreenDash"
        visible={true}
       />
      }
      <div>
        {
          load === true  && 
          <Mydash data={Userdata}/>
        }
      </div>
    </div>
  )
}

export default MydashComp