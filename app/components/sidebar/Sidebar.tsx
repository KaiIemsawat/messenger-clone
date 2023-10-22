import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

export default async function Sidebar({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentUser = await getCurrentUser();
    return (
        <div className="h-full">
            <DesktopSidebar
                currentUser={currentUser!}
                // {currentUser!} --> Use '!' to tell that it's possible for 'currentUser' to be 'null'
            />
            <MobileFooter />
            <main className="lg:pl-20 h-full">{children}</main>
        </div>
    );
}
