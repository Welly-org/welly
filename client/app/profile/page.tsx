"use client";
import { Flex } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import axios from "axios";

interface User {
  name: string;
  groups: Array<Group>;
}

interface Group {
  name: string;
}
const Profile = () => {
  const [user, setUser] = useState<User>({
    name: "",
    groups: [],
  });

  const getUser = async () => {
    try {
      let data = await axios.get(
        "http://localhost:4000/users/65b9c8665d118eb8717acc5a"
      );
      console.log(data.data);
      setUser({
        name: data.data.username,
        groups: data.data.groups,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
    console.log(user);
  }, []);

  return (
    <Flex
      direction="column"
      align="center"
      justify="start"
      className="bg-beige w-full h-full"
    >
      {/* <Header header="profile" /> */}
      <Flex
        direction="column"
        className="mt-11"
        justify="center"
        align="center"
      >
        <Flex className="rounded-full w-28 h-28 border-8 mt-4 border-winered"></Flex>
        <div className="mt-4 text-winered">{user.name}</div>
      </Flex>
      <div className="text-darkbrown mt-11 text-3xl">Your groups</div>
      <Flex direction="column" className="mt-4">
        {user.groups.map((group, index) => (
          <div key={index}>
            <Flex className="bg-orange text-2xl mt-6 py-3 text-darkbrown w-80 px-7 rounded-full">
              {group.name}
            </Flex>
          </div>
        ))}
      </Flex>
    </Flex>
  );
};

export default Profile;
