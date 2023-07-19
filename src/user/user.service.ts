import { Injectable, NotFoundException  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'; // Asegúrate de que tienes bcrypt instalado y importado correctamente
import { USER } from 'commons/models/models';
import { IUser } from 'commons/interfaces/user.interface';
import { UserDTO } from './dto/user.dto';


@Injectable()
export class UserService {
  constructor(@InjectModel(USER.name) private readonly model: Model<IUser>) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async create(userDto: UserDTO): Promise<IUser> {
    const hash = await this.hashPassword(userDto.password);

    const newUser = new this.model({
      ...userDto,
      password: hash,
    });

    return await newUser.save();
  }

 async getalluser(): Promise<IUser[]> {
    const allUser = await this.model.find();
    return allUser;
 }

 async getOneUser(id: string): Promise<IUser> {
    const oneUser = await this.model.findById(id);

    if (!oneUser) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return oneUser;
  }
}

