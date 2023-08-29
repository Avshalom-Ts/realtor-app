import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  Matches,
} from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @Matches(
    /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm,
    { message: 'Phone must be a valid phone number' },
  )
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  password: string;
}
