"use client";
import { Flex } from "@radix-ui/themes";
import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { lily } from "../font";
import { useRouter } from "next/navigation";
import axios from "axios";
import { logIn, setName } from "@/redux/features/auth-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

interface User {
  username: string;
  group: string;
}
const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const questions = [
    "Enter your username"
  ];
  const [page, setPage] = useState(0);
  const [success, setSuccess ] = useState(false)
  const [state, setState] = useState<User>({
    username: "",
    group: "",
  });

  const getUser = async (username: String) => {
    try {
        const res = await axios.get(`http://localhost:4000/username/${username}`)
        if (res.status != 200) {
            setSuccess(false);
        } else {
            setSuccess(true)
        }
    } catch(err){
        console.log(err)
        setSuccess(false)
    }
  }

  const renderContent = () => {
    switch (page) {
      case 0:
        return (
          <>
            <input
              type="text"
              placeholder="Enter your username"
              className="registrationInput"
              value={state.username}
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
                await getUser(state.username)
                if(success){
                    setPage((prevPage) => prevPage + 1);
                }
              }}
            >

            { !success ? <div>Login failed </div> : <div></div>}

              <FaArrowRightLong size={50} />
            </Flex>
          </>
        );
        case 1:
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
    }
  }
};

export default Login;
