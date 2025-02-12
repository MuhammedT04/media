// import React from "react";
import { useSelector } from "react-redux";
// import { Toaster } from "sonner";

import images from "../../../public/image/2a41476338a196fb6458d6dee1916768.webp";
import image3 from "../../../public/image/0a88b7c9399cc6d68ba1a8bcf54c3138.jpg";
import image4 from "../../../public/image/157d37f29fd1105c56d00fd5dd9dd78d.jpg";
import image5 from "../../../public/image/202aab280f5441c9ae9cc50298eac259.jpg";
import image6 from "../../../public/image/5680c85b9f447926d7b075778e2652af.jpg";
import { Button } from "../ui/button";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { useEffect, useState } from "react";
import { RootState } from "../../state/store";
import { APIURL } from "../../constants";

interface Media {
  _id: string;
  mediaUrl: string;
  type: "image" | "video";
}

const Home = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [uploadData, setuploadData] = useState<Media[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [media, setMedia] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [refrash,setRefresh] = useState(false)
  const [open, setOpen] = useState(false);

  if(refrash){
    window.location.reload()
  }
 
useEffect(() => {
  fetch(APIURL+"/api/auth/getMedia")
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched Data:", data);

      const formattedData = data.map((item : any) => ({
        _id: item._id,
        mediaUrl:`${APIURL}/uploads/${item.image}`,
        type: item.imageType.startsWith("video") ? "video" : "image",
      }));

      console.log("Formatted Media Data:", formattedData);
      setuploadData(formattedData);
    })
    .catch((err) => console.error("Error fetching media:", err));
}, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setFile(file);
      const fileUrl = URL.createObjectURL(file);
      setMedia(fileUrl);

      if (file.type.startsWith("image/")) {
        setFileType("image");
      } else if (file.type.startsWith("video/")) {
        setFileType("video");
      } else {
        setMedia(null);
        setFileType(null);
      }
    }
  };
  const handleRemove = () => {
    setMedia(null);
    setFileType(null);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user", JSON.stringify(currentUser?._id));

    try {
      const res = await fetch(APIURL+"/api/auth/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`Error: ${res.statusText}`);
  
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="min-h-screen w-[98.5vw] bg-[#F3F4F6]">
      <main className="container mx-auto px-4 pt-12">
        <div className="text-center mb-4">
          <h1 className="text-[8rem] leading-none tracking-tight font-light">
            dream
          </h1>
          <h1 className="">Capture the moment, upload the memories.</h1>
          <div className="flex justify-center max-w-screen mt-9">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                {currentUser ? (
                  <button className=" bg-black font-medium rounded-full w-48 h-14 text-white hover:bg-gray-800 transition-colors cursor-pointer text-center">
                    Upload
                  </button>
                ) : (
                  ""
                )}
              </DialogTrigger>
              <DialogContent className="sm:max-w-screen">
                <DialogHeader>
                  <DialogTitle className="text-center mt-6 mb-3">
                    Upload
                  </DialogTitle>
                  {/* <DialogDescription>
                 Video or Photo
                  </DialogDescription> */}
                </DialogHeader>
                <div className="grid gap-4 py-4 ml-7">
                  <div className="relative flex flex-col items-center justify-center w-96 h-52 border-dashed border-[1px] border-gray-500 rounded-lg p-4 overflow-hidden">
                    {media ? (
                      <>
                        {fileType === "image" ? (
                          <img
                            src={media}
                            alt="Uploaded Preview"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <video
                            src={media}
                            controls
                            className="w-full h-full object-cover rounded-lg"
                          />
                        )}
                        <button
                          onClick={handleRemove}
                          className="absolute top-2 right-2 bg-white rounded-full p-1 text-gray-700 hover:text-red-500"
                        >
                          <IoIosClose size={24} />
                        </button>
                      </>
                    ) : (
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <BsFillCloudUploadFill
                          size={70}
                          className="text-gray-500 hover:text-gray-700 transition-colors"
                        />
                        <input
                          id="file-upload"
                          type="file"
                          accept="image/*,video/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    )}
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*,video/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={async () => {
                      await handleUpload();
                      setMedia(null);
                      setOpen(false);
                      setRefresh(true)
                    }}
                  >
                    Upload
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-2xl overflow-hidden bg-blue-100 h-48 md:h-64">
              <img
                src={image3}
                alt="Fashion model on red chair"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="rounded-2xl overflow-hidden bg-blue-200 relative h-48 md:h-64">
              <img
                src={images}
                alt="Person with drink"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="rounded-2xl overflow-hidden bg-green-100 relative h-48 md:h-64">
              <img
                src={image4}
                alt="Person with microphone"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="rounded-2xl overflow-hidden bg-purple-100 col-span-2 h-48 md:h-64">
              <img
                src={image5}
                alt="Two people posing"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="rounded-2xl overflow-hidden bg-yellow-100 relative h-48 md:h-64">
              <img
                src={image6}
                alt="Person sitting"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {uploadData.map((item) => (
              <div
                key={item._id}
                className="rounded-2xl overflow-hidden bg-yellow-100 relative h-48 md:h-64"
              >
                {item.type === "image" ? (
                  <img
                   src={item.mediaUrl}
                    alt="Uploaded"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <video
                    loop
                    autoPlay
                    muted
                    controls
                    playsInline
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  >
                    <source src={item.mediaUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
