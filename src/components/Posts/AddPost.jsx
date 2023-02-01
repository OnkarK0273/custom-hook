import React, { useState } from "react";
import { Button, Center, Input, useToast } from "@chakra-ui/react";
import { addPost } from "./posts.api";
import useAddpost from "../../Hook/useAddpost";
import { useEffect } from "react";

const AddPost = ({ onAddPost }) => {
  const toast = useToast();
  const {loading,success,error,data,handleAddpost} = useAddpost(addPost)
  const [message, setMessage] = useState("");

  useEffect(()=>{
    if(success){
      toast({
        title: `suucessfully added`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      })
      onAddPost(data)
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
    <Center>
      <Input value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button onClick={()=>{handleAddpost({content:message})}} colorScheme="green" isLoading={loading}>
        Add
      </Button>
    </Center>
  );
};

export default AddPost;
