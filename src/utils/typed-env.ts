import { config } from 'dotenv'
import * as Joi from 'joi'

const requiredEnvs = {
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required()
}

const optionsEnvs = {
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'staging')
        .default('development'),
    PORT: Joi.number().port().default(3000),
    LOGS_DIR_NAME: Joi.string().default('./logs/'),
};

const envs = {
    ...requiredEnvs,
    ...optionsEnvs
};

if (process.env.NODE_ENV === 'development') {
    const envConfig = config();

    // set env vars from '.env' file
    const env = envConfig.parsed || {};
    Object.keys(env).forEach(valueName => {
        process.env[valueName] = env[valueName];
    });
}

const validateAndReturnTypedEnv = () => {
    const keys = Object.keys(envs);
    const globalEnvs: { [key: string]: any } = {};
    keys.forEach(key => {
        globalEnvs[key] = process.env[key];
    });
    const { error, value } = Joi.object(requiredEnvs).concat(Joi.object(optionsEnvs))
        .validate(globalEnvs, { allowUnknown: false, abortEarly: true });
    if (error) {
        throw new Error(error.message);
    }
    return value as { [key in keyof typeof envs]: any };
};

export const typedEnv = validateAndReturnTypedEnv();