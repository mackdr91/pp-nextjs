import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

export async function getSessionUser() {

        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return null;
        }

        return{
            user: session.user,
            userID: session.user.id

        }

}