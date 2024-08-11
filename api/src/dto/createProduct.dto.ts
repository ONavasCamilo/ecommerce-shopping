import {
    IsDecimal,
    IsEmpty,
    IsInt,
    IsOptional,
    IsString,
    Max,
    MaxLength,
    Min,
  } from "class-validator";
  
  class CreateProductDto {
    @IsString()
    @MaxLength(50)
    name: string;
  
    @IsString()
    description: string;
  
    @IsDecimal(
      { decimal_digits: "2" },
      { message: "El precio debe tener hasta 2 decimales." }
    )
    @Min(0, { message: "El precio no puede ser negativo." })
    @Max(9999999999.99, { message: "El precio no puede exceder 9999999999.99." })
    price: number;
  
    @IsInt({ message: "Stock debe ser un número entero" })
    @Min(0)
    stock: number;
  
    @IsString()
    category: string;
  }
  
  export default CreateProductDto;
  