/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';

// Simple types for our lightweight server
interface ChatRequest {
  message: string;
  history: Array<{ role: 'user' | 'sommelier'; text: string }>;
}

const app = express();
const PORT = 3000;

// Inline custom CORS middleware to bypass external dependency needs
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use(express.json());

// Catalog of wines we support, copy for server intelligence/matching
const WINES_CATALOG = [
  { id: 'riscal-gran-reserva-2016', name: 'Rioja Gran Reserva 2016 - Marqués de Riscal', category: 'Gran Reserva', price: 48, type: 'Tinto', description: 'Finura, complejidad y un paso untuoso con notas de uva Tempranillo, Graciano.', pairings: ['cordero asado', 'cordero', 'asado', 'carnes de caza', 'chuletón', 'queso curado'] },
  { id: 'muga-reserva-2019', name: 'Muga Reserva Especial 2019', category: 'Reserva', price: 36.5, type: 'Tinto', description: 'Fresco, envejecido en barricas de roble de tonelería familiar. Equilibrado y amplio.', pairings: ['cordero lechal', 'chuletillas', 'solomillo', 'guisos', 'caza'] },
  { id: 'vina-ardanza-2015', name: 'Viña Ardanza Selección Especial 2015 - La Rioja Alta S.A.', category: 'Reserva', price: 39, type: 'Tinto', description: 'Icono del clasicismo de Haro. Especiado, canela, coco, y extraordinariamente sedoso.', pairings: ['asado castellano', 'chuletas de sarmiento', 'embutidos', 'cordero'] },
  { id: 'muga-blanco-2022', name: 'Muga Blanco Fermentado en Barrica 2022', category: 'Genérico', price: 16.8, type: 'Blanco', description: 'Estructuradoblanco de uva Viura, Malvasía con notas florales, piña, limón y ligera vainilla.', pairings: ['pescado', 'marisco', 'sushi', 'arroz caldoso', 'pasta trufada'] },
  { id: 'montecillo-reserva-2017', name: 'Montecillo Singular Reserva 2017', category: 'Reserva', price: 24.5, type: 'Tinto', description: 'Balsámico, maduro, con notas de roble americano y tanino redondeado.', pairings: ['parrillada', 'carnes rojas', 'tapas', 'embutidos'] },
  { id: 'murrieta-reserva-2018', name: 'Marqués de Murrieta Reserva Finca Ygay 2018', category: 'Reserva', price: 31, type: 'Tinto', description: 'Equilibrio perfecto de rosas, pimienta negra, cedro gallego y aristocrática finura.', pairings: ['cochinillo asado', 'queso', 'atún rojo', 'chuletón'] },
  { id: 'muga-rosado-2023', name: 'Muga Rosado 2023', category: 'Rosado', price: 14.5, type: 'Rosado', description: 'Frescor provenzal de tono pálido, repleto de frutas rojas salvajes y melocotón de viña.', pairings: ['ensaladas', 'aperitivos', 'pastas', 'arroces'] },
  { id: 'castillo-ygay-2011', name: 'Castillo Ygay Gran Reserva Especial 2011', category: 'Gran Reserva', price: 195, type: 'Tinto', description: 'El olimpo de Rioja. Trufa, sándalo, higos secos, increíble finura y distinción suprema.', pairings: ['jamón ibérico de bellota', 'caza mayor', 'liebre', 'meditación'] }
];

// Lazily initialized Gemini GenAI client
let _ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!_ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      try {
        _ai = new GoogleGenAI({
          apiKey: apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build'
            }
          }
        });
        console.log("Servicio Gemini inicializado con éxito.");
      } catch (err) {
        console.error("Error al inicializar GoogleGenAI:", err);
      }
    }
  }
  return _ai;
}

// REST endpoints
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body as ChatRequest;

  if (!message) {
    res.status(400).json({ error: 'Falta el mensaje' });
    return;
  }

  const aiClient = getGeminiClient();

  if (aiClient) {
    try {
      // Craft specialized system prompt
      const systemInstruction = `Eres un Sumiller Virtual experto de La Rioja española, trabajando para el prestigioso "Rioja Marketplace".
Tu objetivo es guiar a los usuarios de manera elegante, apasionada y educada sobre los vinos de La Rioja, brindando notas de cata exquisitas, consejos de maridaje refinados e historia fascinante.

Siempre debes responder en un español pulcro, poético y acogedor (o en inglés, si te preguntan en inglés).
Tienes acceso al catálogo exclusivo de vinos que se venden en la tienda. A continuación se encuentra la lista de vinos exactos en bodega con sus identificadores (ID) correspondientes:

1. ID: 'riscal-gran-reserva-2016' - Rioja Gran Reserva 2016 - Marqués de Riscal (Tinto, €48.00). Ideal para cordero asado, carnes de caza, chuletón.
2. ID: 'muga-reserva-2019' - Muga Reserva Especial 2019 (Tinto, €36.50). Maravilloso con cordero lechal, solomillo, guisos de cuchara tradicionales.
3. ID: 'vina-ardanza-2015' - Viña Ardanza Selección Especial 2015 - La Rioja Alta, S.A. (Tinto, €39.00). Excelente para chuletas al sarmiento, cordero, asados castellanos.
4. ID: 'muga-blanco-2022' - Muga Blanco Fermentado en Barrica 2022 (Blanco, €16.80). Genial con pescado al horno, marisco, arroces y repostería marina.
5. ID: 'montecillo-reserva-2017' - Montecillo Singular Reserva 2017 (Tinto, €24.50). Ideal con parrillada de carnes, tapas, embutidos ibéricos.
6. ID: 'murrieta-reserva-2018' - Marqués de Murrieta Reserva Finca Ygay 2018 (Tinto, €31.00). Excelente con cochinillo asado, queso, atún rojo brasa.
7. ID: 'muga-rosado-2023' - Muga Rosado 2023 (Rosado, €14.50). Ideal con pastas, ensaladas, aperitivos ligeros.
8. ID: 'castillo-ygay-2011' - Castillo Ygay Gran Reserva Especial 2011 (Tinto de meditación ultra premium, €195.00). Ideal con jamón de bellota ibérico 100%, guisos de caza y momentos de pura contemplación.

Debes responder estrictamente en formato JSON válido de acuerdo al siguiente modelo:
{
  "text": "Tu respuesta conversacional con excelente prosa de sumiller, describiendo las bondades de tu recomendación...",
  "recommendedWineId": "el_id_de_la_botella_recomendada"
}

Si la consulta del usuario se asocia mejor con uno de nuestros vinos exactos del catálogo (por ejemplo, si menciona 'cordero', 'pescado', 'marisco', 'blanco', 'muga', 'riscal', 'caza', o 'jamón ibérico'), debes devolver el ID exacto que le corresponda en el campo 'recommendedWineId'. Si ninguno cuadra claramente o solo están saludando, mantén 'recommendedWineId' como nulo o vacío ("").
Por favor, entrega ÚNICAMENTE este objeto JSON de forma nítida.`;

      // Map local history structure to @google/genai system structure
      const contents = history.map(h => ({
        role: h.role === 'sommelier' ? 'model' : 'user',
        parts: [{ text: h.text }]
      }));
      contents.push({ role: 'user', parts: [{ text: message }] });

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              text: {
                type: Type.STRING,
                description: 'La respuesta de sumiller poética y detallada sobre la recomendación, platos o historia de la bodega.'
              },
              recommendedWineId: {
                type: Type.STRING,
                description: 'El ID exacto del vino del catálogo recomendado si aplica, o un string vacío.'
              }
            },
            required: ['text', 'recommendedWineId']
          }
        }
      });

      const responseText = response.text || '{}';
      try {
        const parsed = JSON.parse(responseText);
        res.json({
          text: parsed.text || "Disculpe, he tenido un ligero percance catando nuestros vinos. ¿En qué puedo asistirle hoy?",
          recommendedWineId: parsed.recommendedWineId || null
        });
      } catch (parseError) {
        console.error("Error al parsear el JSON de Gemini:", responseText, parseError);
        res.json({
          text: responseText,
          recommendedWineId: null
        });
      }

    } catch (apiError) {
      console.error("Error al consumir la API de Gemini:", apiError);
      // Fallback a respuesta inteligente local utilizando palabras clave
      const fallbackResult = getLocalFallbackWine(message);
      res.json(fallbackResult);
    }
  } else {
    // Modo Simulación/Offline local inteligente cuando no hay API key de Gemini
    console.log("Atendiendo solicitud en modo simulación inteligente (sin GEMINI_API_KEY).");
    const fallbackResult = getLocalFallbackWine(message);
    res.json(fallbackResult);
  }
});

// Helper function to simulate a charming sommelier when offline or no API Key
function getLocalFallbackWine(userQuery: string): { text: string; recommendedWineId: string | null } {
  const query = userQuery.toLowerCase();
  
  if (query.includes('cordero') || query.includes('asado') || query.includes('carne roja') || query.includes('chuleta')) {
    return {
      text: "Para un buen asado de cordero, le recomiendo encarecidamente un vino con estructura y carácter noble. Un Rioja Gran Reserva, como el 'Marqués de Riscal Gran Reserva 2016', es magnífico debido a sus finos aromas tostados y taninos dulcemente redondeados que realzarán la riqueza de este plato tradicional.",
      recommendedWineId: 'riscal-gran-reserva-2016'
    };
  }
  
  if (query.includes('pescado') || query.includes('marisco') || query.includes('blanco') || query.includes('sushi') || query.includes('pasta')) {
    return {
      text: "Para platos marinos elegantes o pastas ligeras, un blanco de uva Viura con crianza en madera es una joya. Le sugiero 'Muga Blanco Fermentado en Barrica 2022'. Sus notas de flores blancas secas combinadas con un fondo de vainilla de roble y untuosidad media equilibrarán maravillosamente el plato.",
      recommendedWineId: 'muga-blanco-2022'
    };
  }

  if (query.includes('jamon') || query.includes('jamón') || query.includes('iba') || query.includes('meditacion') || query.includes('especial') || query.includes('lujo')) {
    return {
      text: "Si busca la cima absoluta del refinamiento riojano para una ocasión irrepetible, es menester descorchar una leyenda de coleccionista. 'Castillo Ygay Gran Reserva Especial 2011' expresa un sosiego majestuoso de trufa, cacao y maderas nobles. Perfecto para saborear lentamente solo o con el mejor jamón de bellota.",
      recommendedWineId: 'castillo-ygay-2011'
    };
  }

  if (query.includes('tapa') || query.includes('aperitivo') || query.includes('embutido') || query.includes('suave')) {
    return {
      text: "Para una velada informal de tapas y embutidos, le aconsejo un vino accesible y pleno de fruta fresca. 'Montecillo Singular Reserva 2017' es redondo, balsámico y con una madera americana que regala toques de coco muy seductores.",
      recommendedWineId: 'montecillo-reserva-2017'
    };
  }

  if (query.includes('rosado') || query.includes('ensalada') || query.includes('fresco')) {
    return {
      text: "Con este clima apetece la frescura de un buen clarete riojano. 'Muga Rosado 2023' entrega un precioso color pálido francés pero con alma riojana, rebosante de acidez vibrante y notas de nectarina que abren el apetito de inmediato.",
      recommendedWineId: 'muga-rosado-2023'
    };
  }

  // Fallback general elegante
  return {
    text: "¡Hola! Como sumiller del Rioja Marketplace, es un placer darle la bienvenida. Cuénteme: ¿qué plato desea cocinar hoy, o qué perfiles de sabor (tinto maduro, blanco cremoso, rosado refrescante) prefiere beber en su copa?",
    recommendedWineId: 'vina-ardanza-2015'
  };
}

// Vite and Express serving static files logic
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
  });
}

startServer();
