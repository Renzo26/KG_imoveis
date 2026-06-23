// Informações institucionais da KG Imóveis (dados reais do levantamento).
// Telefones padronizados a partir do rodapé (fonte mais consistente).

export const SITE = {
  name: 'KG Imóveis',
  foundedYear: 2004,
  creci: 'CRECI 31255-J',
  tagline: 'Imobiliária em Santo André desde 2004',
  address: {
    street: 'Avenida Dom Pedro I, nº 1514',
    district: 'Vila Pires',
    city: 'Santo André',
    state: 'SP',
    zip: '09130-012',
  },
  phones: {
    landline: '11 92085-3336',
    whatsapp: '11 97999-9099',
    whatsappAlt: '11 98289-9416',
  },
  email: 'contato@kgimoveis.com.br',
  social: {
    instagram: 'https://www.instagram.com/kgimoveis',
    facebook: 'https://www.facebook.com/kgimoveis',
    handle: '@kgimoveis',
  },
} as const

export const NAV = [
  { label: 'Início', to: '/' },
  { label: 'Venda', to: '/imoveis/venda' },
  { label: 'Locação', to: '/imoveis/locacao' },
  { label: 'Lançamentos', to: '/imoveis/lancamentos' },
  { label: 'Empresa', to: '/empresa' },
  { label: 'Cadastre seu Imóvel', to: '/cadastre-seu-imovel' },
  { label: 'Encontre seu Imóvel', to: '/encontre-seu-imovel' },
  { label: 'Simuladores', to: '/simuladores' },
  { label: 'Contato', to: '/contato' },
] as const

export const CITIES = [
  'Santo André',
  'São Bernardo do Campo',
  'São Caetano do Sul',
  'Diadema',
  'Mauá',
  'Ribeirão Pires',
  'São Paulo',
  'Guarujá',
  'Praia Grande',
  'Santos',
] as const

export const NEGOTIATIONS = [
  { value: 'venda', label: 'Venda' },
  { value: 'locacao', label: 'Locação' },
] as const

export const BAIRROS = [
  'Campestre',
  'Centro',
  'Jardim do Estádio',
  'Jardim do Mar',
  'Jardim Santo Alberto',
  'Jardim Santo André',
  'Parque das Nações',
  'Santa Maria',
  'Vila Alzira',
  'Vila América',
  'Vila Assunção',
  'Vila Bela Vista',
  'Vila Camilópolis',
  'Vila Floresta',
  'Vila Gilda',
  'Vila Helena',
  'Vila Homero Thon',
  'Vila Humaitá',
  'Vila Linda',
  'Vila Luzita',
  'Vila Pires',
  'Vila Tibiriçá',
  'Vila Valparaíso',
] as const

export const PROPERTY_TYPES = [
  'Apartamento',
  'Casa',
  'Cobertura',
  'Comercial',
  'Galpão',
  'Rural',
  'Sobrado',
  'Terreno',
] as const

export const SALE_PRICE_RANGES = [
  { label: 'Até R$ 100.000', min: 0, max: 100_000 },
  { label: 'R$ 100.001 a R$ 300.000', min: 100_001, max: 300_000 },
  { label: 'R$ 300.001 a R$ 600.000', min: 300_001, max: 600_000 },
  { label: 'R$ 600.001 a R$ 900.000', min: 600_001, max: 900_000 },
  { label: 'A partir de R$ 900.001', min: 900_001, max: Infinity },
] as const
