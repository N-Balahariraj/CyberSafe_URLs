import { useState } from "react";
import { Shield, ShieldAlert, CheckCircle, XCircle } from 'lucide-react';
import { callFlask } from "../APIs/callFlask";


const HomePage = () => {
  const [url, setUrl] = useState('');
  const [clearAnalysisResult, setClearAnalysisResult] = useState<boolean>(false)
  const [analysisResult, setAnalysisResult] = useState<{
    safe: boolean;
    score: number;
    type: string;
    threats: string[];
    recommendations: string[];
  } | null>(null);

  const getRandomScore = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const handleAnalyze = async (url: string): Promise<boolean> => {
    if (url.trim() == '') {
      alert('Enter an url')
      return false;
    }
    const result = await callFlask(url);

    const baseResult = {
      safe: false,
      score: getRandomScore(20, 50),
      type: result.prediction,
      threats: ['Unknown threats detected', 'Potential malware'],
      recommendations: [
        'Enable HTTPS for all connections',
        'Update security headers',
        'Implement CSP policy',
      ],
    };

    if (result.prediction === 'benign') {
      baseResult.safe = true;
      baseResult.score = getRandomScore(90, 100);
      baseResult.threats = [];
    }
    else if (result.prediction === 'phishing') {
      baseResult.score = getRandomScore(50, 80);
      baseResult.threats = ['Credential theft', 'Fake login pages', 'Email phishing links'];
    }
    else if (result.prediction === 'defacement') {
      baseResult.score = getRandomScore(50, 80);
      baseResult.threats = ['Unauthorized content changes', 'Malicious scripts injected'];
    }

    setAnalysisResult(baseResult);
    return true;

  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8 md:py-0">
      <div
        className="absolute inset-0 -z-10 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right bottom, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1)),
            url("https://images.unsplash.com/photo-1557683316-973673baf926?w=1600")
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#1a1a2e] to-[#2a1a4a]" />

      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
        <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          WebAI Hub
        </span>
        <span className="block text-lg md:text-xl mt-4 text-white/60 font-normal">
          Advanced Website Analysis & Security Platform
        </span>
      </h1>

      <div className="w-full max-w-3xl px-4 space-y-8">
        <div className="bg-white/10 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-2xl border border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-purple-400" size={28} />
            <h2 className="text-2xl font-semibold text-white">Website Analysis</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL (e.g., https://example.com)"
              className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-lg"
            />
            <button
              onClick={() => {
                if (!clearAnalysisResult) {
                  handleAnalyze(url).then((status) => status && setClearAnalysisResult(true))
                }
                else {
                  setAnalysisResult(null);
                  setUrl('');
                  setClearAnalysisResult(false);
                }
              }}
              className="px-8 py-4 bg-gradient-to-r from-purple-400 to-pink-600 rounded-xl text-white font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
            >
              {clearAnalysisResult ? 'Clear' : 'Analyze Now'}
            </button>
          </div>
        </div>

        {analysisResult && (
          <div className="bg-white/10 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-2xl border border-white/5">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <CheckCircle className="text-purple-400" size={28} />
                Analysis Results
              </h2>
              <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-400/20 to-pink-600/20">
                {analysisResult.safe ? (
                  <>
                    <Shield className="text-green-400" size={24} />
                    <span className="text-green-400 font-semibold">Secure Website</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="text-red-400" size={24} />
                    <span className="text-red-400 font-semibold">Security Risks Detected</span>
                  </>
                )}
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6 mb-6 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/80 text-lg">Security Score</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                    {analysisResult.score}
                  </span>
                  <span className="text-white/60">/100</span>
                </div>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3 p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-400 to-pink-600 shadow-lg transition-all duration-500"
                  style={{ width: `${analysisResult.score}%` }}
                />
              </div>
            </div>

            {analysisResult.threats.length > 0 && (
              <div className="mb-6 p-6 rounded-xl bg-red-500/10 border border-red-500/20">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <ShieldAlert className="text-red-400" size={24} />
                  {analysisResult.type.charAt(0).toUpperCase() + analysisResult.type.slice(1)}
                </h3>
                <div className="space-y-3">
                  {analysisResult.threats.map((threat, index) => (
                    <div key={index} className="flex items-center gap-3 text-red-400">
                      <XCircle size={18} />
                      <span>{threat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-6 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="text-purple-400" size={24} />
                Recommendations
              </h3>
              <div className="space-y-3">
                {analysisResult.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-center gap-3 text-white/80">
                    <CheckCircle size={18} className="text-purple-400" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;