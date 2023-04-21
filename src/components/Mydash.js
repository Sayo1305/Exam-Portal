import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

const Mydash = ({ data }) => {
      const mymodalopener = useRef();
      const router = useRouter();
      const [showmodal , setshowmodal] = useState(false);
  useEffect(() => {
    console.log(mymodalopener);
  }, []);
  const handle_logout = ()=>{
    setshowmodal(!showmodal);
    localStorage.removeItem("Login");
    localStorage.removeItem("Email");
    router.push("/");
  }
  return (
    <>
      <div className="dashNav">
        <div>Logo</div>
        <div className="dashnavhead">Exam portal</div>
        <div className="dashnab2">
          <div className="dashnavbutton" onClick={()=>{router.push("/exam")}}>Start Exam</div>
          <div>
            <Image
                  ref={mymodalopener}
                  onClick={()=>{setshowmodal(!showmodal)}}
              className="dashnavprofileimg"
              src={data.data.image}
              width="100"
              height={100}
              alt="profile"
            />
          </div>
          {
            showmodal &&<div className="modalprofile">
            <div className="modalprofileopt" onClick={()=> {router.push("/exam")}}>Start Exam</div>
            <div  className="modalprofileopt" onClick={()=>{router.push("/")}}>Home</div>
            <div className="modalprofileopt" onClick={handle_logout} >Log Out</div>
          </div>
          }
        </div>
      </div>
      <div className="dashcontmain">
        <div>
          <Image
            className="dashcontmainimg"
            src={data.data.image}
            width="100"
            height={100}
            alt="profile"
          />
        </div>
        <div className="dashcontdiv2">
          <div className="dashcontname">{data.data.name}</div>
          <div className="dashcontname2">{data.data.email}</div>
          <div className="dashcontnoofdiv">
            <div>Number of Test Given</div>
            <div>
                  {data.data.numberoftest}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mydash;
