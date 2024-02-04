"use client";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUserFriends } from "react-icons/fa";
import { IoMdHome, IoMdMenu } from "react-icons/io";
import { IoNewspaper } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
const NavBar = () => {
  const currentPath = usePathname();
  return (
    <nav className="bg-orange h-16 w-full">
      <Flex className="h-full px-4" align="center" justify="between">
        <Link href="/feed" className="cursor-pointer">
          <IoNewspaper
            size={40}
            color={currentPath === "/feed" ? "#F68D96" : "#ffffff"}
          />
        </Link>

        <Link href="/friends" className="cursor-pointer">
          <FaUserFriends
            size={40}
            color={currentPath === "/friends" ? "#F68D96" : "#ffffff"}
          />
        </Link>
        <Flex
          align="center"
          justify="center"
          className="h-20 w-20 cursor-pointer rounded-full bg-pink mb-10"
        >
          <FaPlus color="#ffffff" size={50} />
        </Flex>
        <Link href="/home" className="cursor-pointer">
          <IoMdHome
            size={40}
            color={currentPath === "/home" ? "#F68D96" : "#ffffff"}
          />
        </Link>
        <Link href="/menu" className="cursor-pointer">
          <IoMdMenu
            size={40}
            color={currentPath === "/menu" ? "#F68D96" : "#ffffff"}
          />
        </Link>
      </Flex>
    </nav>
  );
};

export default NavBar;
