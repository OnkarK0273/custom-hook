import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Center,
  CircularProgress,
  Flex,
  Heading,
  useToast,
} from "@chakra-ui/react";

import AddPost from "./AddPost";
import Post from "./Post";
import { getPosts } from "./posts.api";
import useAPI from "../../Hook/useAPI";

const Posts = () => {
  const toast = useToast();
  const {loading,success,data,setData,getData,error} = useAPI(getPosts)
  const onAddPost = (post) => {
    console.log("post",post)
    setData([...data, post]);
  };
  const onDelete = (id) => {
    setData(data.filter((p) => p.id !== id));
  };

  useEffect(() => {
    if(error){
      toast({
        title: `something might wrong`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      })
    }else if(success){
      toast({
        title: `suucessfully get data`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error,success]);

  return (
    <Box>
      <Center my={2} gap={4}>
        <Heading>Posts</Heading>
        <Button isLoading={loading} loadingText="Fetching..." onClick={getData}>
          Refresh
        </Button>
      </Center>
      <AddPost onAddPost={onAddPost} />
      {loading && <CircularProgress isIndeterminate color="green.300" />}
      <Flex direction="column" gap={2} my={2}>
        {success &&
          data.map((post) => (
            <Post key={post.id} {...post} onDelete={onDelete} />
          ))}
      </Flex>
    </Box>
  );
};

export default Posts;
