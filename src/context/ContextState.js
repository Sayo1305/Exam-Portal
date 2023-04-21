"use client";
import React, { useState } from "react";
import { AppContext } from "./ContextAPI";

const ContextState = (props) => {
  const [UserName, SetUserName] = useState("Name");

  const [UserEmail, SetUserEmail] = useState("Email");

  const [UserPassword, SetUserPassword] = useState("Password");

  const [UserImage, SetUserImage] = useState("image");

  const [isUserLogin , setisuserLogin] = useState(false);

  return (
    <AppContext.Provider
      value={{
        UserEmail,
        UserImage,
        UserPassword,
        UserName,
        isUserLogin , 
        setisuserLogin,
        SetUserName,
        SetUserEmail,
        SetUserPassword,
        SetUserImage,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextState;
