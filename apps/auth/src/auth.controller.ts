import { Controller, Get, Inject, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/auth.guard';
import { CurrentUser } from './current-user.decorator';
import { User } from './users/entites/user.entity';
import { Response } from 'express';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { STORES_SERVICE } from '@app/common';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(STORES_SERVICE) private readonly storesService: ClientProxy,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate() {}

  @Get('store')
  async getStores() {
    this.storesService
      .send('get_stores', { msg: 'heeeee' })
      .subscribe(async (res) => {
        console.log(res);
      });
  }
}
