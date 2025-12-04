import { useRef, useState } from "react";
import { SendHorizontal} from "lucide-react";
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
    PromptInputTools 
} from "@/components/ai-elements/prompt-input";

interface ChatInputProps {
    chatMessages: UIMessage[];
    setChatMessages: (newChatMessages: UIMessage[]) => void;
    files?: File[];
}

function ChatInput({ chatMessages, setChatMessages, files }: ChatInputProps) {
    const [inputText, setInputText] = useState<string>('');

    const [uploadedFiles, setUploadedFiles] = useState<File[]>(files ?? []);
    const fileInputRef = useRef<HTMLInputElement>(null);

    function sendMessage(): void {
        if (inputText.trim() === '') return;

        const newChatMessages: UIMessage[] = [
            ...chatMessages,
            {
                id: chatMessages.length.toString(),
                role: 'user',
                parts: [{ type: 'text', text: inputText }]
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

                    <PromptInputSubmit disabled={inputText.trim() === ''}>
                        <SendHorizontal />
                    </PromptInputSubmit>
                </PromptInputFooter>
            </PromptInput>
        </div>
    );
}

export default ChatInput;
