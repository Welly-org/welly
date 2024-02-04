"use client";
import { Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { lily } from "./font";

export default function Welcome() {
  const router = useRouter();
  return (
    <Flex
      direction="column"
      align="center"
      justify="start"
      className="bg-pink w-full h-full"
    >
      <div className="text-beige font-normal mt-64 text-6xl">
        <div className={lily.className}>Welly</div>
      </div>
      <div
        className="mt-64 bg-lightgray px-20 py-2 text-pink 
	  rounded-2xl text-3xl cursor-pointer border-2 border-lightgray 
	  hover:bg-pink hover:text-lightgray transition duration-200"
        onClick={() => {
          router.push("/registration");
        }}
      >
        <div className={lily.className}>Register</div>
      </div>

      <div
        className="mt-64 bg-lightgray px-20 py-2 text-pink 
	  rounded-2xl text-3xl cursor-pointer border-2 border-lightgray 
	  hover:bg-pink hover:text-lightgray transition duration-200"
        onClick={() => {
          router.push("/login");
        }}
      >
        <div className={lily.className}>Login</div>
      </div>
    </Flex>
  );
}
