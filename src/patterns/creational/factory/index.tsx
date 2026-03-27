import { useForm } from "react-hook-form";
import { useState } from "react";
import { VehicleType, VehicleFactory, type Vehicle } from "./VehicleFactory";

interface VehicleFormData {
  type: VehicleType;
  placa: string;
  modelo: string;
  ano: number;
}

export function VehicleFactoryDemo() {
  const [vehicleData, setVehicleData] = useState<Vehicle[]>([]);

  const { register, handleSubmit } = useForm<VehicleFormData>({
    defaultValues: {
      type: VehicleType.CAR,
      placa: "",
      modelo: "",
      ano: new Date().getFullYear(),
    },
  });

  function onSubmit(data: VehicleFormData): void {
    const vehicle = VehicleFactory.create(
      data.type,
      data.placa,
      data.modelo,
      data.ano,
    );
    setVehicleData((prev) => [...prev, vehicle]);
  }

  return (
    <div className="bg-zinc-900 p-8 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-8 text-emerald-400">
        Factory Method — Vehicle Factory
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="cartao flex flex-col gap-4"
        >
          <div>
            <label className="rotulo">Tipo de Veículo</label>
            <select className="entrada" {...register("type")}>
              <option value={VehicleType.CAR}>Carro</option>
              <option value={VehicleType.TRUCK}>Caminhão</option>
              <option value={VehicleType.MOTORCYCLE}>Moto</option>
            </select>
          </div>
          <div>
            <label className="rotulo">Placa</label>
            <input className="entrada" {...register("placa")} />
          </div>
          <div>
            <label className="rotulo">Modelo</label>
            <input className="entrada" {...register("modelo")} />
          </div>
          <div>
            <label className="rotulo">Ano</label>
            <input
              className="entrada"
              type="number"
              {...register("ano", { valueAsNumber: true })}
            />
          </div>
          <button className="botao-primario" type="submit">
            Criar Veículo
          </button>
        </form>

        <div className="cartao">
          <h2 className="cartao-titulo">Veículos Criados</h2>
          {vehicleData.length === 0 ? (
            <p className="text-zinc-500">Nenhum veículo criado ainda.</p>
          ) : (
            <ul className="space-y-2">
              {vehicleData.map((vehicle, index) => (
                <li
                  key={index}
                  className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 flex justify-between items-center"
                >
                  <div>
                    <span className="text-emerald-400 font-semibold">
                      {vehicle.modelo}
                    </span>
                    <span className="text-zinc-500 ml-2">
                      {vehicle.placa} • {vehicle.ano}
                    </span>
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
  );
}
