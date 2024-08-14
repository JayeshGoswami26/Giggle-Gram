import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import PreviewLoader from "../components/Loader/PreviewLoader";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode, Scrollbar, Mousewheel } from "swiper/modules";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {}, []);
  appwriteService.getPosts([]).then((posts) => {
    if (posts) {
      setIsLoading(false);
      setPosts(posts.documents);
    }
  });
  return (
    <div className="w-full py-8 pt-0">
      <Container>
        <div className="flex flex-wrap justify-center items-center">
          <>
            <div className="xl:w-full  flex flex-row flex-wrap  items-center gap-5 w-full relative z-10 min-h-[45vh] h-[70vh] md:h-[60vh] xl:h-[62vh] bg-primaryLight-4 dark:bg-primaryDark-4 dark:bg-opacity-10 bg-opacity-50 m-5 rounded-[1.75rem] overflow-x-auto overflow-auto p-5 ">
              {isLoading ? (
                <>
                  <h2 className="w-full text-xl text-center text-primaryLight-4 dark:text-primaryDark-4">
                    Hang tight! Your post will be up shortly
                  </h2>
                  <PreviewLoader />
                </>
              ) : (
                posts.map((post) => (
                  <div key={post.$id} className="p-0 xl:w-1/4 md:w-1/2 w-full ">
                    <PostCard {...post} />
                  </div>
                ))
              )}
            </div>
          </>
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
