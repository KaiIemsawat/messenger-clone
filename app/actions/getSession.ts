import { getServerSession } from "next-auth";

import { authOptions } from "../api/auth/[...nextauth]/route";
// "../api/auth/[...nextauth]/route" <-- created route

export default async function getSession() {
    return await getServerSession(authOptions);
}
