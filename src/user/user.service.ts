import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashGenerator } from 'src/utils';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) { }

    async getUserbyId(id: string): Promise<UserEntity | undefined> {
        return this.userRepository.findOne(id)
    }

    async findByEmail(email: string): Promise<UserEntity | undefined> {
        return this.userRepository.createQueryBuilder('user')
            .select()
            .addSelect('user.passwordHash')
            .where('user.email = :email', { email })
            .getOne()
    }

    async createUser(firstName: string, secondName: string, age: number, email: string, password: string): Promise<UserEntity | undefined> {
        return this.userRepository.save({ firstName, secondName, age, email, passwordHash: hashGenerator(password) })
    }
}
