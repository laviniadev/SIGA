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
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Camiseta Básica Algodão Premium",
    description: "Confortável e versátil para o dia a dia.",
    longDescription: "Nossa camiseta básica é produzida com o algodão mais nobre do mercado. Com modelagem 'regular fit', ela se adapta perfeitamente ao corpo, proporcionando frescor e liberdade de movimento.",
    price: 49.9,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=400&q=80"
    ],
    category: "Roupas",
    material: "100% Algodão Egípcio",
    care: ["Lavar à máquina max. 30ºC", "Não utilizar alvejante", "Passar máximo 110ºC", "Não limpar a seco"]
  },
  {
    id: "2",
    name: "Tênis Esportivo Urban Runner v2",
    description: "Ideal para corridas e atividades físicas intensas com absorção de impacto.",
    longDescription: "Desenvolvido para atletas urbanos, o Urban Runner v2 combina a tecnologia de amortecedor de última geração com um design minimalista. Ideal tanto para maratonas quanto para o casual.",
    price: 299.9,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80"
    ],
    category: "Calçados",
    material: "Mesh respirável e solado de borracha vulcanizada",
    care: ["Limpar com pano úmido", "Não lavar à máquina", "Secar à sombra"]
  },
  {
    id: "3",
    name: "Mochila Executiva Notebook Pro",
    description: "Cores sóbrias e múltiplos compartimentos. Cabe notebook até 15.6 polegadas.",
    longDescription: "A companheira ideal para o profissional moderno. Possui proteção contra água, compartimento acolchoado para eletrônicos e ergonomia pensada para longos trajetos.",
    price: 159.9,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1546750278-1c32d1af0a58?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1581605405669-fec8107dd173?auto=format&fit=crop&w=400&q=80"
    ],
    category: "Acessórios",
    material: "Poliéster 600D reforçado",
    care: ["Lavar à mão", "Não utilizar secadora"]
  },
  {
    id: "4",
    name: "Relógio Digital Minimalist Black",
    description: "Design moderno com pulseira de couro PU. Resistente à água.",
    longDescription: "O Minimalist Black redefine o tempo com elegância. Visor de cristal mineral resistente a riscos e mecanismo digital de alta precisão. À prova d'água até 50m.",
    price: 129.5,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1508685096489-775b0af39386?auto=format&fit=crop&w=400&q=80"
    ],
    category: "Acessórios",
    material: "Aço inoxidável e Vidro Mineral",
    care: ["Limpar com flanela seca"]
  },
  {
    id: "5",
    name: "Jaqueta Corta Vento TechWear",
    description: "Leve, resistente à água e com detalhes refletivos para uso noturno.",
    longDescription: "A Jaqueta TechWear é essencial para quem não para nem nos dias de chuva. Extremamente leve, pode ser dobrada e guardada no próprio bolso, tornando-a ultra-portátil.",
    price: 189.9,
    image: "https://images.unsplash.com/photo-1551028719-01c1eb5cd4cd?auto=format&fit=crop&w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1551028719-01c1eb5cd4cd?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?auto=format&fit=crop&w=400&q=80"
    ],
    category: "Roupas",
    material: "Nylon Ripstop",
    care: ["Lavar em ciclo delicado", "Não passar"]
  },
  {
    id: "6",
    name: "Óculos de Sol Vintage Pilot",
    description: "Proteção UV400 com estilo atemporal.",
    longDescription: "Inspirado nos modelos clássicos de aviação, o Vintage Pilot une armação leve em metal a lentes polarizadas de alta definição. Máximo conforto e proteção para seus olhos.",
    price: 89.9,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1511499767350-a1590fdb2863?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=400&q=80"
    ],
    category: "Acessórios",
    material: "Lentes de Policarbonato e Armação de Metal",
    care: ["Usar estojo rígido", "Limpar com lenço de microfibra"]
  }
];
