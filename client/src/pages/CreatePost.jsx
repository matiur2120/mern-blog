import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router";
import { app } from "../firebase.js";

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadError(null);
            setImageUploadProgress(null);
            setFormData({
              ...formData,
              image: downloadURL,
            });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setPublishError("Something went wrong!");
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.post.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong!");
    }
  };

  return (
    <div className="d-flex flex-col min-h-screen max-w-3xl mx-auto p-4">
      <h2 className="text-3xl text-center mb-5 font-semibold">Create a post</h2>
      <form className="flex flex-col mb-8" onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-4">
          <TextInput
            className="flex-1"
            type="text"
            placeholder="Title"
            required
            name="title"
            onChange={handleChange}
          />
          <Select onChange={handleChange} name="category" required>
            <option value="uncatagorize">Select a category</option>
            <option value="nodejs">Nodjs</option>
            <option value="react.js">React.js</option>
            <option value="tailwindCss">TailwindCss</option>
          </Select>
        </div>
        <div className="flex justify-between gap-4 border-4 border-teal-500 border-dotted p-4 mt-4">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            onClick={handleUploadImage}
            outline
            gradientDuoTone="purpleToBlue"
            size="sm"
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0} %`}
                />
              </div>
            ) : (
              "Upload image"
            )}
          </Button>
        </div>
        {imageUploadError && (
          <Alert className="mt-3" color="failure">
            {imageUploadError}
          </Alert>
        )}
        {formData?.image && (
          <img
            src={formData?.image}
            alt="post image"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something"
          className="mb-12 mt-5 h-72"
          required
          onChange={(value) => {
            setFormData({
              ...formData,
              content: value,
            });
          }}
        />
        <Button type="submit" className="mt-8" gradientDuoTone="purpleToPink">
          Publish
        </Button>
        {publishError && (
          <Alert className="mt-4" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
