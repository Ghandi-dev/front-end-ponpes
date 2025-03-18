import NextAuth from "next-auth";

import { authOptions } from "@/config/authOptions";

const handler = NextAuth(authOptions);

// 🚀 Penting: Harus diekspor sebagai GET & POST di App Router!
export { handler as GET, handler as POST };
