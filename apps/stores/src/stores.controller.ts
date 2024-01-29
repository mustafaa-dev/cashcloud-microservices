import { Controller } from '@nestjs/common';
import { StoresService } from './stores.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @MessagePattern('get_stores')
  getHello(@Payload() msg: any): string {
    return msg;
  }
}
