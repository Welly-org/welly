"use client";
import { addGroup, logIn, setName } from "@/redux/features/auth-slice";
import { AppDispatch } from "@/redux/store";
import { Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { lily } from "../font";

interface User {
  username: string;
  group: string;
}
const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState("");

  const getUser = async (username: String) => {
    try {
      const res = await axios.get(`http://localhost:4000/username/${username}`);
      if (res.status != 200) {
      } else {
        console.log(res.data);
        dispatch(logIn(res.data._id));
        dispatch(setName(res.data.username));
        // addGroup({ _id: res.data.groups[0], name: res.data.groups})
        router.push("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="bg-pink w-full h-full"
    >
      <div className="text-beige font-normal text-6xl">
        <div className={lily.className}>Welly</div>
      </div>
      <div className="mt-10">
        <input
          type="text"
          placeholder="Enter your username"
          className="registrationInput"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <Flex
        justify="center"
        align="center"
        className="registrationArrow"
        onClick={async () => {
          await getUser(username);
        }}
      >
        Login
      </Flex>
    </Flex>
  );
};
export default Login;
