import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Dropdown, { toOptions, type Option } from '@/components/ui/Dropdown'
import Stepper from '@/components/ui/Stepper'
import { BedIcon, BathIcon, CarIcon } from '@/components/ui/icons'
import {
  BAIRROS,
  CITIES,
  NEGOTIATIONS,
  PROPERTY_TYPES,
  SALE_PRICE_RANGES,
} from '@/data/site'

const negOptions: Option[] = NEGOTIATIONS.map((n) => ({ value: n.value, label: n.label }))
const valorOptions: Option[] = SALE_PRICE_RANGES.map((r, i) => ({
  value: String(i),
  label: r.label,
}))

export default function SearchBar() {
  const navigate = useNavigate()
  const [negotiation, setNegotiation] = useState('venda')
  const [type, setType] = useState('')
  const [city, setCity] = useState('')
  const [bairro, setBairro] = useState('')
  const [faixa, setFaixa] = useState('')
  const [dorm, setDorm] = useState(0)
  const [bath, setBath] = useState(0)
  const [parking, setParking] = useState(0)
  const [reference, setReference] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (type) params.set('tipo', type)
    if (city) params.set('cidade', city)
    if (bairro) params.set('bairro', bairro)
    if (faixa) params.set('faixa', faixa)
    if (dorm) params.set('dorm', String(dorm))
    if (bath) params.set('banheiros', String(bath))
    if (parking) params.set('vagas', String(parking))
    if (reference.trim()) params.set('ref', reference.trim())
    const qs = params.toString()
    navigate(`/imoveis/${negotiation || 'venda'}${qs ? `?${qs}` : ''}`)
  }

  return (
    <form
      onSubmit={submit}
      className="w-full bg-paper/95 shadow-[0_28px_70px_-34px_rgba(0,0,0,0.55)] backdrop-blur-md"
    >
      {/* Linha 1 */}
      <div className="flex flex-col divide-y divide-line md:flex-row md:divide-x md:divide-y-0">
        <div className="md:flex-1">
          <Dropdown
            label="Negociação"
            value={negotiation}
            onChange={(v) => setNegotiation(v || 'venda')}
            options={negOptions}
            placeholder="Venda ou Locação"
          />
        </div>
        <div className="md:flex-1">
          <Dropdown
            label="Tipo"
            value={type}
            onChange={setType}
            options={toOptions(PROPERTY_TYPES)}
            placeholder="Todos os tipos"
          />
        </div>
        <div className="md:flex-1">
          <Dropdown
            label="Cidade"
            value={city}
            onChange={setCity}
            options={toOptions(CITIES)}
            placeholder="Todas as cidades"
          />
        </div>
        <div className="md:flex-1">
          <Dropdown
            label="Bairro"
            value={bairro}
            onChange={setBairro}
            options={toOptions(BAIRROS)}
            placeholder="Todos os bairros"
          />
        </div>
      </div>

      <div className="hairline" />

      {/* Linha 2 */}
      <div className="flex flex-col divide-y divide-line md:flex-row md:divide-x md:divide-y-0">
        <div className="md:w-56">
          <Dropdown
            label="Valor"
            value={faixa}
            onChange={setFaixa}
            options={valorOptions}
            placeholder="Qualquer valor"
          />
        </div>

        <Stepper icon={<BedIcon />} label="Dormitórios" value={dorm} onChange={setDorm} />
        <Stepper icon={<BathIcon />} label="Banheiros" value={bath} onChange={setBath} />
        <Stepper icon={<CarIcon />} label="Vagas" value={parking} onChange={setParking} />

        <label className="flex flex-1 flex-col justify-center gap-1 p-5">
          <span className="kicker text-[0.58rem]">Referência</span>
          <input
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="Ex.: SO1448"
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-stone-light"
          />
        </label>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-ink px-10 py-5 text-[0.72rem] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-bronze"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
          </svg>
          Buscar
        </button>
      </div>
    </form>
  )
}
