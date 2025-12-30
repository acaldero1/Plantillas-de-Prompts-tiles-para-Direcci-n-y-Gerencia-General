
import React, { useState } from 'react';
import { PromptItem } from '../types';

interface PromptCardProps {
  item: PromptItem;
}

const PromptCard: React.FC<PromptCardProps> = ({ item }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(item.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Función simple para resaltar visualmente los placeholders en la UI
  const formatPrompt = (text: string) => {
    const parts = text.split(/(\[[^\]]+\])/g);
    return parts.map((part, i) => 
      part.startsWith('[') && part.endsWith(']') 
        ? <span key={i} className="bg-[#6FBF9C]/20 text-[#1F4D3F] font-bold px-1 rounded border border-[#6FBF9C]/30">{part}</span>
        : part
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4 gap-4">
        <h4 className="text-sm font-bold text-[#1F4D3F] uppercase tracking-wider leading-tight">
          🎯 {item.objective}
        </h4>
        <button
          onClick={handleCopy}
          className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-200 ${
            copied 
              ? 'bg-[#6FBF9C] text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {copied ? '¡Copiado!' : 'Copiar Plantilla'}
        </button>
      </div>
      
      <div className="bg-[#F4F6F5] p-4 rounded-lg mb-4 border-l-4 border-[#0F2A24] flex-grow">
        <p className="text-sm text-gray-800 font-mono whitespace-pre-wrap leading-relaxed">
          {formatPrompt(item.prompt)}
        </p>
      </div>
      
      <p className="text-xs text-gray-500 italic mt-auto">
        💡 <span className="font-semibold text-gray-700">Tip de ajuste:</span> {item.tip}
      </p>
    </div>
  );
};

export default PromptCard;
