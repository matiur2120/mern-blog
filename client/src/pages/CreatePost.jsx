import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  return (
    <div className="d-flex flex-col min-h-screen max-w-3xl mx-auto p-4">
      <h2 className="text-3xl text-center mb-5 font-semibold">Create a post</h2>
      <form className="flex flex-col mb-8" action="">
        <div className="flex flex-col sm:flex-row gap-4">
          <TextInput
            className="flex-1"
            type="text"
            placeholder="Title"
            required
          />
          <Select name="category" required>
            <option value="uncatagorize">Select a category</option>
            <option value="nodejs">Nodjs</option>
            <option value="react.js">React.js</option>
            <option value="tailwindCss">TailwindCss</option>
          </Select>
        </div>
        <div className="flex justify-between gap-4 border-4 border-teal-500 border-dotted p-4 mt-4">
          <FileInput type="file" accept="image/*" />
          <Button outline gradientDuoTone="purpleToBlue" size="sm">
            Upload image
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Write something"
          className="mb-12 mt-5 h-72"
          required
        />
        <Button type="submit" className="mt-8" gradientDuoTone="purpleToPink">
          Publish
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
