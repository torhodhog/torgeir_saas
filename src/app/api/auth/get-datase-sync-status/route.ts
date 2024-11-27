import { authRouter } from "@/server/routers/auth-router";

export const runtime = "edge";

export { authRouter as GET, authRouter as POST };
