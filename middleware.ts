import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/",
    },
});

// To protect using deeplink while user not logged in
export const config = {
    matcher: ["/users/:path*"],
};
