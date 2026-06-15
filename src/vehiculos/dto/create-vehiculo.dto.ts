import { Type } from "class-transformer";
import { IsIn, IsInt, IsNotEmpty, IsNumber, IsString, Matches, Max, MaxLength, Min, MinLength, ValidateNested } from "class-validator";

class BaseVehiculoDto {
    
    @IsString()
    @IsNotEmpty()
    @Matches(/^[A-Z]{3}-\d{4}$/, {
        message: "La placa debe tener el formato ABC-1234"
    })
    placa!: string;


    @IsString()
    @IsNotEmpty()
    @MinLength(2, {
        message: "La marca debe tener al menos 2 caracteres"
    })
    @MaxLength(30, {
        message: "La marca no debe exceder los 30 caracteres"
    })
    @Matches(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ.,\-#&()]+$/, {
        message: "La marca solo puede contener letras y espacios"
    })
    marca!: string;


    @IsString()
    @IsNotEmpty()
    @MinLength(2, {
        message: "El modelo debe tener al menos 2 caracteres"
    })
    @MaxLength(150, {
        message: "El modelo no debe exceder los 150 caracteres"
    })
    @Matches(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ.,\-#&()]+$/, {
        message: "El modelo solo puede contener letras y espacios"
    })
    modelo!: string;


    @IsString()
    @IsNotEmpty()
    @MinLength(2, {
        message: "El color debe tener al menos 2 caracteres"
    })
    @MaxLength(150, {
        message: "El color no debe exceder los 150 caracteres"
    })
    @Matches(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ.,\-#&()]+$/, {
        message: "El color solo puede contener letras y espacios"
    })
    color!: string;


    @Min(1885, {
        message: 'El año debe ser mayor o igual a 1885',
    })
    @Max(new Date().getFullYear() + 1, {
        message: `El año no puede ser mayor a ${new Date().getFullYear() + 1}`,
    })
    @IsInt({
        message: 'El año debe ser un número entero',
    })
    anio!: number;
}


class AutoDto extends BaseVehiculoDto {

    @Min(2, {
        message: "El número de puertas debe ser al menos 2"
    })
    @Max(5, {
        message: "El número de puertas no debe exceder 5"
    })
    @IsInt({message: "El número de puertas debe ser un número entero"})
    numeroPuertas!: number;

    @Min(0, {
        message: "La capacidad del maletero debe ser un número positivo"
    })
    @IsInt({message: "La capacidad del maletero debe ser un número entero"})
    capacidadMaletero!: number;
}


class MotoDto extends BaseVehiculoDto {

    @IsString()
    @IsNotEmpty()
    @Matches(/^[A-Z]{2}-\d{3}[A-Z]$/, {
        message: "La placa de la motocicleta debe tener el formato AB-123C"
    })
    declare placa: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^(Deportivo|Scooter|Motocross)$/, {
        message: "El tipo de motocicleta debe ser Deportivo, Scooter o Motocross"
    })
    tipo!: string;
}


class CamionetaDto extends BaseVehiculoDto {

    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ.,\-#&()]+$/, {
        message: "La cabina solo puede contener letras y espacios"
    })
    cabina!: string;

    @Min(0, {
        message: "La capacidad de carga debe ser un número positivo"
    })
    @Max(100000, {
        message: "La capacidad de carga no debe exceder los 100000 kg"
    })
    @IsInt({message: "La capacidad de carga debe ser un número entero"})
    capacidadCarga!: number;
}


export class CreateVehiculoDto {
  @IsIn(['auto', 'moto', 'camioneta'])
  tipo!: string;

  @ValidateNested()
  @Type((opts) => {
    const object = opts?.object as CreateVehiculoDto;
    if (!object) return BaseVehiculoDto;

    switch (object.tipo) {
      case 'auto':
        return AutoDto;
      case 'moto':
        return MotoDto;
      case 'camioneta':
        return CamionetaDto;
      default:
        return BaseVehiculoDto;
    }
  })
  datos!: AutoDto | MotoDto | CamionetaDto;
}
