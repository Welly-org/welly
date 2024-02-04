"use client";
import { useAppSelector } from "@/redux/store";
import { Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { VscTriangleLeft, VscTriangleRight } from "react-icons/vsc";
import { Header } from "../components/Header";
import { lily } from "../font";
import Progress from "./Progress.json";
import ProgressBar from "./ProgressBar";

const Home = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.authReducer.value);
  const empty =
    useAppSelector((state) => state.authReducer.value.groups).length === 0;
  const [amount, setAmount] = useState(0);
  const [pledge, setPledge] = useState(0);
  const [selected, setSelected] = useState(true);
  const [task, setTask] = useState(true);

  const updateGroup = async (name: String, group_id: String) => {
    const jsonData = { name: name, pledge: amount };
    try {
      axios.post(`http://localhost:4000/group/${group_id}`, jsonData);
      setPledge(jsonData.pledge);
    } catch (err) {
      console.log(err);
    }
  };

  const getPledge = async () => {
    if (user.groups[0]._id != null) {
      try {
        const res = await axios.get(
          `http://localhost:4000/group/${user.groups[0]._id}/pledge`
        );

        setPledge(res.data.pledge);
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    getPledge();
    console.log(pledge);
  }, []);

  return (
    <Flex
      direction="column"
      align="center"
      justify="start"
      className="bg-beige w-full h-full"
    >
      <Flex direction="column" align="center">
        <Flex direction="column" align="center">
          <Header header={empty ? "Group Name" : user.groups[0].name}></Header>
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
                      value={pledge}
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
            {pledge === 0 ? (
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
