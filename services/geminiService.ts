
import { GoogleGenAI, Type } from "@google/genai";
import { PromptLibrary, SolutionType, SectorType } from "../types";

export const generateLibrary = async (
  solution: SolutionType,
  sector: SectorType
): Promise<PromptLibrary> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Actúa como un Consultor Senior de Operaciones, Experto en Lean Manufacturing y Eficiencia de Procesos.
    Tu objetivo es generar una biblioteca de prompts útiles EXCLUSIVAMENTE para el ÁREA DE OPERACIONES.
    
    Contexto de la solicitud:
    - Tipo de solución de IA a implementar: ${solution}
    - Sector empresarial: ${sector}

    REGLA CRÍTICA DE FORMATO:
    Todos los prompts DEBEN incluir campos de reemplazo entre corchetes para que el responsable de operaciones los personalice.
    Ejemplo: "Analiza el flujo de trabajo en la línea de [NOMBRE_PROCESO] para identificar cuellos de botella en [ETAPA_ESPECÍFICA]..."
    
    Sigue estrictamente esta estructura:
    1. Contexto operativo (máx 3 líneas) sobre cómo la IA optimiza el día a día en la planta o área de servicio.
    2. Lista principal de 12-15 prompts divididos en categorías como: Optimización de Procesos, Control de Calidad, Gestión de Inventarios / Suministros, Mantenimiento y Seguridad.
    3. 5 prompts avanzados enfocados en automatización industrial, análisis de causa raíz predictivo e integración de flujos de trabajo complejos.
    4. 5 consejos prácticos para que un Jefe de Operaciones implemente estas plantillas para reducir costos y tiempos.

    Los prompts deben ser prácticos, técnicos, orientados a la métrica (OEE, Tiempos de Ciclo, Lead Time) y la reducción de desperdicios.
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
