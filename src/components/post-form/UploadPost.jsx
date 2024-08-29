import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import authService from "../../appwrite/auth";
import Cropper from "react-easy-crop";
import getCroppedImg from "./utils/cropImage"; // Utility function to crop the image

function UploadPost({ post }) {
  const [isStatus, setIsStatus] = useState();
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  // const [aspect, setAspect] = useState(16 / 9); // State for aspect ratio

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        UserName: post?.userName || "",
        status: post?.status || true,
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (data.status === "active") {
      setIsStatus(true);
    } else {
      setIsStatus(false);
    }

    if (post) {
      const file = croppedImage
        ? await appwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const userID = userData.$id;
        const status = isStatus;
        const UserName = userName;
        const dbPost = await appwriteService.createPost({
          ...data,
          status,
          userID,
          UserName,
        });
        console.log(isStatus);

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  useEffect(() => {
    authService.getCurrentUser().then((user) => {
      setUserName(user.name);
      console.log(userName);
    });
  });

  return (
    <>
      <div className="bg-primaryLight-4 dark:bg-primaryDark-4 bg-opacity-50 dark:bg-opacity-10 rounded-[1.75rem] p-5 w-full md:h-[80vh] xl:h-[60vh] h-[85vh] overflow-auto overflow-x-hidden ">
        <div className="">
          <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-col justify-center items-center gap-5"
          >
            <div className="w-full px-2">
              <div className="min-h-[40vh] w-full bg-primaryLight-2 dark:bg-primaryDark-3 p-5 rounded-[1rem] mb-10 ">
                {croppedImage ? (
                  <div className="flex justify-center items-center">
                    <img
                      src={croppedImage}
                      className="mt-0 rounded-[1rem] w-[30rem] h-[30rem] object-contain xl:w-1/2 "
                      alt="Cropped Preview"
                    />
                  </div>
                ) : image ? (
                  <>
                    <div className="crop-container">
                      <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={1/1} // Updated aspect prop
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                      />
                    </div>
                    <div className="flex md:flex-row flex-col justify-center items-center gap-5 text-center mt-5">
                      <Button className="bg-primaryLight-4 dark:bg-primaryDark-1" onClick={showCroppedImage}>Crop Image</Button>
                      {/* <Button className="bg-primaryLight-4 dark:bg-primaryDark-1" onClick={toggleAspect} >
                        Change Aspect Ratio
                      </Button> */}
                    </div>
                  </>
                ) : post ? (
                  <div className="w-full flex justify-center items-center">
                    <img
                      src={appwriteService.getFilePreview(post.featuredImage)}
                      alt={post.title}
                      className="mt-0 rounded-[1rem] w-[30rem] xl:w-1/2 "
                    />
                  </div>
                ) : null}

                <Input
                  label=""
                  type="file"
                  id="Postinput"
                  className=" bg-primaryLight-2 dark:bg-primaryDark-3 outline-none border-none hidden "
                  onInput={(e) => handleImageChange(e)}
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  {...register("image", { required: !post })}
                />
                <div className="text-center">
                  <label
                    htmlFor="Postinput"
                    className="cursor-pointer text-center"
                  >
                    Select Image 
                  </label>
                </div>
              </div>
            </div>
            <div className="w-full px-2">
              <div className="flex gap-5 md:flex-row flex-col">
                <Input
                  label="Title :"
                  placeholder="Title"
                  labelClassName="border-none hidden"
                  className="outline-none border-none bg-white"
                  {...register("title", { required: true })}
                />
                <Input
                  label="Slug :"
                  placeholder="Slug :"
                  labelClassName="border-none hidden"
                  className="outline-none border-none bg-white"
                  {...register("slug", { required: true })}
                  onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), {
                      shouldValidate: true,
                    });
                  }}
                />
              </div>
              <RTE
                label="Content :"
                name="content"
                control={control}
                defaultValue={getValues("content")}
              />
            </div>
            <div className="flex justify-center items-center gap-5 mb-10">
              <Select
                options={["active", "inactive"]}
                label="Status"
                className="bg-primaryLight-2 dark:bg-primaryDark-3"
                {...register("status", { required: true })}
              />
              <Button
                type="submit"
                bgColor={post ? "bg-green-500" : undefined}
                className=""
              >
                {post ? "Update" : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UploadPost;
