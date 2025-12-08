import { useEffect, useRef, useState } from "react";
import { SendHorizontal } from "lucide-react";
import type { UIMessage } from "ai";
import {
    PromptInput,
    PromptInputActionAddAttachments,
    PromptInputAttachment,
    PromptInputAttachments,
    PromptInputBody,
    PromptInputFooter,
    PromptInputHeader,
    PromptInputSubmit,
    PromptInputTextarea,
    PromptInputTools,
    usePromptInputController,
    type PromptInputMessage
} from "@/components/ai-elements/prompt-input";

interface ChatInputProps {
    chatMessages: UIMessage[];
    setChatMessages: (newChatMessages: UIMessage[]) => void;
    files?: File[];
}

function ChatInput({ chatMessages, setChatMessages, files }: ChatInputProps) {
    const [inputText, setInputText] = useState<string>('');
    const promptController = usePromptInputController();
    const initialisedRef = useRef(false);

    useEffect(() => {
        if (files && files.length > 0 && !initialisedRef.current) {
            promptController.attachments.add(files as any);
            initialisedRef.current = true;
        }
    }, [files, promptController.attachments]);

    function sendMessage(message: PromptInputMessage) {
        const hasText = Boolean(message.text);
        const hasAttachments = Boolean(message.files?.length);

        if (!(hasText || hasAttachments)) {
            return;
        }

        const userParts: UIMessage["parts"] = [];
        if (hasText) {
            userParts.push({ type: 'text', text: message.text });
        }
        if (hasAttachments) {
            userParts.push(...message.files!)
        }

        const newChatMessages: UIMessage[] = [
            ...chatMessages,
            {
                id: chatMessages.length.toString(),
                role: 'user',
                parts: userParts
            }
        ];

        setChatMessages(newChatMessages);

        const response = "Chatbot.getResponse(inputText)";
        setChatMessages([
            ...newChatMessages,
            {
                id: (chatMessages.length + 1).toString(),
                role: 'assistant',
                parts: [{ type: 'text', text: response }]
            }
        ]);

        setInputText('');
    }

    return (
        <div className="p-2">
            <PromptInput onSubmit={sendMessage} globalDrop multiple className="bg-muted rounded-2xl">
                <PromptInputHeader>
                    <PromptInputAttachments>
                        {(attachment) => <PromptInputAttachment data={attachment} />}
                    </PromptInputAttachments>
                </PromptInputHeader>

                <PromptInputBody>
                    <PromptInputTextarea
                        value={inputText}
                        placeholder="Connect data and start chatting..."
                        onChange={(e) => setInputText(e.target.value)}
                    />
                </PromptInputBody>

                <PromptInputFooter>
                    <PromptInputTools>
                        <PromptInputActionAddAttachments />
                    </PromptInputTools>

                    <PromptInputSubmit disabled={!inputText.trim()}>
                        <SendHorizontal />
                    </PromptInputSubmit>
                </PromptInputFooter>
            </PromptInput>
        </div>
    );
}

export default ChatInput;
