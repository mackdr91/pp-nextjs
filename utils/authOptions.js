import GoogleProvider from "next-auth/providers/google";
import connectdb from "@/config/database";
import User from "@/models/User";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
          },
        },
      }),
      // ...add more providers here
    ],
    callbacks: {
      async signIn({profile}) {
        // Connect to your DB
        await connectdb();
        // Check if the user exists
        const userExists = await User.findOne({email: profile.email});
        // If it does, return true
        if (!userExists) {
          // Truncate the name
          const name = profile.name.slice(0,20);

          // Create a new user
          await User.create({
            email: profile.email,
            username,
            image: profile.picture,
          });
        }

        return true;

      },
      async session({session}) {
        // Get the user from your DB
        const user = await User.findOne({email: session.user.email});
        // Assign the user to the session
        session.user.id = user._id.toString();
        // Return the session
        return session;

      }
    },
  };
