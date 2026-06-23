// Dados MOCKADOS de imóveis (placeholder até plugar a fonte real — ex.: feed Orangeimob).
// Estrutura espelha o cadastro real descrito no levantamento do site atual.

export type Negotiation = 'venda' | 'locacao' | 'lancamento'

export interface Broker {
  name: string
  role: string
  creci: string
  phone: string
  whatsapp: string
  email: string
}

export interface Property {
  id: string
  reference: string
  type: string
  subtype: string
  negotiation: Negotiation[]
  isLaunch?: boolean
  title: string
  district: string
  city: string
  state: string
  salePrice?: number
  rentPrice?: number
  bedrooms: number
  suites: number
  bathrooms: number
  parking: number
  builtArea: number
  totalArea: number
  iptu?: number
  condo?: number
  purpose: 'residencial' | 'comercial'
  description: string
  features: string[]
  images: string[]
  broker: Broker
  location: { lat: number; lng: number }
  featured?: boolean
}

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

const defaultBroker: Broker = {
  name: 'Karina Graciutti',
  role: 'Corretora responsável',
  creci: 'CRECI 251469-F',
  phone: '11 4901-4040',
  whatsapp: '11 96965-4831',
  email: 'contato@kgimoveis.com.br',
}

export const PROPERTIES: Property[] = [
  {
    id: 'so1448',
    reference: 'SO1448',
    type: 'Sobrado',
    subtype: 'Padrão',
    negotiation: ['venda'],
    title: 'Sobrado alto padrão no Campestre',
    district: 'Campestre',
    city: 'Santo André',
    state: 'SP',
    salePrice: 1_380_000,
    bedrooms: 4,
    suites: 2,
    bathrooms: 2,
    parking: 4,
    builtArea: 197,
    totalArea: 197,
    iptu: 1_660,
    purpose: 'residencial',
    description:
      'Lindo sobrado de alto padrão, planejado e decorado, com 4 dormitórios sendo 2 suítes, closet, escritório, jardim de inverno, espaço gourmet com churrasqueira e 4 vagas. Janelas antirruído, ar-condicionado, móveis planejados e acabamento em porcelanato e piso vinílico.',
    features: [
      'Ar-condicionado',
      'Closet',
      'Escritório',
      'Espaço gourmet',
      'Churrasqueira',
      'Jardim de inverno',
      'Móveis planejados',
      'Lavabo',
      'Quintal',
    ],
    images: [
      img('1600585154340-be6161a56a0c'),
      img('1600566753086-00f18fb6b3ea'),
      img('1600607687939-ce8a6c25118c'),
      img('1600210492486-724fe5c67fb0'),
    ],
    broker: defaultBroker,
    location: { lat: -23.6678, lng: -46.5316 },
    featured: true,
  },
  {
    id: 'so2652',
    reference: 'SO2652',
    type: 'Casa',
    subtype: 'Casa de Condomínio',
    negotiation: ['venda'],
    title: 'Casa em condomínio na Santa Maria',
    district: 'Santa Maria',
    city: 'Santo André',
    state: 'SP',
    salePrice: 1_545_000,
    bedrooms: 4,
    suites: 3,
    bathrooms: 4,
    parking: 4,
    builtArea: 280,
    totalArea: 360,
    iptu: 2_100,
    condo: 950,
    purpose: 'residencial',
    description:
      'Casa de condomínio com amplo living, pé-direito duplo, integração com área externa, piscina e paisagismo. Acabamento refinado e suítes espaçosas.',
    features: ['Piscina', 'Pé-direito duplo', 'Suítes', 'Paisagismo', 'Área gourmet'],
    images: [
      img('1600585152220-90363fe7e115'),
      img('1600573472550-8090b5e0745e'),
      img('1600566753190-17f0baa2a6c3'),
    ],
    broker: defaultBroker,
    location: { lat: -23.6512, lng: -46.5402 },
    featured: true,
  },
  {
    id: 'ap1882',
    reference: 'AP1882',
    type: 'Apartamento',
    subtype: 'Padrão',
    negotiation: ['venda'],
    title: 'Apartamento amplo no Campestre',
    district: 'Campestre',
    city: 'Santo André',
    state: 'SP',
    salePrice: 699_000,
    bedrooms: 3,
    suites: 1,
    bathrooms: 2,
    parking: 2,
    builtArea: 96,
    totalArea: 96,
    iptu: 720,
    condo: 880,
    purpose: 'residencial',
    description:
      'Apartamento bem localizado, claro e ventilado, com 3 dormitórios sendo 1 suíte, varanda e 2 vagas. Condomínio com lazer completo.',
    features: ['Varanda', 'Lazer completo', 'Suíte', 'Armários planejados'],
    images: [
      img('1600047509807-ba8f99d2cdde'),
      img('1600121848594-d8644e57abab'),
      img('1600210492486-724fe5c67fb0'),
    ],
    broker: defaultBroker,
    location: { lat: -23.6701, lng: -46.5288 },
    featured: true,
  },
  {
    id: 'co2057',
    reference: 'CO2057',
    type: 'Cobertura',
    subtype: 'Cobertura',
    negotiation: ['venda'],
    title: 'Cobertura no Jardim Santo André',
    district: 'Jardim Santo André',
    city: 'Santo André',
    state: 'SP',
    salePrice: 490_000,
    bedrooms: 2,
    suites: 1,
    bathrooms: 2,
    parking: 2,
    builtArea: 120,
    totalArea: 120,
    iptu: 640,
    condo: 700,
    purpose: 'residencial',
    description:
      'Cobertura duplex com terraço, churrasqueira e vista aberta. Living integrado e ótima iluminação natural.',
    features: ['Terraço', 'Churrasqueira', 'Duplex', 'Vista livre'],
    images: [img('1605276374104-dee2a0ed3cd6'), img('1600607687939-ce8a6c25118c')],
    broker: defaultBroker,
    location: { lat: -23.6589, lng: -46.5123 },
    featured: true,
  },
  {
    id: 'ap3062',
    reference: 'AP3062',
    type: 'Apartamento',
    subtype: 'Padrão',
    negotiation: ['venda', 'locacao'],
    title: 'Apartamento na Vila Luzita',
    district: 'Vila Luzita',
    city: 'Santo André',
    state: 'SP',
    salePrice: 335_000,
    rentPrice: 2_990,
    bedrooms: 2,
    suites: 1,
    bathrooms: 1,
    parking: 1,
    builtArea: 58,
    totalArea: 58,
    iptu: 340,
    condo: 520,
    purpose: 'residencial',
    description:
      'Apartamento pronto para morar, com 2 dormitórios, 1 suíte e 1 vaga. Disponível para venda ou locação.',
    features: ['Suíte', 'Sacada', 'Portaria 24h'],
    images: [img('1600121848594-d8644e57abab'), img('1600566753190-17f0baa2a6c3')],
    broker: defaultBroker,
    location: { lat: -23.6845, lng: -46.5021 },
  },
  {
    id: 'sl1523',
    reference: 'SL1523',
    type: 'Comercial',
    subtype: 'Sala Comercial',
    negotiation: ['locacao'],
    title: 'Conjunto comercial na Vila América',
    district: 'Vila América',
    city: 'Santo André',
    state: 'SP',
    rentPrice: 13_000,
    bedrooms: 0,
    suites: 0,
    bathrooms: 2,
    parking: 4,
    builtArea: 220,
    totalArea: 220,
    purpose: 'comercial',
    description:
      'Excelente conjunto comercial em localização privilegiada, com recepção, salas amplas e 4 vagas.',
    features: ['Recepção', 'Ar-condicionado', 'Copa', 'Piso elevado'],
    images: [img('1497366754035-f200968a6e72'), img('1497366811353-6870744d04b2')],
    broker: defaultBroker,
    location: { lat: -23.6634, lng: -46.5267 },
  },
  {
    id: 'ca3237',
    reference: 'CA3237',
    type: 'Casa',
    subtype: 'Padrão',
    negotiation: ['locacao'],
    title: 'Casa para locação na Vila Luzita',
    district: 'Vila Luzita',
    city: 'Santo André',
    state: 'SP',
    rentPrice: 1_800,
    bedrooms: 2,
    suites: 0,
    bathrooms: 1,
    parking: 1,
    builtArea: 70,
    totalArea: 90,
    purpose: 'residencial',
    description: 'Casa térrea aconchegante, com quintal e 1 vaga. Pronta para morar.',
    features: ['Quintal', 'Térrea', 'Área de serviço'],
    images: [img('1568605114967-8130f3a36994'), img('1570129477492-45c003edd2be')],
    broker: defaultBroker,
    location: { lat: -23.6839, lng: -46.5044 },
  },
  {
    id: 'so2795',
    reference: 'SO2795',
    type: 'Casa',
    subtype: 'Padrão',
    negotiation: ['venda', 'locacao'],
    title: 'Casa no Jardim do Mar',
    district: 'Jardim do Mar',
    city: 'São Bernardo do Campo',
    state: 'SP',
    salePrice: 1_378_000,
    rentPrice: 6_000,
    bedrooms: 3,
    suites: 1,
    bathrooms: 3,
    parking: 3,
    builtArea: 210,
    totalArea: 250,
    iptu: 1_900,
    purpose: 'residencial',
    description:
      'Casa espaçosa em bairro nobre, com 3 dormitórios, área gourmet e 3 vagas. Venda ou locação.',
    features: ['Área gourmet', 'Suíte', 'Quintal', 'Churrasqueira'],
    images: [img('1600585154526-990dced4db0d'), img('1600573472550-8090b5e0745e')],
    broker: defaultBroker,
    location: { lat: -23.6912, lng: -46.5645 },
  },
  {
    id: 'ap1694',
    reference: 'AP1694',
    type: 'Apartamento',
    subtype: 'Padrão',
    negotiation: ['lancamento'],
    isLaunch: true,
    title: 'Lançamento no Jardim Santo Alberto',
    district: 'Jardim Santo Alberto',
    city: 'Santo André',
    state: 'SP',
    salePrice: 314_000,
    bedrooms: 2,
    suites: 1,
    bathrooms: 1,
    parking: 1,
    builtArea: 52,
    totalArea: 52,
    purpose: 'residencial',
    description:
      'Lançamento com plantas inteligentes de 2 dormitórios, lazer completo e infraestrutura moderna. Entrega facilitada.',
    features: ['Lazer completo', 'Piscina', 'Salão de festas', 'Espaço fitness'],
    images: [img('1545324418-cc1a3fa10c00'), img('1502672260266-1c1ef2d93688')],
    broker: defaultBroker,
    location: { lat: -23.6457, lng: -46.5018 },
    featured: true,
  },
  {
    id: 'ap1900',
    reference: 'AP1900',
    type: 'Apartamento',
    subtype: 'Padrão',
    negotiation: ['lancamento'],
    isLaunch: true,
    title: 'Lançamento de alto padrão na Vila Gilda',
    district: 'Vila Gilda',
    city: 'Santo André',
    state: 'SP',
    salePrice: 1_330_000,
    bedrooms: 3,
    suites: 3,
    bathrooms: 4,
    parking: 3,
    builtArea: 140,
    totalArea: 140,
    purpose: 'residencial',
    description:
      'Lançamento exclusivo com acabamento premium, 3 suítes, varanda gourmet e lazer de resort.',
    features: ['Varanda gourmet', '3 suítes', 'Lazer de resort', 'Coworking', 'Pet place'],
    images: [img('1512917774080-9991f1c4c750'), img('1600607687939-ce8a6c25118c')],
    broker: defaultBroker,
    location: { lat: -23.6723, lng: -46.5189 },
    featured: true,
  },
  {
    id: 'ap1516',
    reference: 'AP1516',
    type: 'Apartamento',
    subtype: 'Padrão',
    negotiation: ['lancamento'],
    isLaunch: true,
    title: 'Lançamento na Vila América',
    district: 'Vila América',
    city: 'Santo André',
    state: 'SP',
    salePrice: 384_000,
    bedrooms: 2,
    suites: 1,
    bathrooms: 2,
    parking: 1,
    builtArea: 60,
    totalArea: 60,
    purpose: 'residencial',
    description: 'Lançamento bem localizado, plantas de 2 dormitórios e área de lazer completa.',
    features: ['Lazer completo', 'Bicicletário', 'Salão de festas'],
    images: [img('1493809842364-78817add7ffb'), img('1502005229762-cf1b2da7c5d6')],
    broker: defaultBroker,
    location: { lat: -23.6631, lng: -46.5271 },
  },
  {
    id: 'te2202',
    reference: 'TE2202',
    type: 'Terreno',
    subtype: 'Loteamento/Condomínio',
    negotiation: ['venda', 'locacao'],
    title: 'Terreno no Parque das Nações',
    district: 'Parque das Nações',
    city: 'Santo André',
    state: 'SP',
    salePrice: 2_000_000,
    rentPrice: 15_000,
    bedrooms: 0,
    suites: 0,
    bathrooms: 0,
    parking: 0,
    builtArea: 0,
    totalArea: 1_000,
    purpose: 'comercial',
    description:
      'Terreno plano em região comercial estratégica, ideal para empreendimento. Venda ou locação.',
    features: ['Esquina', 'Região comercial', 'Plano'],
    images: [img('1500382017468-9049fed747ef'), img('1501594907352-04cda38ebc29')],
    broker: defaultBroker,
    location: { lat: -23.6398, lng: -46.5334 },
  },
]

export const byNegotiation = (n: Negotiation) =>
  PROPERTIES.filter((p) => p.negotiation.includes(n))

export const featuredProperties = () => PROPERTIES.filter((p) => p.featured)

export const findProperty = (id: string) => PROPERTIES.find((p) => p.id === id)
