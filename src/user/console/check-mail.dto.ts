import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class CheckMailDto {
  @IsEmail()
  @MinLength(5)
  @MaxLength(50)
  email: string;
}
