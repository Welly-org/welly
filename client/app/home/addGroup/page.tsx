"use client";
import { Header } from "@/app/components/Header";
import { Flex } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Groups {
  _id: string; 
  name: string;
}

const Add = () => {
  const router = useRouter();
  const names = ["Bao", "Ruby", "Linh"];
  const [groups, setGroups] = useState<Groups[]>([]);
  const user_id = "65be7d6482b530c5e909f1f4" // @todo change ruby's user id to dynamic var

  const getGroups = async () => {
    try {
      let res = await axios.get("http://localhost:4000/group");
      setGroups(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const joinGroup = async (group_id: String) => {
    try {
      const jsonData = {"user_id": user_id}

      let res = await axios.post(`http://localhost:4000/group/${group_id}/join`, jsonData);
    } catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <Flex
      direction="column"
      align="center"
      justify="start"
      className="bg-beige w-full h-full"
    >
      <Header header="Group Name" />
      <Flex
        direction="column"
        align="center"
        justify="center"
        className="mt-10"
      >
        {groups.map((group) => (
          <Flex
            justify="between"
            align="center"
            className="bg-orange w-80 h-16 rounded-lg px-6 mb-5 text-darkbrown"
          >
            <div className="text-2xl">{group.name}</div>
            <div
              onClick={async () => {
                await joinGroup(group._id); 
                router.push("/home");
              }}
            >
              <IoMdAdd className="cursor-pointer" size={30} />
            </div>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default Add;
