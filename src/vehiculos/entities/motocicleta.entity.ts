import { ChildEntity, Column } from "typeorm";
import { Vehiculo } from "./vehiculo.entity";

export enum TipoMoto {
    DEPORTIVO = 'Deportivo',
    SCOOTER = 'Scooter',
    MOTOCROSS = 'Motocross',
}

@ChildEntity("Motocicleta")
export class Motocicleta extends Vehiculo {

    @Column({ type: 'enum', enum: TipoMoto })
    tipoMoto!: TipoMoto;

    obtenerTipo(): string {
        return 'Motocicleta';
    }

}