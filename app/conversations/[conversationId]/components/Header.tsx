"use client";

import { useMemo } from "react";
import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi2";

import { Conversation, User } from "@prisma/client";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";

interface HeaderProps {
    conversation: Conversation & {
        users: User[];
    };
}
const Header: React.FC<HeaderProps> = ({ conversation }) => {
    const otherUser = useOtherUser(conversation);

    const statusText = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.users.length} members`;
        }

        return "Active";
    }, [conversation]);
    return (
        <div
            className="
                bg-white
                w-full
                flex
                border-b-[1px]
                sm:px-4
                py-3
                px-4
                lg:px-6
                justify-between
                items-center
                shadow-sm
            "
        >
            <div className="flex gap-3 items-center">
                <Link
                    className="
                        lg:hidden
                        block
                        text-sky-500
                        hover:text-sky-600
                        transition
                        cursor-pointer
                        duration-500
                    "
                    href="/conversations"
                >
                    <HiChevronLeft size={32} />
                </Link>
                <Avatar user={otherUser} />
                <div className="flex flex-col">
                    <div>{conversation.name || otherUser.name}</div>
                    <div className="text-sm font-light text-neutral-500">
                        {statusText}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
