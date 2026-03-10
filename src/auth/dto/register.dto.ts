import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class RegisterDto {
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
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      'La contraseña debe contener al menos una mayúscula, una minúscula y un número',
  })
  password: string;
}
