import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Send, Sparkles } from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";

const suggestions = [
  "What services do you offer?",
  "How do I book an appointment?",
  "What are your prices?",
  "How can I become a tailor?",
];

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm your TailorHUB assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      } else {
        throw new Error(data.error || "No response from AI");
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-50">
      {/* HERO */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="info" className="mb-4 bg-white/20 text-white border-0">
              <Sparkles className="w-3.5 h-3.5" />
              AI Assistant
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              Ask Our AI Assistant
            </h1>
            <p className="text-white/80 text-lg mt-4 max-w-2xl mx-auto">
              Get instant answers to your questions about tailoring services,
              bookings, and more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CHAT INTERFACE */}
      <section className="py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Card className="h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-surface-100">
              <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <h3 className="font-semibold text-surface-900">TailorHUB Assistant</h3>
                <p className="text-xs text-surface-500">Always here to help</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-primary-500 text-white rounded-br-none"
                        : "bg-surface-100 text-surface-900 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-surface-100 p-4 rounded-2xl rounded-bl-none">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-surface-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                      <div className="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="pb-4">
                <p className="text-xs font-semibold text-surface-500 mb-2">Quick suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setInput(suggestion)}
                      className="px-3 py-2 bg-surface-100 hover:bg-surface-200 rounded-xl text-xs font-medium text-surface-700 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="pt-4 border-t border-surface-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 px-4 py-3 bg-surface-50 border-2 border-surface-200 rounded-xl text-surface-900 placeholder:text-surface-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                />
                <Button
                  onClick={handleSend}
                  loading={loading}
                  disabled={!input.trim()}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}