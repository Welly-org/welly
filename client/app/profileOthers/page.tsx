"use client";
import { Flex } from "@radix-ui/themes";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  name: string;
  groups: Array<Group>;
}

interface Group {
  name: string;
}

interface Post {
  posts: Array<PostInfo>;
}

interface PostInfo {
  photo: string;
}

const ProfileOthers = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("search");
  const [user, setUser] = useState<User>({
    name: "",
    groups: [],
  });
  const [posts, setPosts] = useState<Post[]>([]);

  const getUser = async () => {
    try {
      let res = await axios.get(`http://localhost:4000/users/${id}`);
      setUser({
        name: res.data.username,
        groups: res.data.groups,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getPosts = async () => {
    try {
      let res = await axios.get(`http://localhost:4000/users/${id}/posts`);
      setPosts({
        posts: res.data,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("FROM USEEFFECT");

    getUser();
  }, []);

  return (
    <Flex
      direction="column"
      align="center"
      justify="start"
      className="bg-beige w-full h-full"
    >
      {/* <Header header="profile" /> */}
      <Flex
        direction="column"
        className="mt-11"
        justify="center"
        align="center"
      >
        <Flex
          className="rounded-full w-28 h-28 border-8 mt-4 text-6xl bg-winered text-beige"
          align="center"
          justify="center"
        >
          {user.name.substring(0, 1)}
        </Flex>
        <div className="mt-4 text-winered">{user.name}</div>
      </Flex>
      <div className="text-darkbrown mt-11 text-3xl">{user.name}'s groups</div>
      <Flex direction="column" className="mt-4">
        {user.groups.map((group, index) => (
          <div key={index}>
            <Flex className="bg-orange text-2xl mt-6 py-3 text-darkbrown w-80 px-7 rounded-full">
              {group.name}
            </Flex>
          </div>
        ))}
      </Flex>
      <div className="grid grid-cols-3 gap-4">
        {user.posts.map((post, index) => (
          <div
            key={index}
            className="relative overflow-hidden aspect-w-1 aspect-h-1"
          >
            <img
              src={post.photo}
              alt={`Post ${index}`}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </Flex>
  );
};

export default ProfileOthers;