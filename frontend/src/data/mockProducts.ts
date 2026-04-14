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
  salesCount?: number; // Quantidade de vendas oculto do usuário
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
  },
  {
    id: "13",
    name: "Moletom Canguru Black Edition",
    description: "Moletom premium grosso, ideal para o inverno e sobreposições.",
    longDescription: "Estilo urbano e proteção térmica andam juntos. O Canguru Black Edition é forrado com lã macia, capuz estruturado e bolso frontal resistente. Feito para as ruas.",
    price: 249.9,
    image: "/products/hoodie-black-1.jpg",
    images: ["/products/hoodie-black-1.jpg", "/products/hoodie-black-2.jpg", "/products/hoodie-black-3.jpg"],
    category: "Roupas",
    material: "80% Algodão, 20% Poliéster",
    care: ["Lavar ao avesso", "Não usar alvejante"],
    weight: 0.6
  },
  {
    id: "14",
    name: "Calça Cargo Tactical Urban",
    description: "Múltiplos bolsos reforçados e modelagem streetwear autêntica.",
    longDescription: "Inspirada no visual militar e adaptada para a vida urbana, a Cargo Tactical possui ripstop de alta durabilidade e compartimentos ergonômicos para maior praticidade no dia a dia.",
    price: 319.9,
    image: "/products/pants-cargo-1.jpg",
    images: ["/products/pants-cargo-1.jpg", "/products/pants-cargo-2.jpg", "/products/pants-cargo-3.jpg"],
    category: "Roupas",
    material: "Sarja com Elastano",
    care: ["Lavar em ciclo normal", "Secar à sombra"],
    weight: 0.7
  },
  {
    id: "15",
    name: "Bota de Couro Winter Explorer",
    description: "Robusta e impermeável para os dias mais intensos.",
    longDescription: "Encare qualquer desafio com a Winter Explorer. Couro premium tratado, biqueira reforçada e solado tratorado antideslizante para máximo conforto e aderência.",
    price: 499.9,
    image: "/products/boots-winter-1.jpg",
    images: ["/products/boots-winter-1.jpg", "/products/boots-winter-2.jpg", "/products/boots-winter-3.jpg"],
    category: "Calçados",
    material: "Couro Legítimo Impermeável",
    care: ["Limpar com escova macia", "Usar hidratante de couro"],
    weight: 1.4
  },
  {
    id: "16",
    name: "Gorro Beanie Classic Soft",
    description: "Retém o calor e garante estilo até no frio mais rigoroso.",
    longDescription: "Pequeno detalhe, grande impacto. O Gorro Beanie foi costurado para manter sua forma e não irritar a pele, sendo o toque final perfeito para o look de inverno.",
    price: 59.9,
    image: "/products/hat-beanie-1.jpg",
    images: ["/products/hat-beanie-1.jpg", "/products/hat-beanie-2.jpg", "/products/hat-beanie-3.jpg"],
    category: "Acessórios",
    material: "Acrílico Premium e Lã",
    care: ["Lavar à mão", "Secar na horizontal"],
    weight: 0.1
  },
  {
    id: "17",
    name: "Cachecol de Lã Alpaca",
    description: "Toque extremamente macio e sofisticação imediata.",
    longDescription: "Envolva-se no conforto autêntico da lã premium. Com excelente isolamento térmico e franjas sutis, este cachecol garante proteção sem abrir mão da elegância.",
    price: 139.9,
    image: "/products/scarf-wool-1.jpg",
    images: ["/products/scarf-wool-1.jpg", "/products/scarf-wool-2.jpg", "/products/scarf-wool-3.jpg"],
    category: "Acessórios",
    material: "100% Lã Natural",
    care: ["Lavar a seco", "Não torcer"],
    weight: 0.2
  },
  {
    id: "18",
    name: "Óculos Escuro Retro Vibe",
    description: "Design clássico com proteção UV avançada.",
    longDescription: "De volta aos clássicos. O Retro Vibe mistura acetato tartaruga durável com lentes em gradiente, trazendo um ar misterioso e charmoso para seus passeios ao ar livre.",
    price: 149.9,
    image: "/products/sunglasses-retro-1.jpg",
    images: ["/products/sunglasses-retro-1.jpg", "/products/sunglasses-retro-2.jpg", "/products/sunglasses-retro-3.jpg"],
    category: "Acessórios",
    material: "Acetato Ecológico e Lentes Polarizadas",
    care: ["Limpar com microfibra", "Armazenar na case"],
    weight: 0.1
  },
  {
    id: "19",
    name: "Carteira Slim Leather Wallet",
    description: "Fina, elegante e com bloqueio RFID de segurança.",
    longDescription: "Livre-se do volume extra. Esta carteira minimalista carrega tudo o que você precisa: até 8 cartões e CNH, garantindo segurança contra aproximação indesejada com a malha RFID.",
    price: 99.9,
    image: "/products/wallet-leather-1.jpg",
    images: ["/products/wallet-leather-1.jpg", "/products/wallet-leather-2.jpg", "/products/wallet-leather-3.jpg"],
    category: "Acessórios",
    material: "Couro Bovino Natural",
    care: ["Não dobrar", "Não expor ao sol direto"],
    weight: 0.1
  },
  {
    id: "20",
    name: "Jaqueta Jeans Original Denim",
    description: "Lavagem vintage autêntica que combina com tudo.",
    longDescription: "Um ícone atemporal. A Jaqueta Original Denim fica mais macia a cada uso e traz a estética robusta dos anos 90 com botões personalizados e custuras duplas ultra-resistentes.",
    price: 369.9,
    image: "/products/jacket-denim-1.jpg",
    images: ["/products/jacket-denim-1.jpg", "/products/jacket-denim-2.jpg", "/products/jacket-denim-3.jpg"],
    category: "Roupas",
    material: "100% Algodão Premium",
    care: ["Lavar sozinho na primeira vez", "Secagem natural"],
    weight: 0.9
  },
  {
    id: "21",
    name: "Camisa de Flanela Lenhador",
    description: "Padrão xadrez autêntico e tecido encorpado.",
    longDescription: "Extremamente versátil, a Flanela Lenhador pode ser usada fechada num dia mais frio ou aberta sobrepondo uma camiseta. Conforto macio com raízes na cultura outdoor.",
    price: 189.9,
    image: "/products/shirt-flannel-1.jpg",
    images: ["/products/shirt-flannel-1.jpg", "/products/shirt-flannel-2.jpg", "/products/shirt-flannel-3.jpg"],
    category: "Roupas",
    material: "100% Algodão Escovado",
    care: ["Lavar com água fria", "Não usar secadora"],
    weight: 0.4
  },
  {
    id: "22",
    name: "Tênis Casual Canvas Street",
    description: "Versatilidade e conforto para a rotina intensa.",
    longDescription: "O clássico que nunca erra. Com cabedal em lona respirável e palmilha anatômica, este tênis se adapta a qualquer peça do seu guarda-roupa para o corre diário.",
    price: 219.9,
    image: "/products/shoes-canvas-1.jpg",
    images: ["/products/shoes-canvas-1.jpg", "/products/shoes-canvas-2.jpg", "/products/shoes-canvas-3.jpg"],
    category: "Calçados",
    material: "Lona Premium e Solado de Borracha",
    care: ["Lavar com sabão neutro", "Secar à sombra"],
    weight: 0.9
  },
  {
    id: "23",
    name: "Suéter de Tricô Comfort",
    description: "Modelagem relaxada com tramas elegantes.",
    longDescription: "Uma peça sofisticada mas completamente relaxada. O suéter Comfort garante não só que você passe ileso pelo frio, como faça isso parecendo incrivelmente elegante e bem arrumado.",
    price: 259.9,
    image: "/products/sweater-knit-1.jpg",
    images: ["/products/sweater-knit-1.jpg", "/products/sweater-knit-2.jpg", "/products/sweater-knit-3.jpg"],
    category: "Roupas",
    material: "50% Algodão, 50% Lã Acrílica",
    care: ["Lavar à mão", "Secar estendido na horizontal"],
    weight: 0.5
  },
  {
    id: "24",
    name: "Kit Meias Pattern Coloridas",
    description: "Três pares de meia com personalidade e qualidade.",
    longDescription: "Dê vida ao seu visual através dos detalhes. O Kit Pattern traz meias reforçadas nos calcanhares, ponta sem costura sensível e fibras que deixam o pé respirar mesmo num tênis fechado.",
    price: 79.9,
    image: "/products/socks-pattern-1.jpg",
    images: ["/products/socks-pattern-1.jpg", "/products/socks-pattern-2.jpg", "/products/socks-pattern-3.jpg"],
    category: "Acessórios",
    material: "75% Algodão, 20% Poliamida, 5% Elastano",
    care: ["Lavar à máquina macio"],
    weight: 0.1
  },
  {
    id: "25",
    name: "Cinto Trançado Braided Belt",
    description: "Ajuste milimétrico sem necessidade de furos fixos.",
    longDescription: "Flexibilidade total. Você insere a fivela onde quiser, tornando esse cinto a opção de maior conforto após um almoço pesado ou na variação e adaptação de qualquer look de fim de semana.",
    price: 89.9,
    image: "/products/belt-braided-1.jpg",
    images: ["/products/belt-braided-1.jpg", "/products/belt-braided-2.jpg", "/products/belt-braided-3.jpg"],
    category: "Acessórios",
    material: "Couro trançado misto e Fivela prateada",
    care: ["Evitar umidade", "Limpar a seco"],
    weight: 0.2
  },
  {
    id: "26",
    name: "Bolsa Mensageiro City Explorer",
    description: "Design unissex moderno para nômades digitais e viajantes.",
    longDescription: "Feita para quem precisa de mãos livres no transporte. Tem alça acolchoada ajustável, divisões inteligentes para chaves, livros finos e tablets, garantindo acesso ultra rápido e fácil aos seus itens vitais.",
    price: 179.9,
    image: "/products/bag-messenger-1.jpg",
    images: ["/products/bag-messenger-1.jpg", "/products/bag-messenger-2.jpg", "/products/bag-messenger-3.jpg"],
    category: "Acessórios",
    material: "Poliéster Reciclado e Lona",
    care: ["Limpar com pano úmido apenas"],
    weight: 0.4
  },
  {
    id: "27",
    name: "Luvas de Couro Touch Elegance",
    description: "Mantenha o estilo e atenda o celular sem tirá-las.",
    longDescription: "Proteção sofisticada conta com uma ponta especial no polegar e indicador, permitindo o uso fácil e preciso de telas touch screen sem expor seus dedos ao clima gelado. Ajuste macio com forro flanelado interno.",
    price: 119.9,
    image: "/products/gloves-leather-1.jpg",
    images: ["/products/gloves-leather-1.jpg", "/products/gloves-leather-2.jpg", "/products/gloves-leather-3.jpg"],
    category: "Acessórios",
    material: "Couro PU Premium Touch, Forro aveludado",
    care: ["Hidratar se ressecar", "Manter longe de calor excessivo"],
    weight: 0.1
  },
  {
    id: "28",
    name: "Vestido Floral Summer Breeze",
    description: "Modelagem esvoaçante e fresca para dias quentes.",
    longDescription: "Elegante porém extremamente confortável e charmoso. Com uma linha suave e estampa exclusiva da temporada, esse vestido transita brilhantemente entre um passeio à tarde ou um jantar sob a lua acompanhado de saltos.",
    price: 289.9,
    image: "/products/dress-summer-1.jpg",
    images: ["/products/dress-summer-1.jpg", "/products/dress-summer-2.jpg", "/products/dress-summer-3.jpg"],
    category: "Roupas",
    material: "100% Viscose",
    care: ["Lavar à mão com carinho", "Passar no vapor"],
    weight: 0.3
  },
  {
    id: "29",
    name: "Saia Plissada Street Motion",
    description: "Acabamento primoroso com balanço e modernidade.",
    longDescription: "Traga movimento pro seu passo. O tecido plissado possui memória que mantém as dobras da saia mesmo após as lavagens, dando excelente caimento, sendo perfeita pra quem adora misturar alfaitaria e itens urbanos.",
    price: 199.9,
    image: "/products/skirt-pleated-1.jpg",
    images: ["/products/skirt-pleated-1.jpg", "/products/skirt-pleated-2.jpg", "/products/skirt-pleated-3.jpg"],
    category: "Roupas",
    material: "Poliéster Crepe Plissado",
    care: ["Não torcer duramente", "Lavar à mão para segurar o vinco"],
    weight: 0.3
  }
];
