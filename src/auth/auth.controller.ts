import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/auth-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

    @Post('signup')
    async signUp(@Body() signUpDto: CreateAuthDto) {
        const existUser = this.userService.findByEmail(signUpDto.email)
        if (existUser) {
            throw new BadRequestException('ERROR_USER_WITH_THIS_EMAIL_ARE_EXIST')
        }
        const user = await this.userService.createUser(signUpDto.firstName, signUpDto.secondName, signUpDto.age, signUpDto.email, signUpDto.password)
        return this.authService.createToken(user?.id)
    }
}
