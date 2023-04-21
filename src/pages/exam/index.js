import dataquestion from "@/data/question_data1";
import question_data from "@/data/question_data1";
import dataquestion2 from "@/data/question_data2";
import question_data2 from "@/data/question_data2";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
const index = () => {
  const [currque, setcurrque] = useState(1);
  const [questionset, setquestionset] = useState([]);
  const [curroption , setcurroption] = useState(0);
  const [optionclass , setoptionclass] = useState("ExamQueOptBull");
  const [subject, setsubject] = useState("phy");
  useEffect(() => {
    setquestionset(question_data);
    if (currque <= 0) {
      setcurrque(1);
    }
    if (currque > 10) {
      setquestionset(question_data2);
      setsubject("chem");
    }
    if (currque === 10) {
      setsubject("phy");
      setquestionset(question_data);
    }
    if (currque >= 20) {
      setcurrque(20);
    }
  }, [currque]);
  useEffect(()=>{

  },[curroption]);
  const handle_click_option = (e)=>{
    console.log(e.target.value);
    setcurroption(e.target.value);
  } 
  return (
    <>
      <Head>
        <title>Exam</title>
      </Head>
      <header className="ExamHead">Online Test</header>
      <div className="ExamMainDiv">
        <div className="ExamDivA">
          <div className="ExamSubCont">
            <div className="ExamSubVal">All Section</div>
            <div className="ExamSubVal" onClick={()=>{setcurrque(0); setquestionset(dataquestion);}}>Physics</div>
            <div className="ExamSubVal" onClick={()=>{setcurrque(11); setquestionset(dataquestion2);}}>Chemistry</div>
            <div className="ExamSubVal">Maths</div>
          </div>
          <div className="ExamCont">
            {questionset.map((val, idx) => (
              <div key={idx}>
                <div className={`${currque === val.id ? "vis" : "test"}`}>
                  <div className="ExamQueId">Q. {val.id}</div>
                  <div className="EaxmQue">{val.question}</div>
                  {
                    val.diagram !== null && <Image src={val.diagram} width={200} height={200} alt={"Image"}/>
                  }
                  <div className="ExamQueOptDiv">
                  <div className="ExamQueOptCont">
                    <div >{val.opt1}</div>
                    <option value="1" onClick={handle_click_option} className={`${curroption === 1 ? "ExamQueOptBull active" : "ExamQueOptBull"}`}></option>
                  </div>
                  <div className="ExamQueOptCont">
                    <div>{val.opt2}</div>
                    <option value="2" onClick={handle_click_option} className="ExamQueOptBull"></option>
                  </div>
                  <div className="ExamQueOptCont">
                    <div>{val.opt3}</div>
                    <option value="3" onClick={handle_click_option} className="ExamQueOptBull"></option>
                  </div>
                  <div className="ExamQueOptCont">
                    <div>{val.opt4}</div>
                    <input type={"checkbox"}></input>
                  </div>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
          <div className="test3">
            <div
              className="ExamQueButtonD"
              onClick={() => {
                setcurrque((prev) => prev - 1);
              }}
            >
              Prev
            </div>
            <div
            className="ExamQueButtonD"
              onClick={() => {
                setcurrque((prev) => prev + 1);
              }}
            >
              skip
            </div>
            <div
            className="ExamQueButtonD"
              onClick={() => {
                setcurrque((prev) => prev + 1);
              }}
            >
              Next
            </div>
          </div>
        </div>
        <div className="ExamDivB">
        <div className="test3">
            {questionset.map((val, idx) => (
              <div key={idx}>
                <div
                  className="test2"
                  onClick={() => {
                    setcurrque(val.id);
                  }}
                >
                  {val.id}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className="ExamHead">helo </footer>
    </>
  );
};

export default index;
