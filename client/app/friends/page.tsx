"use client";
import { Flex } from "@radix-ui/themes";
import { Header } from "../components/Header";
import friends from "./Friends.json";
import { useAppSelector } from "@/redux/store";
import axios from "axios";
import { useState, useEffect } from "react";
interface Friend {
  username: string;
}

const Friends = () => {
  const user_id = useAppSelector((state) => state.authReducer.value._id);
  const [friends, setFriends] = useState<Friend[]>([]);
  const getUser = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/users/${user_id}`);

      setFriends(res.data.friends);
      console.log(res);
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
      <Header header="friends" />
      <Flex></Flex>
      <div className="friendsBox">
        <Flex direction="column" className="mt-10">
          {friends.map((friend) => (
            <div className="bg-orange w-80 h-18 rounded-3xl py-3 px-5 mb-4">
              <div className="text-winered text-3xl">{friend.username}</div>
            </div>
          ))}
        </Flex>
      </div>
    </Flex>
  );
};

export default Friends;
