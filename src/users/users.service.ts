import { Body, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { validate } from 'class-validator';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
      private usersRepository: Repository<User>,
  ) {}

  //Create New record
  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const {firstName, lastName, email, phone, password, isActive} = createUserDto;
    const user = this.usersRepository.findOneBy({email: email})

    if (user) {
      const errors = {email: 'Email must be unique.'};
      throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);
    }

    // create new user
    let newUser = new User();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.phone = phone;
    newUser.password = password;
    newUser.isActive = isActive;

    const errors = await validate(newUser);

    if(errors.length>0){
      const _errors = {username: 'Userinput is not valid.'};
      throw new HttpException({message: 'Input data validation failed', _errors}, HttpStatus.BAD_REQUEST);
    }else{
      const savedUser = await this.usersRepository.save(newUser);
      return savedUser;
    }
  }

  //Get all records
  findAll() {
    return this.usersRepository.find();
  }

  //Get single record
  findOne(id: number){
    return this.usersRepository.findOneBy({id: id})
  }

  //Get single record
  findOneByEmail(email: string){
    return this.usersRepository.findOneBy({email: email})
  }

  //Update function
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {

    let updateArr = await this.usersRepository.findOneBy({id: id});
    delete updateArr.password;
    delete updateArr.email;

    let updated = Object.assign(updateArr, updateUserDto);
    return await this.usersRepository.save(updated);
  }

  //delete function
  async remove(id: number){
    return await this.usersRepository.delete({ id: id});
  }

}
