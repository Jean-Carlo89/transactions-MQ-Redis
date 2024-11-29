import { IsNotEmpty, IsNumber, Min, IsString, Matches } from 'class-validator';

export class CreateRechargeDto {
  @IsNotEmpty()
  @IsString()
  user_id: string;

  //*** general valdiation fow worldwide numbers*/
  @IsNotEmpty()
  @IsString()
  @Matches(/^\+\d{1,3}\d{7,15}$/, {
    message:
      'Property "phone_number" has wrong value $value, it must be in the international format starting with "+" and include country code and number',
  })
  phone_number: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01, { message: 'Amount must be greater than zero' })
  amount: number;
}
