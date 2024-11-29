import { IsNotEmpty, IsNumber, Min, IsString, Matches } from 'class-validator';

export class CreateRechargeDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{10,15}$/, { message: 'Invalid phone number format' })
  phoneNumber: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01, { message: 'Amount must be greater than zero' })
  amount: number;
}
