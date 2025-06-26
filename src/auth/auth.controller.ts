import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() dados: LoginDto) {
    return this.authService.login(dados.email, dados.senha);
  }

  @Post('register')
  async register(@Body() dados: LoginDto) {
    return this.authService.register(dados.email, dados.senha);
  }
}
