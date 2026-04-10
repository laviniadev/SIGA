export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  image: string;
  images: string[];
  category: string;
  material: string;
  care: string[];
  weight?: number; // Peso em kg
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Camiseta Básica Algodão Premium",
    description: "Confortável e versátil para o dia a dia.",
    longDescription: "Nossa camiseta básica é produzida com o algodão mais nobre do mercado. Com modelagem 'regular fit', ela se adapta perfeitamente ao corpo, proporcionando frescor e liberdade de movimento.",
    price: 49.9,
    image: "/products/tshirt-1.jpg",
    images: [
      "/products/tshirt-1.jpg",
      "/products/tshirt-2.jpg",
      "/products/tshirt-3.jpg"
    ],
    category: "Roupas",
    material: "100% Algodão Egípcio",
    care: ["Lavar à máquina max. 30ºC", "Não utilizar alvejante", "Passar máximo 110ºC", "Não limpar a seco"],
    weight: 0.3
  },
  {
    id: "2",
    name: "Tênis Esportivo Urban Runner v2",
    description: "Ideal para corridas e atividades físicas intensas com absorção de impacto.",
    longDescription: "Desenvolvido para atletas urbanos, o Urban Runner v2 combina a tecnologia de amortecedor de última geração com um design minimalista. Ideal tanto para maratonas quanto para o casual.",
    price: 299.9,
    image: "/products/sneaker-1.jpg",
    images: [
      "/products/sneaker-1.jpg",
      "/products/sneaker-2.jpg",
      "/products/sneaker-3.jpg"
    ],
    category: "Calçados",
    material: "Mesh respirável e solado de borracha vulcanizada",
    care: ["Limpar com pano úmido", "Não lavar à máquina", "Secar à sombra"],
    weight: 1.2
  },
  {
    id: "3",
    name: "Mochila Executiva Notebook Pro",
    description: "Cores sóbrias e múltiplos compartimentos. Cabe notebook até 15.6 polegadas.",
    longDescription: "A companheira ideal para o profissional moderno. Possui proteção contra água, compartimento acolchoado para eletrônicos e ergonomia pensada para longos trajetos.",
    price: 159.9,
    image: "/products/backpack-1.jpg",
    images: [
      "/products/backpack-1.jpg",
      "/products/backpack-2.jpg",
      "/products/backpack-3.jpg"
    ],
    category: "Acessórios",
    material: "Poliéster 600D reforçado",
    care: ["Lavar à mão", "Não utilizar secadora"],
    weight: 0.8
  },
  {
    id: "4",
    name: "Relógio Digital Minimalist Black",
    description: "Design moderno com pulseira de couro PU. Resistente à água.",
    longDescription: "O Minimalist Black redefine o tempo com elegância. Visor de cristal mineral resistente a riscos e mecanismo digital de alta precisão. À prova d'água até 50m.",
    price: 129.5,
    image: "/products/watch-1.jpg",
    images: [
      "/products/watch-1.jpg",
      "/products/watch-2.jpg",
      "/products/watch-3.jpg"
    ],
    category: "Acessórios",
    material: "Aço inoxidável e Vidro Mineral",
    care: ["Limpar com flanela seca"],
    weight: 0.2
  },
  {
    id: "5",
    name: "Jaqueta Corta Vento TechWear",
    description: "Leve, resistente à água e com detalhes refletivos para uso noturno.",
    longDescription: "A Jaqueta TechWear é essencial para quem não para nem nos dias de chuva. Extremamente leve, pode ser dobrada e guardada no próprio bolso, tornando-a ultra-portátil.",
    price: 189.9,
    image: "/products/windbreaker-1.jpg",
    images: [
      "/products/windbreaker-1.jpg",
      "/products/windbreaker-2.jpg",
      "/products/windbreaker-3.jpg"
    ],
    category: "Roupas",
    material: "Nylon Ripstop",
    care: ["Lavar em ciclo delicado", "Não passar"],
    weight: 0.4
  },
  {
    id: "6",
    name: "Óculos de Sol Vintage Pilot",
    description: "Proteção UV400 com estilo atemporal.",
    longDescription: "Inspirado nos modelos clássicos de aviação, o Vintage Pilot une armação leve em metal a lentes polarizadas de alta definição. Máximo conforto e proteção para seus olhos.",
    price: 89.9,
    image: "/products/sunglasses-1.jpg",
    images: [
      "/products/sunglasses-1.jpg",
      "/products/sunglasses-2.jpg",
      "/products/sunglasses-3.jpg"
    ],
    category: "Acessórios",
    material: "Lentes de Policarbonato e Armação de Metal",
    care: ["Usar estojo rígido", "Limpar com lenço de microfibra"],
    weight: 0.1
  },
  {
    id: "7",
    name: "Jaqueta de Couro Noir",
    description: "Couro legítimo com acabamento premium e corte slim.",
    longDescription: "A Jaqueta Noir é uma peça de herança. Desenvolvida em couro de flor integral, oferece durabilidade excepcional e um ajuste que melhora com o tempo. Ideal para um visual sofisticado e rebelde.",
    price: 899.9,
    image: "/products/leather-1.jpg",
    images: [
      "/products/leather-1.jpg",
      "/products/leather-2.jpg",
      "/products/leather-3.jpg"
    ],
    category: "Roupas",
    material: "100% Couro de Cordeiro",
    care: ["Limpeza profissional em couro", "Evitar exposição excessiva ao sol"],
    weight: 1.5
  },
  {
    id: "8",
    name: "Calça Jeans Slim Deep Indigo",
    description: "Denim de alta qualidade com elastano para máximo conforto.",
    longDescription: "Nossa Deep Indigo é o equilíbrio entre o clássico e o moderno. Com tingimento profundo que mantém a cor por mais tempo e corte slim que valoriza a silhueta sem prender movimentos.",
    price: 199.9,
    image: "/products/jeans-1.jpg",
    images: [
      "/products/jeans-1.jpg",
      "/products/jeans-2.jpg",
      "/products/jeans-3.jpg"
    ],
    category: "Roupas",
    material: "98% Algodão, 2% Elastano",
    care: ["Lavar do avesso", "Lavar com cores similares", "Não secar na máquina"],
    weight: 0.6
  },
  {
    id: "9",
    name: "Tênis Cano Alto Urban White",
    description: "Design minimalista e arrojado para o estilo de vida urbano.",
    longDescription: "O Urban White é um ícone de versatilidade. Feito em couro sintético de alta resistência com detalhes em cinza, possui solado acolchoado que garante conforto durante todo o dia nas grandes cidades.",
    price: 349.9,
    image: "/products/hightop-1.jpg",
    images: [
      "/products/hightop-1.jpg",
      "/products/hightop-2.jpg",
      "/products/hightop-3.jpg"
    ],
    category: "Calçados",
    material: "Couro Sintético Premium",
    care: ["Limpar com espuma específica", "Não mergulhar em água"],
    weight: 1.4
  },
  {
    id: "10",
    name: "Relógio Chrono Master Silver",
    description: "Cronógrafo de precisão com acabamento em aço inoxidável.",
    longDescription: "O Chrono Master Silver é para quem valoriza a pontualidade e o estilo. Movimento quartzo japonês, visor de safira resistente a riscos e pulseira de elos ajustáveis para um encaixe perfeito.",
    price: 549.9,
    image: "/products/chrono-1.jpg",
    images: [
      "/products/chrono-1.jpg",
      "/products/chrono-2.jpg",
      "/products/chrono-3.jpg"
    ],
    category: "Acessórios",
    material: "Aço Inoxidável 316L",
    care: ["Limpar com pano seco", "Resistente a respingos (3 ATM)"],
    weight: 0.3
  },
  {
    id: "11",
    name: "Bolsa Tote Leather Elegant",
    description: "Espaçosa e sofisticada, ideal para o ambiente profissional.",
    longDescription: "A Tote Elegant combina funcionalidade com alta costura. Com espaço interno generoso para documentos e eletrônicos, e acabamento em couro texturizado que exala sofisticação em qualquer reunião.",
    price: 429.9,
    image: "/products/tote-1.jpg",
    images: [
      "/products/tote-1.jpg",
      "/products/tote-2.jpg",
      "/products/tote-3.jpg"
    ],
    category: "Acessórios",
    material: "Couro Texturizado",
    care: ["Hidratar o couro periodicamente", "Guardar em saco de feltro"],
    weight: 1.0
  },
  {
    id: "12",
    name: "Cinto de Couro Classic Brown",
    description: "Cinto social clássico com fivela de prata polida.",
    longDescription: "O acessório que faltava no seu guarda-roupa social. Feito em peça única de couro bovino, o Classic Brown oferece o ajuste ideal e o acabamento polido que qualquer traje de gala ou empresarial exige.",
    price: 119.9,
    image: "/products/belt-1.jpg",
    images: [
      "/products/belt-1.jpg",
      "/products/belt-2.jpg",
      "/products/belt-3.jpg"
    ],
    category: "Acessórios",
    material: "Couro Bovino Legítimo",
    care: ["Não molhar", "Armazenar enrolado ou pendurado"],
    weight: 0.2
  }
];
