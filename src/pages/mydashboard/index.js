import Head from "next/head";
import React, { useEffect, useState } from "react";
import InvalidModal from "@/components/InvalidModal";
import MydashComp from "@/components/MydashComp";

const index = () => {
  const [Userexist, setUsrexist] = useState(false);
  useEffect(() => {
    const loginlocal = localStorage.getItem("Login");
    const Useremail = localStorage.getItem("Email");
    if (loginlocal === "true" && Useremail) {
      setUsrexist(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>My App</title>
      </Head>
      {Userexist === true ? (
        <MydashComp/>
      ) : (
        <InvalidModal />
      )}
    </>
  );
};

export default index;
