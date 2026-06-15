import { Column } from "typeorm";
import { Vehiculo } from "./vehiculo.entity";

export class Camioneta extends Vehiculo {

    @Column()
    cabina!: string;
    
    @Column()
    capacidadCarga!: number;

    obtenerTipo(): string {
        return 'camioneta';
    }

}