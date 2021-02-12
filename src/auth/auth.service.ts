import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { typedEnv } from 'src/utils/typed-env';

@Injectable()
export class AuthService {
    createToken(userId: string) {
        const token = jwt.sign({ id: userId }, typedEnv.JWT_SECRET);
        return { token }
    }
}
