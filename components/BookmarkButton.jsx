'use client';
import { FaBookmark } from "react-icons/fa";
import bookmark from "@/app/actions/bookmark";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userID = session?.user?.id;

  const handleClick = async () => {
    if (!userID) {
      toast.error("You must be logged in to bookmark a property.");
      return;
    }
    bookmark( property._id).then((res) => {
      if (res.error) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
      }
  });

  }
  return (
    <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2
    px-4 rounded-full flex items-center justify-center " onClick={handleClick}>
      <FaBookmark class="mr-2" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
