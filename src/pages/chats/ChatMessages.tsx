import { ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageAttachment, MessageAttachments, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import type { UIMessage } from "ai";
import { useEffect } from "react";
import { useStickToBottomContext } from "use-stick-to-bottom";
import ExpandedCodeBlock from "./ExpandedCodeBlock";

function ChatMessages({ chatMessages }: { chatMessages: UIMessage[] }) {
    const { scrollToBottom } = useStickToBottomContext();

    useEffect(() => {
        const timer = setTimeout(() => {
            scrollToBottom();
        }, 30);

        return () => clearTimeout(timer);
    }, [chatMessages]);

    function handleText(text: string) {
        const segments = [];
        const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g; // Regex to match code blocks

        let lastIndex = 0;
        let match;

        while ((match = codeBlockRegex.exec(text)) !== null) {
            const [full, lang, code] = match;

            // Add text before code block
            if (match.index > lastIndex) {
                segments.push({
                    type: "text",
                    language: "text",
                    content: text.slice(lastIndex, match.index),
                });
            }

            // Add the code block
            segments.push({
                type: "code",
                language: lang || "text",
                content: code.trim(),
            });

            lastIndex = match.index + full.length;
        }

        // Add any remaining text after the final code block
        if (lastIndex < text.length) {
            segments.push({
                type: "text",
                language: "text",
                content: text.slice(lastIndex),
            });
        }

        return segments;
    }

    // temp
    const text = `This code snippet loads a CSV file named 'labelled.csv' and performs an initial inspection of its contents.
- Import pandas and tqdm libraries
- Read 'labelled.csv' into a DataFrame
- Print the first few rows of the DataFrame
- Print a descriptive summary of the DataFrame`

    return (
        <>
            <ConversationContent>
                {chatMessages.map((chatMessage, index) => (
                    <Message key={index} from={chatMessage.role} >
                        <div className="ml-auto flex w-fit flex-wrap gap-2 ">
                            {chatMessage.parts
                                ?.filter(p => p.type === "file")
                                .map((filePart, idx) => (
                                    <MessageAttachments key={idx}>
                                        <MessageAttachment data={filePart} />
                                    </MessageAttachments>
                                ))}
                        </div>
                        <MessageContent>
                            {chatMessage.parts?.map((part, i) => {
                                switch (part.type) {
                                    case "text":
                                        const segments = handleText(part.text);
                                        return segments.map((segment, j) => {
                                            if (segment.type === "text") {
                                                return (
                                                    <MessageResponse key={`${chatMessage.id}-${i}-${j}`}>
                                                        {segment.content}
                                                    </MessageResponse>
                                                );
                                            }

                                            if (segment.type === "code") {
                                                return (
                                                    <ExpandedCodeBlock
                                                        key={`${chatMessage.id}-${i}-${j}`}
                                                        title="Code"
                                                        code={segment.content}
                                                        language={segment.language}
                                                        codeExplanation={text}
                                                    />
                                                );
                                            }
                                        });
                                    default:
                                        return null;
                                }
                            })}
                        </MessageContent>
                    </Message>
                ))}
            </ConversationContent>
            <ConversationScrollButton />
        </>
    );
}

export default ChatMessages;