"use client";
import { Flex } from "@radix-ui/themes";
import { VscTriangleLeft, VscTriangleRight } from "react-icons/vsc";
import { Header } from "../components/Header";
import { lily } from "../font";
import Progress from "./Progress.json";
import ProgressBar from "./ProgressBar";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const empty = false;

  const [amount, setAmount] = useState(0);
  const [selected, setSelected] = useState(true);
  const [money, setMoney] = useState(false);
  const [task, setTask] = useState(true);

  //   const [amount, setAmount] = useState(30);
  //   const [selected, setSelected] = useState(true);
  //   const [money, setMoney] = useState(true);
  //   const [task, setTask] = useState(false);

  return (
    <Flex
      direction="column"
      align="center"
      justify="start"
      className="bg-beige w-full h-full"
    >
      <Flex direction="column" align="center">
        <Flex direction="column" align="center">
          <Header header={empty ? "Group Name" : "Group 1"}></Header>
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
            <div className="text-darkbrown text-4xl mt-20">No Members</div>
            <Flex
              justify="center"
              align="center"
              onClick={() => {
                router.push("/home/addGroup");
              }}
              className="text-darkbrown text-3xl w-40 h-16 rounded-3xl cursor-pointer mt-16 bg-orange"
            >
              Add
            </Flex>
          </>
        ) : (
          <>
            {!money ? (
              <div
                className="bg-orange text-darkbrown rounded-xl 
			  px-10 py-2 mt-5 text-2xl cursor-pointer"
                onClick={() => {
                  if (selected == false) {
                    setMoney(true);
                    (e: React.ChangeEvent<HTMLInputElement>) => {
                      setAmount(parseInt(e.target.value));
                    };
                  } else {
                    setSelected(false);
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
