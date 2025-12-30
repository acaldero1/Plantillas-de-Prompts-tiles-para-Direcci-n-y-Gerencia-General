
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
      setError('Ocurrió un error al generar los prompts operativos. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F5]">
      {/* Header */}
      <header className="bg-[#1F4D3F] text-white py-14 px-6 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M22 7l-9.12 5L22 17V7zM2 17l9.12-5L2 7v10zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
        </div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Plantillas de Prompts: Operaciones & Procesos</h1>
          <p className="text-[#6FBF9C] text-lg font-light max-w-3xl mx-auto">
            Maximiza la eficiencia operativa, reduce desperdicios y optimiza tu cadena de valor mediante ingeniería de prompts avanzada.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 -mt-12 pb-24 relative z-20">
        {/* Interaction Panel */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 mb-12 border border-gray-100">
          <div className="space-y-10">
            {/* Solution Buttons */}
            <div>
              <label className="block text-sm font-bold text-[#1F4D3F] mb-4 uppercase tracking-widest text-center">Foco de Implementación Operativa</label>
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
              <label className="block text-sm font-bold text-[#1F4D3F] mb-4 uppercase tracking-widest text-center">Contexto del Sector</label>
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
                  <span>Optimizando Flujos...</span>
                </>
              ) : (
                <>
                  <span>Generar Biblioteca Operativa</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-800 px-6 py-4 rounded-xl mb-8 shadow-sm">
            <p className="font-bold">Error de Sistema</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Results Container */}
        {library && !loading && (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Operational Context */}
            <section className="bg-[#0F2A24] text-white p-10 rounded-3xl shadow-lg relative">
              <div className="absolute top-4 right-8 text-4xl opacity-20 font-serif italic text-[#6FBF9C]">Hoja de Ruta</div>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-[#6FBF9C]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                Visión Operativa
              </h2>
              <p className="text-lg font-light leading-relaxed border-l-2 border-[#6FBF9C] pl-8 py-2 italic text-gray-200">
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
              <h2 className="text-3xl font-black text-[#0F2A24] mb-10 text-center">Ingeniería de Procesos Avanzada</h2>
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

            {/* Operations Guidelines */}
            <section className="bg-[#1F4D3F] p-12 rounded-[3rem] text-white">
              <h2 className="text-2xl font-bold mb-10 text-[#6FBF9C]">Protocolos de Eficiencia & Mejora Continua</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {library.bestPractices.map((practice, idx) => (
                  <div key={idx} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="text-[#6FBF9C] mb-4 text-2xl font-bold">A{idx + 1}</div>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#1F4D3F] mb-2">Configuración de Planta/Servicio</h3>
            <p className="text-gray-500 text-sm">Seleccione el área de implementación para recibir sus plantillas de optimización.</p>
          </div>
        )}
      </main>
      
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[#0F2A24] font-bold text-xl tracking-tighter">Ops<span className="text-[#6FBF9C]">Intelligenz</span></div>
          <div className="text-gray-400 text-[10px] uppercase tracking-widest">
            © {new Date().getFullYear()} Soluciones de IA para Operaciones • Eficiencia Escalable
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
