import { useForm } from "react-hook-form"
import { useState } from "react"
import { VehicleType, VehicleFactory, type Vehicle } from "./VehicleFactory"

interface VehicleFormData {
    type: VehicleType
    placa: string
    modelo: string
    ano: number
}

export function VehicleFactoryDemo() {
const [vehicleData, setVehicleData] = useState<Vehicle[]>([])

const { register, handleSubmit } = useForm<VehicleFormData>({
    defaultValues: {
        type: VehicleType.CAR,
        placa: '',
        modelo: '',
        ano: new Date().getFullYear()
    }
 })

function onSubmit(data: VehicleFormData) {
    const vehicle = VehicleFactory.create(data.type, data.placa, data.modelo, data.ano)
    setVehicleData(prev => [...prev, vehicle])
 }

return (
  <div className="bg-zinc-900 p-8 min-h-screen flex flex-col">
    <h1 className="text-2xl font-bold mb-8 text-emerald-400">Factory Method — Vehicle Factory</h1>
    <div className="grid grid-cols-2 gap-6">
        <form onSubmit={handleSubmit(onSubmit)}
            className="bg-zinc-900 border border-zinc-700 p-6 rounded-xl flex flex-col gap-4">
            <div>
                <label className="block mb-1 text-sm text-zinc-400">Tipo de Veículo</label>
                <select className="bg-zinc-900 border border-zinc-600 text-zinc-100 px-4 py-2 rounded-lg w-full" {...register('type')}>
                    <option value={VehicleType.CAR}>Carro</option>
                    <option value={VehicleType.TRUCK}>Caminhão</option>
                    <option value={VehicleType.MOTORCYCLE}>Moto</option>
                </select>
                    <label className="block mb-1 mt-4 text-sm text-zinc-400">Placa</label>
                    <input className="bg-zinc-900 border border-zinc-600 text-zinc-100 px-4 py-2 rounded-lg w-full" {...register('placa')} />
                    <label className="block mb-1 mt-4 text-sm text-zinc-400">Modelo</label>
                    <input className="bg-zinc-900 border border-zinc-600 text-zinc-100 px-4 py-2 rounded-lg w-full" {...register('modelo')} />
                    <label className="block mb-1 mt-4 text-sm text-zinc-400">Ano</label>
                    <input className="bg-zinc-900 border border-zinc-600 text-zinc-100 px-4 py-2 rounded-lg w-full" {...register('ano', { valueAsNumber: true })} />
            </div>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-500 cursor-pointer" type="submit">
                Criar Veículo
            </button>
        </form>
            <div className="bg-zinc-800 border border-zinc-700 p-6 rounded-xl">
                <h2 className="text-xl font-bold mb-4 border-b border-zinc-700 pb-4 text-emerald-400">Veículos Criados</h2>
                {vehicleData.length === 0 ? (
                    <p className="text-zinc-400">Nenhum veículo criado ainda.</p>
                ) : (
                    <ul className="space-y-2">
                        {vehicleData.map((vehicle, index) => (
                            <li key={index} className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 flex justify-between items-center">
                            <div>
                                <span className="text-emerald-400 font-semibold">{vehicle.modelo}</span>
                                <span className="text-zinc-500 ml-2">{vehicle.placa} • {vehicle.ano}</span>
                            </div>
                             <span className="text-xs px-2 py-1 rounded-full bg-emerald-900 text-emerald-400">
                            {vehicle.constructor.name}
                             </span>
                        </li>
                        ))}
                    </ul>
                )}
                </div>

    </div>
  </div>
)
}
