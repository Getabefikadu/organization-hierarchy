import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class PositionModel {
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUUID()
  parent?: string;
}
