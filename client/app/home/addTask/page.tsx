"use client";
import { Header } from "@/app/components/Header";
import { Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { VscTriangleRight } from "react-icons/vsc";

const AddTask = () => {
  const router = useRouter();
  const tasks = [
    {
      name: "finish homework",
      progress: 5,
    },
    {
      name: "complete essay",
      progress: 3,
    },
    { name: "walk the dog", progress: 2 },
  ];
  return (
    <Flex
      direction="column"
      align="center"
      justify="between"
      className="bg-beige w-full h-full"
    >
      <Flex direction="column" align="center" justify="center">
        <Header header="task list" />
        <Flex
          direction="column"
          className="mt-10"
          align="center"
          justify="center"
        >
          {tasks.map((task) => (
            <Flex
              justify="between"
              align="center"
              className="bg-darkorange px-4 mb-4 rounded-xl 
			text-white w-80 h-16"
            >
              <div>{task.name}</div>
              <div>0/{task.progress}</div>
            </Flex>
          ))}
          <Flex
            justify="center"
            align="center"
            className="bg-darkorange px-4 mb-4 rounded-xl 
			text-white w-80 h-16 text-4xl cursor-pointer"
          >
            +
          </Flex>
        </Flex>
      </Flex>
      <Flex className="w-full p-4" justify="end">
        <Flex
          align="center"
          justify="center"
          className="w-16 h-16 bg-gray rounded-full pl-2
		   text-darkbrown cursor-pointer"
          onClick={() => {
            router.push("/home");
          }}
        >
          <VscTriangleRight size={50} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AddTask;
