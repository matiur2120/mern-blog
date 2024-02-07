import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-3 w-full mb-8">
      <h2 className="my-7 text-center font-semibold text-3xl">Profile</h2>
      <form className="flex flex-col gap-3">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser?.profilePicture}
            alt="User"
            className="rounded-full w-full h-full border-8 object-cover broder-[lightgray]"
          />
        </div>
        <TextInput
          type="text"
          placeholder="username"
          defaultValue={currentUser?.username}
          name="username"
        />
        <TextInput
          type="email"
          placeholder="email"
          defaultValue={currentUser?.email}
          name="email"
        />
        <TextInput
          type="password"
          name="password"
          defaultValue="**********"
          placeholder="password"
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="flex mt-5 justify-between">
        <span className="text-red-500 cursor-pointer">Dlete Account</span>
        <span className="text-red-400 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
};

export default DashProfile;
