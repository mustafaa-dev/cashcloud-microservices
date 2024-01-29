import { Injectable } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';

@Injectable()
export class StoresService {
  async getHello(@Payload('msg') msg: any) {
    return msg;
  }
}
