"use client";
import { Header } from "@/app/components/Header";
import { Flex } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useRouter } from "next/navigation";
import axios from 'axios'; 

const Add = () => {
  const router = useRouter();
  const names = ["Bao", "Ruby", "Linh"];
  const [groups, setGroups ] = useState([]); 
  
  const getGroups = async () => {
    try {
      let res = await axios.get("http://localhost:4000/group"); 

      setGroups(res.data);
    } catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getGroups()
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
        {names.map((name) => (
          <Flex
            justify="between"
            align="center"
            className="bg-orange w-80 h-16 rounded-lg px-6 mb-5 text-darkbrown"
          >
            <div className="text-2xl">{name}</div>
            <div
              onClick={() => {
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
