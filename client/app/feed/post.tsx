import React, { useState, useEffect } from "react";
import { Flex } from "@radix-ui/themes";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import axios from "axios";
import Link from "next/link";

// interface Props {
//     _id: string,
//     likes: number,
//     photo: string,
//     task: string,
//     creator: Creator,
//     group: string,
//     public: boolean,
// }

// interface Creator {
//     username: string,
//     _id: string
// }
const Post = (post) => {
  const [toggled, setToggled] = useState(false);

  const likePost = async () => {
    try {
      let res = await axios.post(
        `http://localhost:4000/posts/${post.post._id}/like`
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const unlikePost = async () => {
    try {
      let res = await axios.post(
        `http://localhost:4000/posts/${post.post._id}/unlike`
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex
      direction="column"
      align="start"
      justify="between"
      className="mt-10 px-10 w-full"
    >
      <Flex className="w-full" align="center" justify="between">
        <div className="text-brown text-3xl">
          <Link href={`/profileOthers?search=${post.post.creator._id}`}>
            {post.post.creator.username}
          </Link>
        </div>
        <Flex className="text-darkbrown" align="center" justify="center">
          <FaHeart className="w-8" size="20" />
          <div>{toggled ? post.post.likes + 1 : post.post.likes}</div>
        </Flex>
      </Flex>
      <div
        className="w-80 bg-cover h-80 rounded-3xl bg-gray mt-2 flex items-end justify-start"
        style={{ backgroundImage: `url(${post.post.photo})` }}
      >
        <Flex
          className={"bg-winered w-8 h-8 rounded-full cursor-pointer m-3"}
          align="center"
          justify="center"
          onClick={async () => {
            if (toggled) {
              await unlikePost();
              setToggled(!toggled);
            } else {
              await likePost();
              setToggled(!toggled);
            }
            // like button
          }}
        >
          {toggled ? (
            <FaHeart className="w-8" color="#ffffff" size="15" />
          ) : (
            <FaRegHeart className="w-8" color="#ffffff" size="15" />
          )}
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
        {post.post.task}
      </div>
    </Flex>
  );
};

export default Post;
