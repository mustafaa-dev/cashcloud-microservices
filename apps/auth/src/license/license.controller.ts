import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('license')
export class LicenseController {
  @Get()
  @UseGuards(JwtAuthGuard)
  async getLicense() {
    return 'true';
  }
}
