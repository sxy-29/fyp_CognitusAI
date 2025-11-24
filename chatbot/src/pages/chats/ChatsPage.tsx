import { useState } from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import type { ChatMessageProps } from './ChatMessages';
import { useLocation } from 'react-router';

function ChatsPage() {
  const [chatMessages, setChatMessages] = useState<ChatMessageProps[]>([{
    message: 'hello chatbot',
    sender: 'user'
  }, {
    message: 'Hello! How can I help you?',
    sender: 'agent'
  }, {
    message: 'What is the weather today?',
    sender: 'user'
  }, {
    message: 'The weather is sunny with a high of 25°C.',
    sender: 'agent'
  }]);

  // handle the files sent from FilesPage
  const location = useLocation();
  const fileState = location.state?.files ?? [];

  function addMessage(newChatMessages: ChatMessageProps[]) {
    setChatMessages(newChatMessages);
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ChatMessages chatMessages={chatMessages} />

      <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm z-20">
        <ChatInput chatMessages={chatMessages} setChatMessages={addMessage} files={fileState} />
      </div>
    </div>
  );

}

export default ChatsPage;