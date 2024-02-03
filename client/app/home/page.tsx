"use client";
import { useAppSelector } from "@/redux/store";
import { Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { VscTriangleLeft, VscTriangleRight } from "react-icons/vsc";
import { Header } from "../components/Header";
import { lily } from "../font";
import Progress from "./Progress.json";
import ProgressBar from "./ProgressBar";
import { group } from "console";
import axios from "axios";

const Home = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.authReducer.value);
  const [groups, setGroups] = useState([{ id: 0, name: "group 1", pledge: 0 }]);
  const empty =
    useAppSelector((state) => state.authReducer.value.groups).length === 0;
  const [amount, setAmount] = useState(0);
  const [selected, setSelected] = useState(true);
  const [task, setTask] = useState(true);
  //   const [amount, setAmount] = useState(30);
  //   const [selected, setSelected] = useState(true);
  //   const [money, setMoney] = useState(true);
  //   const [task, setTask] = useState(false);

  const updateGroup = async (name: String, group_id: String) => {
    const jsonData = { name: name, pledge: amount };
    try {
      let res = axios.post(`http://localhost:4000/group/${group_id}`, jsonData);
      console.log(res);
      console.log(jsonData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="start"
      className="bg-beige w-full h-full"
    >
      <Flex direction="column" align="center">
        <Flex direction="column" align="center">
          <Header header={empty ? "Group Name" : groups[0].name}></Header>
          <div>
            <Flex
              className="rounded-full w-60 h-60 mt-7 bg-winered"
              align="center"
              justify="center"
            >
              <Flex
                className="rounded-full w-28 h-28 bg-beige"
                align="center"
                justify="center"
              >
                <div className="text-winered text-3xl">
                  <div className={lily.className}>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      className="bg-transparent w-fit text-center focus:outline-none"
                      value={amount}
                      disabled={selected}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setAmount(parseInt(e.target.value));
                      }}
                    />
                  </div>
                </div>
              </Flex>
            </Flex>
          </div>
        </Flex>
        {empty ? (
          <>
            <div className="text-darkbrown text-4xl mt-20">No Groups</div>
            <Flex
              justify="center"
              align="center"
              onClick={() => {
                router.push("/home/addGroup");
              }}
              className="text-darkbrown text-3xl w-40 h-16 rounded-3xl cursor-pointer mt-16 bg-orange"
            >
              Join
            </Flex>
          </>
        ) : (
          <>
            {groups[0].pledge === 0 ? (
              <div
                className="bg-orange text-darkbrown rounded-xl 
				  px-10 py-2 mt-5 text-2xl cursor-pointer"
                onClick={() => {
                  if (selected) {
                    setSelected(false);
                  } else {
                    (e: React.ChangeEvent<HTMLInputElement>) => {
                      setAmount(parseInt(e.target.value));
                    };
                    updateGroup(user.groups[0].name, user.groups[0]._id);
                  }
                }}
              >
                {selected ? "Add to well" : "Confirm"}
              </div>
            ) : (
              <>
                {task ? (
                  <div
                    className="bg-orange text-darkbrown rounded-xl 
				  px-10 py-2 mt-5 text-2xl cursor-pointer"
                    onClick={() => {
                      router.push("/home/addTask");
                      setTask(false);
                    }}
                  >
                    Add task
                  </div>
                ) : (
                  <div className="text-4xl text-brown mt-6">progress</div>
                )}
              </>
            )}
            <Flex direction="column">
              {Progress.map((progress) => (
                <Flex className="mt-6">
                  <div className="text-brown text-sm">{progress.name}</div>
                  <ProgressBar percentage={progress.progress} />
                </Flex>
              ))}
            </Flex>
            <Flex justify="between" className="w-full mt-8">
              <Flex
                align="center"
                justify="center"
                className="w-16 h-16 bg-gray rounded-full pr-2 cursor-pointer"
              >
                <VscTriangleLeft size={50} color="#F68D96" />
              </Flex>
              <Flex
                align="center"
                justify="center"
                className="w-16 h-16 bg-gray rounded-full pl-2 cursor-pointer"
              >
                <VscTriangleRight size={50} color="#F68D96" />
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Home;
