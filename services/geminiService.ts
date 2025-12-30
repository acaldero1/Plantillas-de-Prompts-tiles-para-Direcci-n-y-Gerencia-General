
import { GoogleGenAI, Type } from "@google/genai";
import { PromptLibrary, SolutionType, SectorType } from "../types";

export const generateLibrary = async (
  solution: SolutionType,
  sector: SectorType
): Promise<PromptLibrary> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Actúa como un Consultor de Estrategia y Operaciones para la Alta Dirección (C-Level).
    Tu objetivo es generar una biblioteca de prompts útiles EXCLUSIVAMENTE para DIRECCIÓN Y GERENCIA GENERAL.
    
    Contexto de la solicitud:
    - Tipo de solución de IA a implementar: ${solution}
    - Sector empresarial: ${sector}

    REGLA CRÍTICA DE FORMATO:
    Todos los prompts DEBEN incluir campos de reemplazo entre corchetes para que el directivo los personalice.
    Ejemplo: "Como Director General de [NOMBRE_EMPRESA], necesito evaluar el impacto de [ESTRATEGIA] en [KPI_CLAVE]..."
    
    Sigue estrictamente esta estructura:
    1. Contexto estratégico (máx 3 líneas) sobre por qué un Gerente General debería usar estas herramientas.
    2. Lista principal de 12-15 prompts divididos en categorías como: Toma de Decisiones, Optimización Operativa, Gestión de Talento, Visión Estratégica.
    3. 5 prompts avanzados enfocados en análisis predictivo, dashboards directivos e integración de sistemas.
    4. 5 consejos prácticos para que un directivo obtenga los mejores resultados sin ser experto técnico.

    Los prompts deben sonar ejecutivos, profesionales y estar enfocados en retorno de inversión (ROI), eficiencia y liderazgo.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          context: { type: Type.STRING },
          mainPrompts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING },
                items: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      objective: { type: Type.STRING },
                      prompt: { type: Type.STRING },
                      tip: { type: Type.STRING }
                    },
                    required: ["objective", "prompt", "tip"]
                  }
                }
              },
              required: ["category", "items"]
            }
          },
          advancedPrompts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                objective: { type: Type.STRING },
                prompt: { type: Type.STRING },
                tip: { type: Type.STRING }
              },
              required: ["objective", "prompt", "tip"]
            }
          },
          bestPractices: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["context", "mainPrompts", "advancedPrompts", "bestPractices"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};
