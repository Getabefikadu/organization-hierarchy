import { IsUUID, IsNotEmpty } from 'class-validator';

export class ShowParams {
  //@IsNotEmpty()
  @IsUUID()
  id: string;
}
