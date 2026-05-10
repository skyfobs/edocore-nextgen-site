'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  options?: string[];
  inputType?: 'text' | 'email' | 'phone' | 'select';
}

interface ChatData {
  name: string;
  email: string;
  phone: string;
  courseInterest: string;
  studentType: string;
  message: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [chatData, setChatData] = useState<ChatData>({
    name: '',
    email: '',
    phone: '',
    courseInterest: '',
    studentType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversationFlow = [
    {
      botMessage: "👋 Hello! Welcome to EduCore NextGen Institute. I'm here to help you explore our courses and programs. Type 'Hi' or any message to get started!",
      field: 'greeting',
      inputType: 'text' as const,
      skipCapture: true, // Don't capture this as data
    },
    {
      botMessage: "Great! Let's get started. What's your name?",
      field: 'name',
      inputType: 'text' as const,
    },
    {
      botMessage: "Nice to meet you, {name}! 😊 Which course are you interested in?",
      field: 'courseInterest',
      inputType: 'select' as const,
      options: [
        'Finance & Management',
        'Health & Safety Training',
        'AI Consultancy',
        'Cloud Consultancy',
        'German Language',
        'Multimedia',
        'Not Sure Yet',
      ],
    },
    {
      botMessage: "Great choice! Are you a student or a working professional?",
      field: 'studentType',
      inputType: 'select' as const,
      options: ['Student', 'Working Professional', 'Job Seeker', 'Other'],
    },
    {
      botMessage: "What's your email address? We'll send you course details and updates.",
      field: 'email',
      inputType: 'email' as const,
    },
    {
      botMessage: "And your phone number? (Include country code)",
      field: 'phone',
      inputType: 'phone' as const,
    },
    {
      botMessage: "Almost done! Is there anything specific you'd like to know about the course or our institute?",
      field: 'message',
      inputType: 'text' as const,
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMessage = {
        id: Date.now(),
        text: conversationFlow[0].botMessage,
        isBot: true,
        inputType: conversationFlow[0].inputType,
        options: conversationFlow[0].options,
      };
      setMessages([initialMessage]);
    }
  }, [isOpen]);

  const handleSendMessage = (value?: string) => {
    const messageText = value || userInput.trim();
    if (!messageText) return;

    const currentFlow = conversationFlow[currentStep];
    
    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    
    // Only capture data if not a skipCapture step (like initial greeting)
    if (!currentFlow.skipCapture) {
      setChatData((prev) => ({
        ...prev,
        [currentFlow.field]: messageText,
      }));
    }

    setUserInput('');

    setTimeout(() => {
      if (currentStep < conversationFlow.length - 1) {
        const nextStep = currentStep + 1;
        const nextFlow = conversationFlow[nextStep];
        
        let botMessageText = nextFlow.botMessage;
        if (nextFlow.botMessage.includes('{name}')) {
          botMessageText = nextFlow.botMessage.replace('{name}', messageText);
        }

        const botMessage: Message = {
          id: Date.now() + 1,
          text: botMessageText,
          isBot: true,
          inputType: nextFlow.inputType,
          options: nextFlow.options,
        };

        setMessages((prev) => [...prev, botMessage]);
        setCurrentStep(nextStep);
        
        // Clear input if next step has options (to prevent typing when options are shown)
        if (nextFlow.options) {
          setUserInput('');
        }
      } else {
        submitData({ ...chatData, [currentFlow.field]: messageText });
      }
    }, 800);
  };

  const submitData = async (finalData: ChatData) => {
    setIsSubmitting(true);
    
    const submittingMessage: Message = {
      id: Date.now(),
      text: "📤 Submitting your information...",
      isBot: true,
    };
    setMessages((prev) => [...prev, submittingMessage]);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: finalData.name,
          email: finalData.email,
          phone: finalData.phone,
          subject: `Course Inquiry - ${finalData.courseInterest}`,
          message: finalData.message || 'No additional message provided',
          courseInterest: finalData.courseInterest,
          studentType: finalData.studentType,
          source: 'chatbot',
        }),
      });

      if (response.ok) {
        const successMessage: Message = {
          id: Date.now() + 1,
          text: "✅ Thank you! Your information has been submitted successfully. Our team will contact you soon at " + finalData.email + ". Have a great day! 🎉",
          isBot: true,
        };
        setMessages((prev) => [...prev, successMessage]);
      } else if (response.status === 429) {
        const data = await response.json();
        const retryAfter = response.headers.get('Retry-After');
        const minutes = retryAfter ? Math.ceil(parseInt(retryAfter) / 60) : 10;
        
        const rateLimitMessage: Message = {
          id: Date.now() + 1,
          text: `⏱️ You've sent too many messages recently. Please try again in ${minutes} minute${minutes > 1 ? 's' : ''}. If urgent, please call us directly.`,
          isBot: true,
        };
        setMessages((prev) => [...prev, rateLimitMessage]);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "❌ Oops! Something went wrong. Please try again or contact us directly at info@educorenextgen.com",
        isBot: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOptionClick = (option: string) => {
    handleSendMessage(option);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentStep(0);
    setChatData({
      name: '',
      email: '',
      phone: '',
      courseInterest: '',
      studentType: '',
      message: '',
    });
    setUserInput('');
    setIsSubmitting(false);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-[#003366] text-white p-4 rounded-full shadow-2xl hover:bg-[#004488] transition-all duration-300 z-50 flex items-center justify-center group"
          aria-label="Open chat"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            1
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col border-2 border-gray-200 overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-[#003366] to-[#004488] text-white p-4 flex items-center justify-between rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">🎓</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">EduCore Assistant</h3>
                <p className="text-xs text-white/80">Online • Typically replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
              aria-label="Close chat"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] ${message.isBot ? 'bg-white border border-gray-200' : 'bg-[#003366] text-white'} rounded-2xl px-4 py-3 shadow-sm`}>
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  
                  {message.options && (
                    <div className="mt-3 space-y-2">
                      {message.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleOptionClick(option)}
                          disabled={isSubmitting}
                          className="w-full text-left px-3 py-2 bg-gray-100 hover:bg-[#003366] hover:text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          {currentStep < conversationFlow.length && !isSubmitting && (
            <div className="p-4 bg-white border-t border-gray-200">
              {(() => {
                // Check if last bot message has options
                const lastBotMessage = [...messages].reverse().find(m => m.isBot);
                const hasOptions = lastBotMessage?.options && lastBotMessage.options.length > 0;
                
                return (
                  <>
                    <div className="flex space-x-2">
                      <input
                        type={conversationFlow[currentStep]?.inputType || 'text'}
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={hasOptions ? "Please select an option above" : "Type your message..."}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#003366] text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                        disabled={isSubmitting || hasOptions}
                      />
                      <button
                        onClick={() => handleSendMessage()}
                        disabled={!userInput.trim() || isSubmitting || hasOptions}
                        className="bg-[#003366] text-white p-3 rounded-full hover:bg-[#004488] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Send message"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      {hasOptions ? "👆 Click an option above to continue" : "Press Enter to send"}
                    </p>
                  </>
                );
              })()}
            </div>
          )}

          {/* Reset Button (after submission) */}
          {currentStep >= conversationFlow.length && !isSubmitting && (
            <div className="p-4 bg-white border-t border-gray-200">
              <button
                onClick={resetChat}
                className="w-full bg-[#003366] text-white py-3 rounded-full hover:bg-[#004488] transition-colors font-medium"
              >
                Start New Conversation
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
