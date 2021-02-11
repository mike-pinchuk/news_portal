import { Controller, Get, NotFoundException, Param, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthorizedRequest } from 'src/utils/types';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('me')
    async getProfile(@Request() req: AuthorizedRequest) {
        return this.userService.getUserbyId(req.user.id)
    }

    @Get(':id')
    async getUser(@Param('id') id: string) {
        const user = await this.userService.getUserbyId(id)
        if(!user) {
            throw new NotFoundException('ERROR_USER_NOT_FOUND')
        }
        return user
    }
}
