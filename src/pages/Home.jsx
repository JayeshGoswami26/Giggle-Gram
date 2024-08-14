import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode, Scrollbar, Mousewheel } from "swiper/modules";

import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import HomeImage from "../../public/1.gif";
import HomeImage2 from "../../public/popular5.png";
import HomeImage3 from "../../public/popular4.png";

import avatarsImg from "../../public/s-7.jpg";
import avatarsImg2 from "../../public/trend1.png";
import avatarsImg3 from "../../public/product2.png";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full">
        <Container>
          <div className="flex flex-wrap">
            <div className="w-full">
              <div className="butterflyHero bg-primaryLight-4 dark:bg-primaryDark-3 bg-opacity-100 bg-no-repeat absolute top-[50%] left-[50%] xl:left-[40%]  "></div>
              <h1 className="relative z-10 text-right font-bold hover:text-gray-500 mr-5">
                <div className=" text-white dark:text-primaryDark-4 text-[2rem] md:text-[2.5rem] ">
                  Welcome To The Giggle Gram
                </div>
              </h1>
            </div>
          </div>
          <div className="flex w-full ">
            <div className="xl:w-1/2 w-0 "></div>
            <div className="xl:w-1/2 flex flex-col justify-center items-center gap-5 w-full relative z-10 min-h-[45vh] h-[70vh] md:h-[60vh] xl:h-[50vh] bg-primaryLight-4 dark:bg-primaryDark-4 dark:bg-opacity-10 bg-opacity-50 m-5 rounded-[1.75rem]">
              <Swiper
                direction={"vertical"}
                // slidesPerView={1}
                breakpoints={{
                  320: {
                    centeredSlides: false,
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  // When window width is >= 480px
                  350: {
                    centeredSlides: false,
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  390: {
                    centeredSlides: false,
                    slidesPerView: 1.5,
                    spaceBetween: 10,
                  },
                  500: {
                    centeredSlides: false,
                    slidesPerView: 1.5,
                    spaceBetween: 10,
                  },
                  820 : {
                    centeredSlides: false,
                    slidesPerView: 1.5,
                    spaceBetween: 10,
                  },
                  1024: {
                    centeredSlides: false,
                    slidesPerView: 1.5,
                    spaceBetween: 10,
                  },
                  1280: {
                    centeredSlides: false,
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                }}
                freeMode={true}
                scrollbar={true}
                mousewheel={true}
                modules={[FreeMode, Scrollbar, Mousewheel]}
                className="mySwiper"
              >
                <SwiperSlide className="p-2 xl:p-5">
                  <div className="w-[100%] backdrop-blur-sm h-[auto] shadow-xl border-[1px] border-primaryLight-2 dark:border-primaryDark-4 p-5 rounded-[1rem] flex flex-col justify-center items-center gap-5 mb-5">
                    <img
                      className="w-[14rem] h-[14rem] rounded-[1rem]"
                      src={HomeImage}
                      alt=""
                    />
                    <div className="flex gap-5 items-center">
                      <img
                        className="w-[3rem] h-[3rem] rounded-full"
                        src={avatarsImg}
                        alt=""
                      />
                      <p className="">
                        Meet the glass butterfly: proof that even insects can
                        have a flair for the dramatic!
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="p-2 xl:p-5">
                  <div className="w-[100%] backdrop-blur-sm h-[auto] shadow-xl border-[1px] border-primaryLight-2 dark:border-primaryDark-4 p-5 rounded-[1rem] flex flex-col justify-center items-center gap-5">
                    <img
                      className="w-[14rem]  rounded-[1rem]"
                      src={HomeImage2}
                      alt=""
                    />
                    <div className="flex gap-5 items-center">
                      <img
                        className="w-[3rem] h-[3rem] rounded-full"
                        src={avatarsImg2}
                        alt=""
                      />
                      <p className="">
                        A cartoon skull with exaggerated, wide eyes and a big,
                        goofy grin is sporting a tiny party hat and glasses
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="p-2 xl:p-5">
                  <div className="w-[100%] backdrop-blur-sm h-[auto] shadow-xl border-[1px] border-primaryLight-2 dark:border-primaryDark-4 p-5 rounded-[1rem] flex flex-col justify-center items-center gap-5">
                    <img
                      className="w-[14rem]  rounded-[1rem]"
                      src={HomeImage3}
                      alt=""
                    />
                    <div className="flex gap-5 items-center">
                      <img
                        className="w-[3rem] h-[3rem] rounded-full"
                        src={avatarsImg3}
                        alt=""
                      />
                      <p className="">
                        A cartoon skull with exaggerated, wide eyes and a big,
                        goofy grin is sporting a tiny party hat and glasses
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
          
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
