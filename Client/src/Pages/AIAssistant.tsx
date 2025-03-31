const AIAssistantPage = () => (
  <div className="container mx-auto px-4 py-12 md:py-16 min-h-[80vh] flex flex-col">
    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
      <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
        AI Assistant
      </span>
    </h2>
    <div className="flex-1 bg-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl border border-white/5 max-w-5xl mx-auto">
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto mb-6 space-y-4">
          <div className="bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-2xl p-6 max-w-[80%] border border-white/5">
            <p className="text-white/90 text-lg">How can I assist you with website analysis today?</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
          <input
            type="text"
            placeholder="Ask about website security, performance, or SEO..."
            className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-lg"
          />
          <button className="px-8 py-4 bg-gradient-to-r from-purple-400 to-pink-600 rounded-xl text-white font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-purple-500/20 whitespace-nowrap">
            Send Message
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default AIAssistantPage;