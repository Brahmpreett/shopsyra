import { useState } from "react";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hi, I'm Shopsyra. I'm online and ready to help you shop smarter!" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white shadow-lg">
        <span className="text-2xl font-bold">Shopsyra</span>
        <span className="ml-2 text-green-300 text-sm animate-pulse">● Online</span>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-background via-background/80 to-background">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-md px-4 py-3 rounded-2xl shadow-md animate-fade-in ${
              msg.from === "bot"
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white self-start"
                : "bg-foreground text-background self-end ml-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input box */}
      <div className="p-4 flex gap-3 bg-foreground/10 backdrop-blur-md border-t border-cyan-500/30">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl border border-cyan-500/40 bg-background/70 text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;