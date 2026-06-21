import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Matches, Max, MaxLength, Min, MinLength } from "class-validator";

export class UpdateVehiculoDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Matches(/^[A-Z]{3}-\d{4}$/, {
        message: "La placa debe tener el formato ABC-1234"
    })
    placa?: string;

    @IsOptional()
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
    marca?: string;

    @IsOptional()
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
    modelo?: string;

    @IsOptional()
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
    color?: string;

    @IsOptional()
    @Min(1885, {
        message: 'El año debe ser mayor o igual a 1885',
    })
    @Max(new Date().getFullYear() + 1, {
        message: `El año no puede ser mayor a ${new Date().getFullYear() + 1}`,
    })
    @IsInt({
        message: 'El año debe ser un número entero',
    })
    anio?: number;

    @IsOptional()
    @IsString()
    @IsIn(['Electrico', 'Hibrido', 'Gasolina', 'Diesel'], {
        message: 'La clasificación debe ser: Electrico, Hibrido, Gasolina o Diesel'
    })
    clasificacion?: string;
}
