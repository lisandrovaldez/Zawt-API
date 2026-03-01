import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3, { message: 'El nombre es muy corto' })
  @MaxLength(50, { message: 'El nombre debe tener maximo 50 caracteres' })
  name: string;

  @IsEmail({}, { message: 'El formato del correo no es válido' })
  @MaxLength(70, { message: 'El email debe tener maximo 70 caracteres' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(20, { message: 'La contraseña debe tener maximo 20 caracteres' })
  password: string;
}
