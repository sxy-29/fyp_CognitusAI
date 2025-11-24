import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal, X, Upload } from "lucide-react";
import type { ChatMessageProps } from "./ChatMessages";

interface ChatInputProps {
    chatMessages: ChatMessageProps[];
    setChatMessages: (newChatMessages: ChatMessageProps[]) => void;
    files?: File[];
}

function ChatInput({ chatMessages, setChatMessages, files }: ChatInputProps) {
    const [inputText, setInputText] = useState<string>('');

    const [uploadedFiles, setUploadedFiles] = useState<File[]>(files ?? []);
    const fileInputRef = useRef<HTMLInputElement>(null);

    function sendMessage(): void {
        if (inputText.trim() === '') return;

        const newChatMessages: ChatMessageProps[] = [
            ...chatMessages,
            {
                message: inputText,
                sender: 'user'
            }
        ];

        setChatMessages(newChatMessages);

        const response = "Chatbot.getResponse(inputText)";
        setChatMessages([
            ...newChatMessages,
            {
                message: response,
                sender: 'agent'
            }
        ]);

        setInputText('');
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setUploadedFiles((prev) => [...prev, ...files]);
    };

    const triggerUpload = () => {
        fileInputRef.current?.click();
    };

    const removeFile = (index: number) => {
        setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="p-4 border-t bg-white space-y-2">
            {/* ===== Uploaded File Preview (Shown only if file exists) ===== */}
            {uploadedFiles.length > 0 && (
                <div className="flex flex-wrap gap-3">
                    {uploadedFiles.map((file, index) => (
                        <div
                            key={index}
                            className="relative flex items-center gap-2 bg-muted px-3 py-2 rounded-lg border shadow-sm"
                        >
                            {/* Remove Button */}
                            <button
                                onClick={() => removeFile(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                            >
                                <X className="w-3 h-3" />
                            </button>

                            {/* File Type Icon */}
                            <div className="w-8 h-8 flex items-center justify-center bg-secondary rounded-md text-xs">
                                {file.type.startsWith("image/") ? "🖼️" : "📄"}
                            </div>

                            {/* File Name */}
                            <p className="text-sm max-w-[150px] truncate">{file.name}</p>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex items-center gap-2 bg-muted rounded-xl p-2 shadow-sm">
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} multiple />
                <Button variant="ghost" size="icon" className="flex-shrink-0 hover:bg-transparent" onClick={triggerUpload} >
                    <Upload className="w-5 h-5" />
                </Button>

                <div className="flex-1 min-w-0">
                    <Textarea
                        value={inputText}
                        placeholder="Connect data and start chatting..."
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full resize-none max-h-32 overflow-auto border-0 bg-transparent focus-visible:ring-0 p-2 leading-normal min-h-0"
                        rows={1}
                    />
                </div>

                <Button variant="ghost" size="icon" className="flex-shrink-0 hover:bg-transparent" onClick={sendMessage}>
                    <SendHorizontal className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
}

export default ChatInput;
