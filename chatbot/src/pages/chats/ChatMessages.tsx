import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

export type ChatMessageProps = {
    message: string;
    sender: 'user' | 'agent';
}

function ChatMessages({ chatMessages }: { chatMessages: ChatMessageProps[] }) {
    const chatMessagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages]);

    return (
        <div className="flex-1 overflow-y-auto p-4">
            {chatMessages.map((chatMessage, index) => (
                <ChatMessage
                    message={chatMessage.message}
                    sender={chatMessage.sender}
                    key={index}
                />
            ))}
            <div ref={chatMessagesRef} />
        </div>
    );
}

export default ChatMessages;