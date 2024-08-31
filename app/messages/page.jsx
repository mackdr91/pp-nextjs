import connectdb from "@/config/database";
import Message from "@/models/Message";
import "@/models/Property";
import { convertToSerializedObject } from "@/utils/convertToObject";
import { getSessionUser } from "@/utils/getSessionUser";
import MessageCard from "@/components/MessageCard";

const Messages = async () => {
  await connectdb();
  const sessionUser = await getSessionUser();
  const { userID } = sessionUser;

  const readMessages = await Message.find({ receiver: userID, read: true })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

    console.log(readMessages)

  const unreadMessages = await Message.find({ receiver: userID, read: false })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

    console.log(unreadMessages)

  const messages = [ ...unreadMessages, ...readMessages].map((messageDoc) => {
    const message = convertToSerializedObject(messageDoc);
    message.sender = convertToSerializedObject(messageDoc.sender);
    message.property = convertToSerializedObject(messageDoc.property);
    return message;
  });

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white p-6 rounded-lg shadow-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow-md border m-4 md:m-0">
                <p>No messages found.</p>
              </div>
            ) : (
              messages.map((message) => (

                <MessageCard key={message._id} message={message} />

              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Messages;
