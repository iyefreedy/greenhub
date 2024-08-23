import { LoginCredential } from "@/types";
import API from "@/utils/API";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { User } from "next-auth";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as LoginCredential;
        console.log(email, password);
        

        const res = await API.login({ email, password }); //(5)
        const data = await res.json();
        return data as User;
      },
    }),
  ],
  callbacks: {
    async signIn(params) {
        console.log(params);
        
    },
  }
});

export { handler as GET, handler as POST };
