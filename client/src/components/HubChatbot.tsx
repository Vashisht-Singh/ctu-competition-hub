import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Bot,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

interface ChatAction {
  label: string;
  path: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  actions?: ChatAction[];
}

interface ChatPayload {
  reply: string;
  actions?: ChatAction[];
  suggestions?: string[];
  roleLabel?: string;
}

function renderFormattedLine(line: string, keyPrefix: string) {
  // Split by **bold** or `code`
  const parts = line.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={`${keyPrefix}-${idx}`} className="font-semibold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={`${keyPrefix}-${idx}`}
          className="px-1.5 py-0.5 rounded bg-slate-200/80 text-indigo-800 text-[11px] font-mono"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return (
        <em key={`${keyPrefix}-${idx}`} className="italic text-slate-600">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <React.Fragment key={`${keyPrefix}-${idx}`}>{part}</React.Fragment>;
  });
}

function BotMessageContent({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-1.5 text-[13px] leading-relaxed text-slate-700">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="h-1" />;

        if (trimmed.startsWith('- ')) {
          return (
            <div key={i} className="flex items-start gap-2 pl-1">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
              <span>{renderFormattedLine(trimmed.slice(2), `b-${i}`)}</span>
            </div>
          );
        }

        const numMatch = trimmed.match(/^(\d+\.)\s+(.*)$/);
        if (numMatch) {
          return (
            <div key={i} className="flex items-start gap-2 pl-1">
              <span className="font-bold text-indigo-600 shrink-0 min-w-[18px]">{numMatch[1]}</span>
              <span>{renderFormattedLine(numMatch[2], `n-${i}`)}</span>
            </div>
          );
        }

        return <p key={i}>{renderFormattedLine(trimmed, `p-${i}`)}</p>;
      })}
    </div>
  );
}

export const HubChatbot: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [roleLabel, setRoleLabel] = useState<string>('Visitor / Guest');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loadWelcome = async () => {
    setIsLoading(true);
    try {
      const res = await api.getChatWelcome();
      const data = res.data as ChatPayload | undefined;
      if (res.success && data) {
        setMessages([
          {
            id: `welcome-${Date.now()}`,
            sender: 'bot',
            text: data.reply,
            actions: data.actions,
          },
        ]);
        setSuggestions(data.suggestions || []);
        setRoleLabel(data.roleLabel || 'Visitor / Guest');
      }
    } catch {
      setMessages([
        {
          id: `fallback-${Date.now()}`,
          sender: 'bot',
          text:
            'Hi! Welcome to **CTU Competition Hub**. Ask me anything about the **Faculty → HOD → HOS → DSW** approval hierarchy, submitting proposals, or registering for competitions!',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Reload role-aware welcome whenever auth state changes
  useEffect(() => {
    loadWelcome();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id, user?.roles?.join(',')]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  const sendMessage = async (textToSend?: string) => {
    const query = (textToSend ?? input).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const historyPayload = messages.slice(-6).map((m) => ({ sender: m.sender, text: m.text }));
      const res = await api.askChatbot(query, historyPayload);
      const data = res.data as ChatPayload | undefined;
      if (res.success && data) {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: data.reply,
            actions: data.actions,
          },
        ]);
        if (data.suggestions?.length) {
          setSuggestions(data.suggestions);
        }
        if (data.roleLabel) {
          setRoleLabel(data.roleLabel);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            sender: 'bot',
            text: 'Sorry, I could not process that right now. Please try another question.',
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'bot',
          text: 'Unable to reach the assistant server. Make sure the backend server is running.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleActionClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Chat Panel */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] sm:w-[410px] h-[560px] max-h-[82vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-700 via-blue-700 to-indigo-800 text-white px-4 py-3.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-9 w-9 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold tracking-tight truncate">CTU Hub Guide</h3>
                  <Sparkles className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                </div>
                <p className="text-[11px] text-blue-100 truncate">
                  Mode: <span className="font-semibold text-white">{roleLabel}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={loadWelcome}
                title="Reset conversation"
                className="p-1.5 rounded-lg text-blue-100 hover:text-white hover:bg-white/15 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Minimize"
                className="p-1.5 rounded-lg text-blue-100 hover:text-white hover:bg-white/15 transition-colors"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/70">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 shadow-sm ${
                    m.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-sm text-[13px]'
                      : 'bg-white border border-slate-200/90 rounded-bl-sm'
                  }`}
                >
                  {m.sender === 'user' ? (
                    <p className="leading-relaxed">{m.text}</p>
                  ) : (
                    <BotMessageContent text={m.text} />
                  )}
                </div>

                {/* Quick Navigation Buttons */}
                {m.sender === 'bot' && m.actions && m.actions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                    {m.actions.map((act) => (
                      <button
                        key={act.path + act.label}
                        type="button"
                        onClick={() => handleActionClick(act.path)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors"
                      >
                        <span>{act.label}</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start">
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-3.5 py-2.5 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce" />
                    <span className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:120ms]" />
                    <span className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:240ms]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          {suggestions.length > 0 && (
            <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => sendMessage(s)}
                  disabled={isLoading}
                  className="shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200/80 transition-colors whitespace-nowrap"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask how the hub works..."
              className="flex-1 text-sm px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 bg-slate-50"
            />
            <button
              type="button"
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close CTU Hub Guide' : 'Open CTU Hub Guide'}
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-600/30 hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all"
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <>
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs font-bold tracking-wide pr-0.5">Hub Guide</span>
          </>
        )}
      </button>
    </div>
  );
};
