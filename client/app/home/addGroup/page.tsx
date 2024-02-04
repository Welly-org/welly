"use client";
import { Header } from "@/app/components/Header";
import { addGroup } from "@/redux/features/auth-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useDispatch } from "react-redux";

interface Groups {
  _id: string;
  name: string;
}

const Add = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [groups, setGroups] = useState<Groups[]>([]);
  const user_id = useAppSelector((state) => state.authReducer.value._id);

  const getGroups = async () => {
    try {
      let res = await axios.get("http://localhost:4000/group");
      setGroups(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const joinGroup = async (group_id: String) => {
    console.log(user_id);
    try {
      const jsonData = { user_id: user_id };
      let res = await axios.post(
        `http://localhost:4000/group/${group_id}/join`,
        jsonData
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

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
                console.log("clicked");
                await joinGroup(group._id);
                dispatch(
                  addGroup({ _id: group._id, name: group.name, pledge: 0 })
                );
                // set user.group to "group.name"
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
