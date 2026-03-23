export interface Vehicle {
  placa: string
  modelo: string
  ano: number
  acelerar(): void
  freiar(): void
}

export enum VehicleType {
  CAR = 'car',
  TRUCK = 'truck',
  MOTORCYCLE = 'motorcycle'
}

abstract class VehicleBase implements Vehicle {

constructor(
  public placa: string,
  public modelo: string,
  public ano: number
) {}

  abstract acelerar(): void
  abstract freiar(): void
}

class Car extends VehicleBase {

  acelerar(): void {
    console.log('Acelerando o carro!')
  }

  freiar(): void {
    console.log('Freiando o carro!')
  }
}

class Truck extends VehicleBase {

  acelerar(): void {
    console.log('Acelerando o caminhão!')
  }

  freiar(): void {
    console.log('Freiando o caminhão!')
  }
}

class Motorcycle extends VehicleBase {

  acelerar(): void {
    console.log('Acelerando a moto!')
  }

  freiar(): void {
    console.log('Freiando a moto!')
  }
}


export class VehicleFactory {  
static create(type: VehicleType, placa: string, modelo: string, ano: number): Vehicle {
  switch (type) {
    case VehicleType.CAR:
      return new Car(placa, modelo, ano)
    case VehicleType.TRUCK:
      return new Truck(placa, modelo, ano)  
    case VehicleType.MOTORCYCLE:
      return new Motorcycle(placa, modelo, ano)
      default:
        throw new Error(`Tipo inválido: ${type}`)
   }
  }
}

