import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, Volume2, Plus, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "👋 Hi, I'm Shopsyra. I'm online and ready to help you shop smarter!" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("chat", {
        body: { messages: [...messages, userMessage] },
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: "audio/webm" });
        await transcribeAudio(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setAudioChunks(chunks);
      setIsRecording(true);
    } catch (error) {
      console.error("Recording error:", error);
      toast({
        title: "Error",
        description: "Could not access microphone",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    setIsLoading(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Audio = reader.result?.toString().split(",")[1];
        
        const { data, error } = await supabase.functions.invoke("voice-to-text", {
          body: { audio: base64Audio },
        });

        if (error) throw error;

        if (data.text) {
          await sendMessage(data.text);
        }
      };
    } catch (error) {
      console.error("Transcription error:", error);
      toast({
        title: "Error",
        description: "Failed to transcribe audio",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const playAudio = async (text: string) => {
    try {
      const { data, error } = await supabase.functions.invoke("text-to-speech", {
        body: { text },
      });

      if (error) throw error;

      const audioData = atob(data.audioContent);
      const audioArray = new Uint8Array(audioData.length);
      for (let i = 0; i < audioData.length; i++) {
        audioArray[i] = audioData.charCodeAt(i);
      }
      const audioBlob = new Blob([audioArray], { type: "audio/mp3" });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("TTS error:", error);
      toast({
        title: "Error",
        description: "Failed to play audio",
        variant: "destructive",
      });
    }
  };

  const handleNewChat = () => {
    setMessages([
      { role: "assistant", content: "👋 Hi, I'm Shopsyra. I'm online and ready to help you shop smarter!" },
    ]);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-border glass-effect">
        <button
          onClick={() => navigate("/")}
          className="text-xl md:text-2xl font-bold text-foreground hover:text-primary transition-colors"
        >
          Shopsyra
        </button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNewChat}
          className="hover:bg-accent"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </header>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4 md:p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
            >
              <div
                className={`max-w-[85%] md:max-w-[70%] px-4 py-3 rounded-2xl shadow-md ${
                  msg.role === "assistant"
                    ? "bg-card text-card-foreground border border-border"
                    : "bg-foreground text-background"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm md:text-base whitespace-pre-wrap break-words">{msg.content}</p>
                  {msg.role === "assistant" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0 hover:bg-accent"
                      onClick={() => playAudio(msg.content)}
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-card text-card-foreground border border-border px-4 py-3 rounded-2xl shadow-md">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border glass-effect p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-2 md:gap-3">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message... (Shift + Enter for new line)"
                className="min-h-[60px] max-h-[200px] resize-none pr-12 bg-background border-input text-foreground placeholder:text-muted-foreground"
                disabled={isLoading}
              />
              <Button
                variant="ghost"
                size="icon"
                className={`absolute right-2 bottom-2 ${
                  isRecording ? "text-destructive animate-pulse" : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isLoading}
              >
                <Mic className="h-5 w-5" />
              </Button>
            </div>
            <Button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              className="h-[60px] px-6 bg-foreground text-background hover:bg-foreground/90"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
