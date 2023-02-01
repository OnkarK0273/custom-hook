import React, { useEffect } from "react";
import { Box, Button, Flex, useToast } from "@chakra-ui/react";
import { deletePost } from "./posts.api";
import useAddpost from "../../Hook/useAddpost";

const Post = ({ id, content, onDelete }) => {
  const {loading,success,error,handleAddpost} = useAddpost(deletePost)

  const toast = useToast();
  

  

  useEffect(()=>{
    if(success){
      toast({
        title: `suucessfully Deleted`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      })
      onDelete(id)
    }

    if(error){
      toast({
        title: `something might wrong`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      })
    }
  },[success,error,toast])

  return (
    <Flex gap={2}>
      <Box>{content}</Box>
      <Button
        size="sm"
        isLoading={loading}
        loadingText="Deleting..."
        onClick={()=>{handleAddpost(id)}}
      >
        Delete
      </Button>
    </Flex>
  );
};

export default Post;
