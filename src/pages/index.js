import Image from "next/image";
import React from "react";
import bg1 from "../assets/images/bg1.jpg";
import exam from "../assets/images/exam.png";
import Link from "next/link";
const page = () => {
  return (
    <div>
      <Image className="Homepagebg" src={bg1} alt="background" />
      <div className="HomepageCont">
        <div className="homepageconthead1">
          Examination Portal{" "}
          <Image className="examicon" src={exam} alt="exam" />
        </div>
        <div className="Homepagetext1">
          Already have an account?{" "}
          <span className="HomepageSignin">
            <Link href={"/login"}>Sign in</Link>
          </span>
        </div>
        <div className="Homepagetext1">
          New to the site?{" "}
          <span className="HomepageSignup">
            {" "}
            <Link href={"/signin"}>Sign Up</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default page;
