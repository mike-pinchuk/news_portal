import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>){}

    async getUserbyId(id: string): Promise<UserEntity | undefined> {
        return this.userRepository.findOne(id)
    }
}
