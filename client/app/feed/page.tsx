'use client'
import { Flex } from "@radix-ui/themes";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { lily } from "../font";
import Post from "./post";

const progress = [25, 30, 49, 69, 12, 33];
const tags = ["beach trip", "weekend", "happy"];

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    let res = await axios.get("http://localhost:4000/posts"); 
    setPosts(res.data);
  }
  useEffect(() => {
    getPosts();
  }, []); 
  return (
    <Flex
      direction="column"
      align="center"
      justify="start"
      className="bg-beige w-full h-full"
    >
      <Flex direction="column" className="w-full" align="start">
        <Flex className="mt-7 pl-4" direction="column">
          <div className="text-pink text-2xl">
            <div className={lily.className}>Welly</div>
          </div>
          <Flex className="storyBox">
            {progress.map((number) => (
              <Flex direction="column" align="center" className="mr-4">
                <Flex
                  className="rounded-full w-14 h-14 border-4 border-winered"
                  align="center"
                  justify="center"
                >
                  <div className="text-winered">{number}%</div>
                </Flex>
                <div className="color-winered text-xs text-winered">
                  <div className={lily.className}>name</div>
                </div>
              </Flex>
            ))}
          </Flex>
        </Flex>
        <Flex justify="center" align="center" className="w-full">
          <div className="feedBox">
            {posts.map((post) => (
              <Post post={post} />
            ))}
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Feed;
