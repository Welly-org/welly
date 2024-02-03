"use client";
import { Flex } from "@radix-ui/themes";
import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { lily } from "../font";
import { useRouter } from "next/navigation";
import axios from 'axios'; 

const Registration = () => {
  const router = useRouter();

  const questions = [
    "What's your name?",
    "Do you have a group?",
    "Enter group code:",
    "Let's make a new group!",
    "What are your goals with Welly?",
    "Invite your friends!",
  ];
  const [page, setPage] = useState(0);
  const [state, setState] = useState({
    username: "",
    group: "",
  });

  const createUser = async () => {
    console.log("username;")
    console.log(state.username);
    console.log("hit 1")
    try {
      const jsonData = { "username" : state.username }

      // axios post
      const res = await axios.post("http://localhost:4000/users", jsonData); 
      console.log("hit 2")
      console.log(res); 
    } catch(err){
      "hit 3"
      console.log(err);
    }
  };

  const renderContent = () => {
    switch (page) {
      case 0:
        return (
          <>
            <input
              type="text"
              placeholder="Enter Name"
              className="registrationInput"
              value={state.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setState((prevState) => ({
                  ...prevState,
                  username: e.target.value,
                }));
              }}
            />
            <Flex
              justify="center"
              align="center"
              className="registrationArrow"
              onClick={async () => {
                await createUser(); 
                
                setPage((prevPage) => prevPage + 1);
              }}
            >
              <FaArrowRightLong size={50} />
            </Flex>
          </>
        );
      case 1:
        return (
          <>
            <Flex direction="column" className="mt-32">
              <Flex
                justify="center"
                align="center"
                className="registrationButton"
                onClick={() => {
                  setPage(2);
                }}
              >
                Yes
              </Flex>
              <Flex
                justify="center"
                align="center"
                className="registrationButton"
                onClick={() => {
                  setPage(3);
                }}
              >
                No
              </Flex>
            </Flex>
          </>
        );
      case 2:
        return (
          <>
            <input
              type="text"
              placeholder="Enter Code"
              className="registrationInput"
              value={state.group}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setState((prevState) => ({
                  ...prevState,
                  group: e.target.value,
                }));
              }}
            />
            <Flex
              justify="center"
              align="center"
              className="registrationArrow"
              onClick={() => {
                // if(state.username != ""){
                //   createUser();
                // }

                router.push("/home");
              }}
            >
              <FaArrowRightLong size={50} />
            </Flex>
          </>
        );
      case 3:
        return (
          <>
            <input
              type="text"
              placeholder="Enter Group Name"
              className="registrationInput"
              value={state.group}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setState((prevState) => ({
                  ...prevState,
                  group: e.target.value,
                }));
              }}
            />
            <Flex
              justify="center"
              align="center"
              className="registrationArrow"
              onClick={() => {
                setPage((prevPage) => prevPage + 1);
              }}
            >
              <FaArrowRightLong size={50} />
            </Flex>
          </>
        );
      case 4:
        return (
          <>
            <Flex
              justify="center"
              align="center"
              className="registrationButton"
              onClick={() => {
                setPage((prevPage) => prevPage + 1);
              }}
            >
              Finish Homework
            </Flex>
            <Flex
              justify="center"
              align="center"
              className="registrationButton"
              onClick={() => {
                setPage((prevPage) => prevPage + 1);
              }}
            >
              Organize My Schedule
            </Flex>
            <Flex
              justify="center"
              align="center"
              className="registrationButton"
              onClick={() => {
                setPage((prevPage) => prevPage + 1);
              }}
            >
              Socialize
            </Flex>
            <Flex
              justify="center"
              align="center"
              className="registrationButton"
              onClick={() => {
                setPage((prevPage) => prevPage + 1);
              }}
            >
              Sleep Better
            </Flex>
            <Flex
              justify="center"
              align="center"
              className="registrationButton"
              onClick={() => {
                setPage((prevPage) => prevPage + 1);
              }}
            >
              Other
            </Flex>
          </>
        );
      case 5:
        return (
          <>
            <input
              type="text"
              placeholder="Enter Phone Number"
              className="registrationInput"
              value={state.group}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setState((prevState) => ({
                  ...prevState,
                  group: e.target.value,
                }));
              }}
            />

            <Flex
              justify="center"
              align="center"
              className="registrationArrow"
              onClick={() => {
                router.push("/home");
                createUser();
              }}
            >
              <FaArrowRightLong size={50} />
            </Flex>
          </>
        );
    }
  };
  return (
    <Flex
      direction="column"
      align="center"
      justify="between"
      className="bg-pink w-full h-full px-4 pt-24 pb-40"
    >
      <Flex
        justify="center"
        className="text-beige leading-normal text-center w-full text-5xl"
      >
        <div className={lily.className}>{questions[page]}</div>
      </Flex>
      <div>{renderContent()}</div>
    </Flex>
  );
};

export default Registration;
