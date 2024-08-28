'use client';
import { FaBookmark } from "react-icons/fa";
import bookmark from "@/app/actions/bookmark";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import checkBookmarkStatus from "@/app/actions/check_bm_status";

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userID = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
   if (!userID) {
     setLoading(false);
     return;
   }
   checkBookmarkStatus(property._id).then((res) => {
    if (res.error) return toast.error(res.error);
    if (res.isBookmarked) setIsBookmarked(res.isBookmarked);
    setLoading(false);
   });
 }, [property._id, userID, checkBookmarkStatus]);

  const handleClick = async () => {
    if (!userID) {
      toast.error("You must be logged in to bookmark a property.");
      return;
    }
    bookmark(property._id).then((res) => {
      if (res.error) return toast.error(res.error);
      setIsBookmarked(res.isBookmarked);
      toast.success(res.message);

  });



  }
  if (loading) {
    return <p className="text-center">Loading...</p>;
  }
  return isBookmarked ? (
    <button className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2
    px-4 rounded-full flex items-center justify-center " onClick={handleClick}>
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2
    px-4 rounded-full flex items-center justify-center " onClick={handleClick}>
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
