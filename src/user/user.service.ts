import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const findUser = await this.userModel.find({
      username: createUserDto.username,
    });
    if (findUser.length) {
      throw new BadRequestException(
        `User #${createUserDto.username} is already exists`,
      );
    }
    const createdUser = await new this.userModel(createUserDto).save();
    return;
  }

  async login(findUserDto: FindUserDto) {
    const findUser = await this.userModel.find({
      username: findUserDto.username,
      password: findUserDto.password,
    });
    if (!findUser) {
      throw new NotFoundException(`User #${findUserDto.username} not found`);
    }
    return findUser;
  }

  async findOne(id: number): Promise<User> {
    return this.userModel.findById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );
    if (!existingUser) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return existingUser;
  }

  async remove(id: number): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return deletedUser;
  }
}
