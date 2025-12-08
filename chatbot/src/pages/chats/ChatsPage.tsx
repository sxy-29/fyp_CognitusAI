"use client";

import { useLocation } from 'react-router';
import { useChat } from '@ai-sdk/react';
import type { UIMessage } from "ai";
import { Conversation } from '@/components/ai-elements/conversation';
import { PromptInputProvider } from '@/components/ai-elements/prompt-input';
import { useState } from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

function ChatsPage() {
  const initialMessages: UIMessage[] = [
    {
      id: '1',
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
      id: '2',
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
  ];

  const { messages, setMessages, status } = useChat({
    messages: initialMessages
  });

  // handle the files sent from FilesPage
  const location = useLocation();
  // const fileState = location.state?.files ?? [];
  const [fileState] = useState(() => location.state?.files ?? []);

  return (
    <div className="flex flex-col h-full">
      <Conversation>
        <ChatMessages chatMessages={messages} />
      </Conversation>

      <PromptInputProvider>
        <ChatInput chatMessages={messages} setChatMessages={setMessages} files={fileState} />
      </PromptInputProvider>
    </div>
  );
}

export default ChatsPage;