import type { ChatMessageProps } from './ChatMessages';

function ChatMessage({ message, sender }: ChatMessageProps) {
    const isUser = sender === 'user';

    return (
        <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"} my-2`}>
            <div className={`p-3 rounded-2xl max-w-md inline-block ${isUser ? "bg-blue-500 text-white" : "bg-gray-100"} break-words whitespace-pre-wrap` }>
                {message}
            </div>
        </div>
    );
}

export default ChatMessage;