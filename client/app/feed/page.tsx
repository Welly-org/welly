'use client'
import { Flex } from "@radix-ui/themes";
import { FaRegHeart,FaHeart } from "react-icons/fa";
import { Header } from "../components/Header";
import feed from "./Feed.json";
import { lily } from "../font";
import { useEffect, useState } from 'react'; 
import axios from 'axios'; 

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
              <Flex
                direction="column"
                align="start"
                justify="start"
                className="mt-10 pl-10 w-full"
              >
                <Flex>
                <div className="text-brown text-3xl">{post.creator.username}</div>
                <Flex
                    className="text-darkbrown ml-20"
                    align="center"
                    justify="center"
                  >
                    <FaHeart className="w-8" size="20" />
                    <div>{post.likes}</div>
                  </Flex>
                </Flex>
                <div className="w-80 bg-cover h-80 rounded-3xl bg-gray mt-2 flex items-end justify-start" style={{ backgroundImage: `url(${post.photo})` }}>
                <Flex
                    className="bg-winered w-8 h-8 rounded-full cursor-pointer m-3"
                    align="center"
                    justify="center"
                  >
                    <FaRegHeart className="w-8" color="#ffffff" size="15" />
                  </Flex>
                </div>
                {/* <Flex className="tagbox" align="center">
                  
                  {tags.map((tag) => (
                    <Flex
                      className="bg-winered text-white px-4 ml-2 py-0.5 rounded-xl whitespace-nowrap cursor-pointer"
                      align="center"
                      justify="center"
                    >
                      {tag}
                    </Flex>
                  ))}
                  
                </Flex> */}

                <div className="text-darkbrown text-xl mt-2 px-3 rounded w-full">
                    {post.task}
                  </div>
              </Flex>
            ))}
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Feed;
