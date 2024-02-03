"use client";
import { Flex } from "@radix-ui/themes";
import React from "react";
import { Header } from "../components/Header";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logOut } from "@/redux/features/auth-slice";

const pages = ["PROFILE", "SETTINGS", "PRIVACY", "LEGAL", "ABOUT", "LOGOUT"];

const Menu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  return (
    <Flex
      direction="column"
      align="center"
      justify="start"
      className="bg-beige w-full h-full"
    >
      <Header header="menu" />
      <Flex direction="column" className="mt-8">
        {pages.map((page) => (
          <Flex
            align="center"
            justify="center"
            className="bg-gray w-80 h-16 py-4 mb-8 rounded-3xl cursor-pointer"
            onClick={() => {
              if (page === "LOGOUT") {
                dispatch(logOut());
                router.push("/");
              } else if (page === "PROFILE") {
                router.push("/profile");
              }
            }}
          >
            <div className="text-darkgray text-2xl">{page}</div>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default Menu;
