import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateAuthDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'John'})
    readonly firstName!: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'Week'})
    readonly secondName!: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({example: '48'})
    readonly age!: number

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({example: 'john_week@gmail.com'})
    readonly email!: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'my_password'})
    readonly password!: string
}