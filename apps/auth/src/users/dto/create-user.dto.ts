import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  userName: string;

  @IsStrongPassword()
  @IsString()
  password: string;

  @IsString()
  @Length(11, 11)
  phone: string;

  @IsOptional()
  @IsBoolean()
  active: boolean;

  @IsOptional()
  @IsNumber()
  roleId: number;

  @IsOptional()
  @IsNumber()
  noOfStores: number;
}
