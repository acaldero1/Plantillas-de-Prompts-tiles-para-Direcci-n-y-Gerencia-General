
import React, { useState } from 'react';
import { SOLUTIONS, SECTORS } from './constants';
import { SolutionType, SectorType, PromptLibrary } from './types';
import { generateLibrary } from './services/geminiService';
import PromptCard from './components/PromptCard';

const App: React.FC = () => {
  const [solution, setSolution] = useState<SolutionType>(SOLUTIONS[0]);
  const [sector, setSector] = useState<SectorType>(SECTORS[0]);
  const [loading, setLoading] = useState(false);
  const [library, setLibrary] = useState<PromptLibrary | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateLibrary(solution, sector);
      setLibrary(data);
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error al generar los prompts. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F5]">
      {/* Header */}
      <header className="bg-[#0F2A24] text-white py-14 px-6 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
        </div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Plantillas de Prompts: Dirección & Gerencia General</h1>
          <p className="text-[#6FBF9C] text-lg font-light max-w-3xl mx-auto">
            Herramientas estratégicas diseñadas para liderar la transformación con IA desde la alta dirección.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 -mt-12 pb-24 relative z-20">
        {/* Interaction Panel */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 mb-12 border border-gray-100">
          <div className="space-y-10">
            {/* Solution Buttons */}
            <div>
              <label className="block text-sm font-bold text-[#1F4D3F] mb-4 uppercase tracking-widest text-center">Selecciona el Enfoque de la Solución</label>
              <div className="flex flex-wrap justify-center gap-3">
                {SOLUTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => setSolution(s)}
                    className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 border-2 ${
                      solution === s 
                        ? 'bg-[#1F4D3F] border-[#1F4D3F] text-white shadow-md transform scale-105' 
                        : 'bg-white border-gray-100 text-gray-600 hover:border-[#6FBF9C] hover:text-[#1F4D3F]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Sector Buttons */}
            <div>
              <label className="block text-sm font-bold text-[#1F4D3F] mb-4 uppercase tracking-widest text-center">Sector Industrial / Empresarial</label>
              <div className="flex flex-wrap justify-center gap-3">
                {SECTORS.map(s => (
                  <button
                    key={s}
                    onClick={() => setSector(s)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 border ${
                      sector === s 
                        ? 'bg-[#6FBF9C] border-[#6FBF9C] text-[#0F2A24] shadow-sm transform scale-105' 
                        : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-white hover:border-[#6FBF9C]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`group px-12 py-5 rounded-full font-extrabold text-white transition-all transform hover:scale-105 shadow-xl flex items-center gap-3 ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0F2A24] hover:bg-[#1F4D3F]'
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Generando Estrategia...</span>
                </>
              ) : (
                <>
                  <span>Construir Biblioteca para Gerencia</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-800 px-6 py-4 rounded-xl mb-8 shadow-sm">
            <p className="font-bold">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Results Container */}
        {library && !loading && (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Strategic Context */}
            <section className="bg-[#1F4D3F] text-white p-10 rounded-3xl shadow-lg relative">
              <div className="absolute top-4 right-8 text-4xl opacity-20 font-serif italic text-[#6FBF9C]">Memo Ejecutivo</div>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                <span className="p-2 bg-[#6FBF9C]/20 rounded-lg text-[#6FBF9C]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                </span>
                Visión Estratégica
              </h2>
              <p className="text-lg font-light leading-relaxed border-l-2 border-[#6FBF9C] pl-8 py-2 italic text-gray-100">
                "{library.context}"
              </p>
            </section>

            {/* Main Categories */}
            <div className="space-y-14">
              {library.mainPrompts.map((category, idx) => (
                <section key={idx}>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-0.5 flex-grow bg-gray-200"></div>
                    <h3 className="text-xl font-extrabold text-[#0F2A24] uppercase tracking-widest px-4">
                      {category.category}
                    </h3>
                    <div className="h-0.5 flex-grow bg-gray-200"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {category.items.map((item, pIdx) => (
                      <PromptCard key={pIdx} item={item} />
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* High Impact Prompts */}
            <section className="bg-white border border-gray-100 p-12 rounded-[3rem] shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#6FBF9C]/5 rounded-full -mr-32 -mt-32"></div>
              <h2 className="text-3xl font-black text-[#0F2A24] mb-10 text-center">Análisis de Alto Impacto</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                {library.advancedPrompts.map((item, idx) => (
                  <div key={idx} className="group bg-[#F9FAFB] p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-500 border border-transparent hover:border-gray-100">
                     <h4 className="text-xs font-bold text-[#1F4D3F] opacity-60 uppercase tracking-widest mb-6">
                      Módulo: {item.objective}
                    </h4>
                    <div className="bg-white p-6 rounded-xl mb-6 font-mono text-sm leading-relaxed text-[#0F2A24] border border-gray-50 shadow-inner">
                      {item.prompt}
                    </div>
                    <p className="text-xs text-gray-500 flex items-center gap-2">
                      <span className="text-[#6FBF9C] font-bold">●</span> Recomendación: {item.tip}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Leadership Guidelines */}
            <section className="bg-[#0F2A24] p-12 rounded-[3rem] text-white">
              <h2 className="text-2xl font-bold mb-10 text-[#6FBF9C]">Protocolos de Liderazgo para IA</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {library.bestPractices.map((practice, idx) => (
                  <div key={idx} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="text-[#6FBF9C] mb-4 text-2xl font-bold">0{idx + 1}</div>
                    <p className="text-gray-300 text-sm leading-relaxed">{practice}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {!library && !loading && (
          <div className="text-center py-24">
            <div className="inline-block p-6 bg-white rounded-full shadow-sm mb-6">
              <svg className="w-12 h-12 text-[#6FBF9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#1F4D3F] mb-2">Configure su Panel Directivo</h3>
            <p className="text-gray-500 text-sm">Seleccione el área de enfoque y sector para generar una biblioteca personalizada para gerencia.</p>
          </div>
        )}
      </main>
      
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[#0F2A24] font-bold text-xl tracking-tighter">AI Executive<span className="text-[#6FBF9C]">Suite</span></div>
          <div className="text-gray-400 text-[10px] uppercase tracking-widest">
            © {new Date().getFullYear()} Soluciones de IA para Alta Dirección • Optimizadas con Gemini 3 Flash
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
