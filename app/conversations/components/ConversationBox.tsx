"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { clsx } from "clsx";
import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";

interface ConversationBoxProps {
    data: FullConversationType;
    selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
    data,
    selected,
}) => {
    const otherUser = useOtherUser(data);
    const session = useSession();
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(`/conversation/${data.id}`);
    }, [data.id, router]);

    const lastMessage = useMemo(() => {
        const messages = data.message || [];
    }, []);

    return <div>ConversationBox</div>;
};

export default ConversationBox;
