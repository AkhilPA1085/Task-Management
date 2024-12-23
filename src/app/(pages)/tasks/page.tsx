"use client";
import List from "@/app/components/tables/List";
import CreateTodoModal from "@/app/components/modals/CreateTodoModal";
import { getCreatedTaskByMe } from "@/services/posts.services";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProfileState } from "@/app/types/definitions";


const Tasks = () => {
  const [posts,setPosts]=useState([])
  const profileReducer = useSelector((state: ProfileState) => state.profile);
  const { user } = profileReducer;
  const userPosts = useCallback(
    async () => {
      if(!user?._id) return;
      await getCreatedTaskByMe(user?._id).then((res) => {
        if (res?.success) {
          setPosts(res?.todos)
        }
      });
    },[user?._id]
  ) 

  useEffect(() => {
    userPosts();
  }, [userPosts]);

  

  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-teal-700 text-2xl font-bold">
          Tasks Created
        </h1>
        <CreateTodoModal fetchData={userPosts}/>
      </div>
      <List fetchData={userPosts} posts={posts} />
    </>
  );
};

export default Tasks;
