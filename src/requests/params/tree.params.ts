import { IsNumberString, IsOptional } from 'class-validator';

export class TreeParams {
  @IsOptional()
  @IsNumberString()
  depth?: number;
}