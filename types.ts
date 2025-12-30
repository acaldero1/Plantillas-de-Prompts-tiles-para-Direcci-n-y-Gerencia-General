
export type SolutionType = 'Vibe Coding' | 'Automatizaciones con IA' | 'Agentes de IA' | 'Creación de contenido con IA' | 'Análisis de datos con IA';

export type SectorType = 'Educación' | 'Salud' | 'Retail y Comercio' | 'Finanzas' | 'Manufactura' | 'Logística y Transporte' | 'Construcción' | 'Energía y Minería' | 'Agricultura' | 'Turismo' | 'Servicios profesionales' | 'Tecnología' | 'Gobierno / Sector público';

export interface PromptItem {
  objective: string;
  prompt: string;
  tip: string;
}

export interface PromptLibrary {
  context: string;
  mainPrompts: {
    category: string;
    items: PromptItem[];
  }[];
  advancedPrompts: PromptItem[];
  bestPractices: string[];
}
