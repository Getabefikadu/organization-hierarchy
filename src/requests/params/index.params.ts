import { IsNumberString, IsOptional } from 'class-validator';

export class IndexParams {
  @IsOptional()
  @IsNumberString()
  limit?: number;

  @IsOptional()
  @IsNumberString()
  page?: number;
}
