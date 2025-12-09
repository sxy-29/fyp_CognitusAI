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

        const response = "Response to: " + message.text;
        setChatMessages([
            ...newChatMessages,
            {
                id: (chatMessages.length + 1).toString(),
                role: 'assistant',
                parts: [{ type: 'text', text: response }]
            },
            {
      id: (chatMessages.length + 2).toString(),
      role: 'user',
      parts: [{
        type: 'text',
        text: `
## Rules of Hooks
1. Only call hooks at the **top level** (not inside loops, conditions, or nested functions)
2. Only call hooks from **React functions** (components or custom hooks)
\nWould you like to explore more advanced hooks like \`useCallback\` or \`useMemo\`?
\nReact hooks are special functions that let you use React features in function components. The most common ones are:
- **useState** - for managing component state
- **useEffect** - for side effects like data fetching
- **useContext** - for consuming context values
- **useRef** - for accessing DOM elements
        ` }]
    },
    {
      id: (chatMessages.length + 3).toString(),
      role: 'assistant',
      parts: [{
        type: 'text',
        text: `
\`\`\`jsx
// Without useCallback - the function is recreated on every render
const handleClick = () => {
  console.log(count);
};

// With useCallback - the function is only recreated when dependencies change
const handleClick = useCallback(() => {
  console.log(count);
}, [count]);
\`\`\`
This is example codes.\n\n
\`\`\`python
# Load labelled.csv and do an initial inspection
import pandas as pd
from tqdm import tqdm

labelled_df = pd.read_csv('labelled.csv', encoding='ascii')
print(labelled_df.head())
print(labelled_df.describe(include='all'))
\`\`\`
Simple Table:
| Header 1 | Header 2 | Header 3 | Header 3 |
|---|---|---|---|
| Row 1, Col 1 | Row 1, Col 2 | Row 1, Col 3 | Row 1, Col 4 |
| Row 2, Col 1 | Row 2, Col 2 | Row 2, Col 3 | Row 2, Col 4 |
`
      }]
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
