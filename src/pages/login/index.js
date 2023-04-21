import Head from "next/head";
import Image from "next/image";
import { Watch } from "react-loader-spinner";
import Swal from "sweetalert2";
import React, { useState, useEffect, useContext } from "react";
import bg from "../../assets/images/bg5.jpg";
import Link from "next/link";
import { AppContext } from "@/context/ContextAPI";
import { useRouter } from "next/router";
const index = () => {
  const [showpassword, setshowpassword] = useState(false);
  const [Name, setName] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [formsubmit, setformsubmit] = useState(false);
  const [timerclock, settimerclock] = useState(true);
  const context = useContext(AppContext);
  const { SetUserName, SetUserEmail, SetUserPassword, setisuserLogin } = context;
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      settimerclock(!timerclock);
    }, 1000);
  }, [formsubmit]);
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
  const handle_Name = (e) => {
    setName(e.target.value);
  };
  const handle_password = (e) => {
    setpassword(e.target.value);
  };
  const handle_email = (e) => {
    setemail(e.target.value);
  };
  function checkparams() {
    if (password === null || password.length < 8) {
      Toast.fire({
        icon: "error",
        title: "Password must be greater than 8 words",
      });
      return false;
    }
    if (Name === null || Name.length === 0) {
      Toast.fire({
        icon: "error",
        title: "Name should not be blank",
      });
      return false;
    }
    if (email === null || email.length === 0) {
      Toast.fire({
        icon: "error",
        title: "email should not be blank",
      });
      return false;
    }
    return true;
  }
  const handle_submit = async (e) => {
    e.preventDefault();
    if (checkparams() === false) return;
    setformsubmit(true);
    settimerclock(true);
    const reponsy = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Name, email, password }),
    })
      .catch((Err) => console.log(Err))
      .then((repo) => repo.json());
    if (reponsy.status === 400) {
      Toast.fire({
        icon: "error",
        title: "Failed to authorize",
      });
      return;
    } else {
      Toast.fire({
        icon: "success",
        title: "Autherize succesfull",
      });
      setTimeout(() => {
        SetUserEmail(email);
        SetUserName(Name);
        SetUserPassword(password);
        setisuserLogin(true);
        localStorage.setItem("Login" , "true");
        localStorage.setItem("Email" , email);
        router.push("/mydashboard");
      }, 2000);
    }
  };
  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>
      <Image src={bg} className="SignInPageBg" alt="bg"></Image>
      <form className="LoginPageCont">
        <div className="SignInContactDiv">
          <label className="SignInLabelInput">Name</label>
          <input
            onChange={handle_Name}
            className="SignInInputTag"
            type={"text"}
          ></input>
        </div>
        <div className="SignInContactDiv">
          <label className="SignInLabelInput">Email</label>
          <input
            onChange={handle_email}
            className="SignInInputTag"
            type={"text"}
          ></input>
        </div>
        <div className="SignInContactDiv">
          <label className="SignInLabelInput">Password</label>
          <div className="SiginPasswordCont">
            <input
              onChange={handle_password}
              className="SignInInputTag"
              type={`${showpassword === true ? "text" : "password"}`}
            ></input>
            {showpassword === true ? (
              <svg
                onClick={() => {
                  setshowpassword(!showpassword);
                }}
                className="passwordIcon bi bi-eye"
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
            ) : (
              <svg
                onClick={() => {
                  setshowpassword(!showpassword);
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                className="bi bi-eye-slash passwordIcon"
                viewBox="0 0 16 16"
              >
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
              </svg>
            )}
          </div>
        </div>
        <button className="submitButtonSignIn" onClick={handle_submit}>
          Submit
        </button>
        <div className="Alreadydiv">
          New to Exam portal?
          <span className="HomepageSignin">
            <Link href={"/signin"}>Sign Up</Link>
          </span>
        </div>
        {formsubmit === true && timerclock === true && (
          <div className="LoadingSpinner_Upload">
            loading.....
            <Watch
              height="60"
              width="60"
              radius="48"
              color="#000"
              ariaLabel="watch-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </div>
        )}
      </form>
    </>
  );
};

export default index;
