"use client";
import { Flex } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  name: string;
  groups: Array<Group>;
}

interface Group {
  name: string;
}
const ProfileOthers = () => {
  const [user, setUser] = useState<User>({
    name: "",
    groups: [],
  });

  const getUser = async () => {
    try {
      let res = await axios.get(`http://localhost:4000/users/${id}`);
      setUser({
        name: res.data.username,
        groups: res.data.groups,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
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
        <Flex
          className="rounded-full w-28 h-28 border-8 mt-4 text-6xl bg-winered text-beige"
          align="center"
          justify="center"
        >
          {user.name.substring(0, 1)}
        </Flex>
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

export default ProfileOthers;
