/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Wine, Bodega, Experience } from './types.ts';

// Dynamic asset imports to leverage Vite's assets pipeline and ensure compiling in production
// @ts-ignore
import wineBottleImg from './assets/images/rioja_wine_bottle_1782129295912.jpg';
// @ts-ignore
import restaurantBgImg from './assets/images/luxury_restaurant_bg_1782129279056.jpg';
// @ts-ignore
import winerySunsetImg from './assets/images/rioja_winery_sunset_1782129312104.jpg';
// @ts-ignore
import laBrazaHeroImg from './assets/images/la_braza_hero_1782142723525.jpg';
// @ts-ignore
import rubiaGallegaImg from './assets/images/rubia_gallega_steak_1782142736390.jpg';
// @ts-ignore
import pairingImg from './assets/images/luxury_wine_beef_pairing_1782142750246.jpg';
// @ts-ignore
import oliveOilImg from './assets/images/rioja_olive_oil_1782143169264.jpg';
// @ts-ignore
import artisanHoneyImg from './assets/images/artisan_honey_1782143185275.jpg';

export const RESTAURANT_BG = restaurantBgImg;
export const WINE_BOTTLE_DEFAULT = wineBottleImg;
export const WINERY_SUNSET_DEFAULT = winerySunsetImg;
export const LA_BRAZA_HERO = laBrazaHeroImg;
export const RUBIA_GALLEGA_STEAK = rubiaGallegaImg;
export const PAIRING_IMG = pairingImg;
export const OLIVE_OIL_IMG = oliveOilImg;
export const ARTISAN_HONEY_IMG = artisanHoneyImg;

export const BODEGAS_DATA: Bodega[] = [
  {
    id: 'marques-de-riscal',
    name: 'Marqués de Riscal',
    location: 'Elciego, Rioja Alavesa',
    foundedYear: 1858,
    description: 'Una de las bodegas más antiguas de La Rioja, famosa por combinar la tradición vinícola con la arquitectura vanguardista de su hotel diseñado por Frank Gehry. Pioneros en introducir los métodos de Burdeos en España.',
    style: 'Vanguardista y Centenaria',
    experienceHighlight: 'Hotel Frank Gehry y bodega antigua subterránea de 1860.',
    image: winerySunsetImg
  },
  {
    id: 'muga',
    name: 'Bodegas Muga',
    location: 'Haro, Barrio de la Estación',
    foundedYear: 1932,
    description: 'Ubicada en el mítico muelle del ferrocarril de Haro, Muga es una de las pocas bodegas de España que conserva su propia tonelería y realiza toda la fermentación y crianza en roble, bajo métodos absolutamente tradicionales.',
    style: 'Artesanal y de Crianza Clásica',
    experienceHighlight: 'Cooperería propia activa e iniciación en la cata sensorial.',
    image: winerySunsetImg
  },
  {
    id: 'la-rioja-alta',
    name: 'La Rioja Alta, S.A.',
    location: 'Haro, Barrio de la Estación',
    foundedYear: 1890,
    description: 'Referente mundial del clasicismo elegante de Rioja. Creadores de marcas de culto eterno como Viña Ardanza o Gran Reserva 904. Su proceso de trasiega manual individual a la luz de vela es legendario.',
    style: 'Gran Clásico Transparente',
    experienceHighlight: 'Trasiega tradicional a la luz de vela en tinos centenarios.',
    image: winerySunsetImg
  },
  {
    id: 'montecillo',
    name: 'Bodegas Montecillo',
    location: 'Fuenmayor, Rioja Alta',
    foundedYear: 1870,
    description: 'La tercera bodega más antigua de Rioja. Construida sobre calados de piedra tallada y una constante devoción a la uva Tempranillo de primera calidad para vinos longevos y profundos en barricas de roble francés y americano.',
    style: 'Elegancia Temporal de la Rioja Alta',
    experienceHighlight: 'Calados de piedra con botelleros antiguos de madera noble.',
    image: winerySunsetImg
  },
  {
    id: 'marques-de-murrieta',
    name: 'Marqués de Murrieta',
    location: 'Logroño, Finca Ygay',
    foundedYear: 1852,
    description: 'El origen del vino de Rioja. Luciano Murrieta fundó este castillo a semejanza de los "Châteaux" de Burdeos tras estudiar allí. Custodios de un viñedo idílico rodeando la majestuosa Finca Ygay.',
    style: 'Elegancia Aristocrática y de Culto',
    experienceHighlight: 'Castillo de Ygay histórico decorado con reliquias familiares.',
    image: winerySunsetImg
  }
];

export const WINES_DATA: Wine[] = [
  {
    id: 'riscal-gran-reserva-2016',
    name: 'Rioja Gran Reserva 2016',
    bodega: 'Marqués de Riscal',
    type: 'Tinto',
    year: 2016,
    category: 'Gran Reserva',
    price: 48.00,
    description: 'Se caracteriza por su gran finura, complejidad y longevidad. Posee un paso por boca untuoso, con taninos dulces y pulidos que reflejan el saber hacer centenario del Château español.',
    tastingNotes: 'Aromas limpios, tostados y complejos de maderas finas con pinceladas de cacao, tabaco, regaliz y frutas maduras de bosque en sazón.',
    alcohol: '14.5%',
    varietals: ['Tempranillo', 'Graciano', 'Mazuelo'],
    pairings: ['Cordero asado', 'Carnes de caza', 'Chuletón de buey', 'Quesos muy curados'],
    rating: 4.9,
    image: wineBottleImg,
    stock: 24
  },
  {
    id: 'muga-reserva-2019',
    name: 'Muga Reserva Especial 2019',
    bodega: 'Bodegas Muga',
    type: 'Tinto',
    year: 2019,
    category: 'Reserva',
    price: 36.50,
    description: 'Fermentado con levaduras indígenas en depósitos de roble propios de la tonelería familiar. Destaca por su magnífica frescura ácida integrada que le proveerá décadas de vida óptima.',
    tastingNotes: 'Aromas frutados de moras oscuras de zarza, ciruela, clavo, hinojo y finos cueros. En boca es voluptuoso y envolvente.',
    alcohol: '14.0%',
    varietals: ['Tempranillo', 'Garnacha', 'Graciano', 'Mazuelo'],
    pairings: ['Asados de cordero lechal', 'Solomillo Wellington', 'Guisos tradicionales de cuchara'],
    rating: 4.8,
    image: wineBottleImg,
    stock: 15
  },
  {
    id: 'vina-ardanza-2015',
    name: 'Viña Ardanza Selección Especial 2015',
    bodega: 'La Rioja Alta, S.A.',
    type: 'Tinto',
    year: 2015,
    category: 'Reserva',
    price: 39.00,
    description: 'Un icono inmutable. Elaborado en años climáticos estelares combinando la finura de la Tempranillo con la estructura especiada y golosa de la uva Garnacha de la Rioja Oriental.',
    tastingNotes: 'Intenso bouquet especiado, coco, café tostado, hoja de habano fresca y canela. Paladar sumamente sedoso y aterciopelado con postgusto inacabable.',
    alcohol: '14.5%',
    varietals: ['Tempranillo (80%)', 'Garnacha (20%)'],
    pairings: ['Asado castellano', 'Chuletas de sarmiento', 'Embutido ibérico de bellota'],
    rating: 4.9,
    image: wineBottleImg,
    stock: 18
  },
  {
    id: 'muga-blanco-2022',
    name: 'Muga Blanco Fermentado en Barrica 2022',
    bodega: 'Bodegas Muga',
    type: 'Blanco',
    year: 2022,
    category: 'Genérico',
    price: 16.80,
    description: 'Un blanco riojano estructurado e inusualmente complejo gracias a una sutil fermentación y batónnage de lías finas en barricas de roble francés de tostado muy ligero.',
    tastingNotes: 'Flores blancas, ralladura de limón, piña fresca madura y elegantes notas ahumadas con recuerdos a vainilla dulce de repostería.',
    alcohol: '13.5%',
    varietals: ['Viura', 'Malvasía Riojana', 'Garnacha Blanca'],
    pairings: ['Pescados al horno', 'Arroz marinero caldoso', 'Pasta fresca trufada', 'Sushi'],
    rating: 4.7,
    image: wineBottleImg,
    stock: 35
  },
  {
    id: 'montecillo-reserva-2017',
    name: 'Montecillo Singular Reserva 2017',
    bodega: 'Bodegas Montecillo',
    type: 'Tinto',
    year: 2017,
    category: 'Reserva',
    price: 24.50,
    description: 'Fiel reflejo del coupage tradicional de la Rioja Alta con un largo afinamiento oxidativo y reductor de 24 meses en roble americano y 18 meses adicionales en el botellero silencioso.',
    tastingNotes: 'Especias, frutas negras mofletudas, notas balsámicas de pino y sándalo, con un tanino maduro muy equilibrado.',
    alcohol: '14.0%',
    varietals: ['Tempranillo', 'Graciano'],
    pairings: ['Parrilladas', 'Rabas de ternera en salsa', 'Embutidos ibéricos'],
    rating: 4.6,
    image: wineBottleImg,
    stock: 40
  },
  {
    id: 'murrieta-reserva-2018',
    name: 'Marqués de Murrieta Reserva Finca Ygay 2018',
    bodega: 'Marqués de Murrieta',
    type: 'Tinto',
    year: 2018,
    category: 'Reserva',
    price: 31.00,
    description: 'Fruto del histórico viñedo calizo de Logroño. Un coupage soberbio que exuda equilibrio, finura y una aristocrática dignidad de un vino clásico de alta gama en Europa.',
    tastingNotes: 'Rosas marchitas, cereza negra ácida, pimienta negra molida y madera de cedro fina. Entrada opulenta y finura suprema.',
    alcohol: '14.0%',
    varietals: ['Tempranillo', 'Garnacha', 'Graciano', 'Mazuelo'],
    pairings: ['Cochinillo asado', 'Tupí de quesos asturianos', 'Atún rojo a la brasa'],
    rating: 4.8,
    image: wineBottleImg,
    stock: 12
  },
  {
    id: 'muga-rosado-2023',
    name: 'Muga Rosado 2023',
    bodega: 'Bodegas Muga',
    type: 'Rosado',
    year: 2023,
    category: 'Genérico',
    price: 14.50,
    description: 'Un rosado pálido de estilo provenzal pero con la identidad y el sabor de la Rioja Alta. Muy fresco, ideal para días soleados y aperitivos gastronómicos vibrantes.',
    tastingNotes: 'Frambuesa ácida, melocotón blanco de viña, ligeras notas florales de clavel y fresas maduras silvestres.',
    alcohol: '13.0%',
    varietals: ['Garnacha', 'Viura', 'Tempranillo'],
    pairings: ['Pastas', 'Ensaladas templadas', 'Aperitivos fríos', 'Arroces'],
    rating: 4.5,
    image: wineBottleImg,
    stock: 22
  },
  {
    id: 'castillo-ygay-2011',
    name: 'Castillo Ygay Gran Reserva Especial 2011',
    bodega: 'Marqués de Murrieta',
    type: 'Tinto',
    year: 2011,
    category: 'Gran Reserva',
    price: 195.00,
    description: 'El Olimpo del Rioja. Castillo Ygay se elabora únicamente en añadas míticas y excepcionales. Envejece durante más de 10 años entre barrica y botella antes de salir a la luz, consagrado mundialmente por la crítica.',
    tastingNotes: 'Eterna sintonía aromática de trufa negra, piel de naranja confitada, hoja de eucalipto, maderas de sándalo e higos secos. Textura de pura armonía etérea.',
    alcohol: '14.0%',
    varietals: ['Tempranillo (85%)', 'Mazuelo (15%)'],
    pairings: ['Jamón de bellota 100% ibérico', 'Guisos ilustrados de liebre o ciervo', 'Momentos de meditación pura'],
    rating: 5.0,
    image: wineBottleImg,
    stock: 5
  },
  {
    id: 'chuleton-rubia-gallega',
    name: 'Chuletón de Rubia Gallega Dry-Aged',
    bodega: 'La Braza Premium Cuts',
    type: 'Corte Premium',
    year: 45, // represented as days of dry age
    category: 'Madurado',
    price: 68.00,
    description: 'Excepcional chuletón de Rubia Gallega con una maduración Dry-Aged en cámara artesana de 45 días. Infiltración de grasa sublime que aporta notas umami profundas, de textura aterciopelada y sabor mantecoso.',
    tastingNotes: 'Gusto extremadamente profundo, matices a frutos secos y queso curado con una terneza legendaria cuando se sella a fuego vivo.',
    alcohol: 'N/A',
    varietals: ['Rubia Gallega Certificada', '45 Días Dry-Aged'],
    pairings: ['Rioja Gran Reserva 2016', 'Viña Ardanza Selección Especial 2015', 'Muga Reserva Especial 2019'],
    rating: 4.9,
    image: rubiaGallegaImg,
    stock: 12
  },
  {
    id: 'tbone-black-angus',
    name: 'T-Bone Black Angus Selección',
    bodega: 'La Braza Premium Cuts',
    type: 'Corte Premium',
    year: 30, // 30 days maturation
    category: 'Madurado',
    price: 52.00,
    description: 'Delicioso corte que combina el solomillo y el lomo de ternera Black Angus americana de pasto. Un equilibrio inigualable entre la terneza magra y la jugosidad marmolada de la grasa infiltrada.',
    tastingNotes: 'Sabor intenso, aroma dulce tostado de pasto y textura tierna que se deshace en paladar al contacto con las brasas.',
    alcohol: 'N/A',
    varietals: ['Black Angus Prime', '30 Días Dry-Aged'],
    pairings: ['Montecillo Singular Reserva 2017', 'Marqués de Murrieta Reserva Finca Ygay 2018'],
    rating: 4.8,
    image: rubiaGallegaImg,
    stock: 15
  },
  {
    id: 'pack-gourmet-la-braza',
    name: 'Pack Gran Reserva & Rubia Gallega',
    bodega: 'La Braza Cajas Exclusivas',
    type: 'Pack Gourmet',
    year: 2026,
    category: 'Selección Especial',
    price: 115.00,
    description: 'La experiencia del fuego definitiva para recibir en casa. Incluye 1 Chuletón Selección Dry-Aged (1.2kg), una botella de Viña Ardanza Selección Especial 2015 y un bote de escamas de sal marina al humo de sarmiento.',
    tastingNotes: 'Un enlace sinfónico perfecto donde el tanino sedoso y el cacao de Ardanza pulen la untuosidad y grasa fundida del buey asado.',
    alcohol: '14.5% (Vino)',
    varietals: ['1x Chuletón 1.2kg', '1x Viña Ardanza 75cl', '1x Sal Ahumada'],
    pairings: ['Cenas de Gala', 'Veladas de Maridaje Familiar'],
    rating: 5.0,
    image: pairingImg,
    stock: 8
  },
  {
    id: 'aove-la-braza-grand-reserva',
    name: 'AOVE Coupage Real Selección Única',
    bodega: 'Trujal La Alavesa & La Braza',
    type: 'Aceite de Oliva',
    year: 2025,
    category: 'Virgen Extra',
    price: 24.00,
    description: 'Aceite de Oliva Virgen Extra de categoría superior obtenido directamente de aceitunas de cultivo ecológico en Rioja Alavesa y únicamente mediante procedimientos mecánicos de extracción en frío.',
    tastingNotes: 'Intenso color verde esmeralda, aromas a hierba recién cortada, tomatera y alcachofa. En boca destaca su equilibrio perfecto entre el picante elegante y el amargor sutil de fondo.',
    alcohol: '0.1% Acidez',
    varietals: ['Arroniz (70%)', 'Arbequina (30%)'],
    pairings: ['Cortes de Rubia Gallega a la brasa', 'Degustación directa con pan de sarmiento calentado', 'Cogollos de lechuga de Tudela asados'],
    rating: 4.9,
    image: oliveOilImg,
    stock: 35
  },
  {
    id: 'aove-arbequina-seleccion',
    name: 'AOVE Arbequina Selección Centenaria',
    bodega: 'Almazara de la Sonsierra',
    type: 'Aceite de Oliva',
    year: 2025,
    category: 'Virgen Extra',
    price: 19.50,
    description: 'Un monovarietal de Arbequina excepcional, cosechado temprano a mano en las laderas de la Sierra de Cantabria. Una joya dorada de acidez mínima y pureza frutal absoluta.',
    tastingNotes: 'Notas dulces a manzana madura, plátano y almendra tierna, con un paso por boca suave, sedoso y de final dulce muy agradable sin amargor.',
    alcohol: '0.08% Acidez',
    varietals: ['Arbequina Monovarietal (100%)'],
    pairings: ['Carpaccio de ternera Angus', 'Pescados blancos a la parrilla', 'Queso fresco de cabra fundido'],
    rating: 4.8,
    image: oliveOilImg,
    stock: 40
  },
  {
    id: 'miel-milflores-sierra',
    name: 'Miel Cruda de Flores de la Sierra Alta',
    bodega: 'Apicultura Sierra de Cantabria',
    type: 'Miel Artesana',
    year: 2026,
    category: 'Sierra Cantabria',
    price: 14.00,
    description: 'Miel cruda de alta montaña recolectada a más de 1000m de altitud en los bosques de la Sierra de Cantabria. Sin calentar, filtrar ni adulterar, conservando todo el polen y propiedades nativas.',
    tastingNotes: 'Gusto floral denso con notas resinosas y un fondo de brezo húmedo. Color ámbar oscuro de textura rica y cristalización natural fina.',
    alcohol: 'Pureza 100%',
    varietals: ['Brezo', 'Encina', 'Tomillo', 'Espliego'],
    pairings: ['Tablas de quesos riojanos semicurados', 'Yogur artesano de oveja Latxa', 'Postres navideños de almendra'],
    rating: 4.9,
    image: artisanHoneyImg,
    stock: 28
  },
  {
    id: 'miel-romero-monofloral',
    name: 'Miel de Romero Monofloral de la Sonsierra',
    bodega: 'Apicultura Sonsierra Premium',
    type: 'Miel Artesana',
    year: 2026,
    category: 'Monofloral',
    price: 16.50,
    description: 'Miel monofloral de flores de romero silvestres, cosechada de primavera temprana en las laderas áridas de la Sonsierra Riojana. Un bálsamo de extrema finura gastronómica.',
    tastingNotes: 'Color pajizo claro muy elegante, aroma floral suave con matices alcanforados balsámicos. Sabor muy dulce con notas sutilmente ácidas al final.',
    alcohol: 'Pureza 100%',
    varietals: ['Romero silvestre (85%)', 'Flora endémica de monte bajo (15%)'],
    pairings: ['Sobrasada ibérica de bellota caliente', 'Postres lácteos tradicionales cuajados', 'Aderezo para costillar laqueado al horno'],
    rating: 5.0,
    image: artisanHoneyImg,
    stock: 20
  }
];

export const EXPERIENCES_DATA: Experience[] = [
  {
    id: 'exp-catedral-riscal',
    title: 'Visita Histórica & Cata "Catedral de Elciego"',
    bodegaId: 'marques-de-riscal',
    price: 65.00,
    duration: '2.5 horas',
    description: 'Explora la historia de Marqués de Riscal recorriendo la emblemática bodega original construida en 1860, culminando con el acceso exclusivo a los miradores del icónico edificio hotelero moderno de Frank Gehry y una cata selecta de 4 añadas antiguas de Reservas y Grandes Reservas en su reservado privado de barricas.',
    inclusions: [
      'Visita guiada por historiador del vino',
      'Acceso exclusivo a la histórica "Catedral" de botellas antiguas de 1862',
      'Cata guiada de 4 vinos premium de Rioja Alavesa',
      'Tabla selecta de embutidos ibéricos y quesos de oveja Latxa'
    ],
    rating: 4.9,
    image: winerySunsetImg
  },
  {
    id: 'exp-toneleria-muga',
    title: 'Cuna del Roble: Tonelería Artesana & Cata en Bodega',
    bodegaId: 'muga',
    price: 45.00,
    duration: '2 horas',
    description: 'Siente la madera viva y conoce la maestría de un oficio medieval. Muga es pionera por su tonelería tradicional. Observa en directo a los maestros toneleros domar las duelas de roble al calor de llamas de sarmiento y experimenta por qué la micro-oxigenación natural define los vinos clásicos de Haro.',
    inclusions: [
      'Recorrido completo por la sala de tinas tradicionales',
      'Demostración en vivo en el taller de coopería familiar',
      'Cata de 3 vinos excepcionales (incluyendo Prado Enea/Muga Torre)',
      'Tapa artesana hecha al sarmiento en comedor de barricas'
    ],
    rating: 4.8,
    image: winerySunsetImg
  },
  {
    id: 'exp-trasiega-rioja-alta',
    title: 'El Arte de la Trasiega Tradicional a la Luz de la Vela',
    bodegaId: 'la-rioja-alta',
    price: 75.00,
    duration: '3 horas',
    description: 'Una inmersión profunda exclusiva para amantes del clasicismo. Descubre el secreto de la nitidez de Viña Ardanza asistiendo al místico trasiego artesanal de barrica a barrica a la luz de una vela de cera, un método tradicional que elimina los sedimentos sin ningún filtrado mecánico agresivo.',
    inclusions: [
      'Masterclass con maestro trasiega de la casa',
      'Asistencia activa al proceso de trasiego con luz de vela',
      'Cata premium vertical de 3 añadas de Viña Ardanza',
      'Regalo de sacacorchos profesional grabado de la bodega'
    ],
    rating: 5.0,
    image: winerySunsetImg
  },
  {
    id: 'exp-maridaje-murrieta',
    title: 'Gourmet Aristocrático: Maridaje Exclusivo de Finca Ygay',
    bodegaId: 'marques-de-murrieta',
    price: 110.00,
    duration: '2 horas',
    description: 'Cruza el umbral del majestuoso Castillo de Ygay de 1852 para disfrutar del enoturismo más sofisticado. En su espectacular comedor señorial, nuestros sumilleres guiarán un maridaje de cocina de vanguardia con las etiquetas insignes de la firma, combinando platos de autor inspirados en la huerta riojana con Reservas aristocráticos.',
    inclusions: [
      'Visita privada al museo del Castillo de Ygay y jardín centenario',
      'Maridaje gastronómico de 4 platos calientes diseñados por chef ejecutivo',
      'Cata de Castillo Ygay Gran Reserva Especial',
      'Atención ultra-personalizada en grupos de máximo 6 personas'
    ],
    rating: 4.9,
    image: winerySunsetImg
  }
];
