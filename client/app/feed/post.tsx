import React from 'react'
import { Flex } from "@radix-ui/themes";
import { FaRegHeart,FaHeart } from "react-icons/fa";

interface Props {
    _id: string,
    likes: number,
    photo: string,
    task: string,
    creator: Creator,
    group: string,
    public: boolean,
}

interface Creator {
    username: string,
    _id: string
}
const Post = ({ post } : Props) => {
  return (
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
                    onClick = {() => {

                    }}
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
  )
}

export default Post