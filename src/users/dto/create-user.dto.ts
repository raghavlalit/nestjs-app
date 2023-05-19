import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    readonly firstName: string;

    @IsNotEmpty()
    readonly lastName: string;

    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;


    @IsNotEmpty()
    readonly phone: string;

    @IsNotEmpty()
    readonly isActive: boolean;
}
