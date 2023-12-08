import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Address } from './address.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { User } from 'src/users/user.schema';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<Address>,
    private userService: UsersService,
  ) {}

  async getAll(user_id: string): Promise<Address[]> {
    const user = await this.userService.getUserModel(user_id);
    if (!user) return null;
    const addresses = await this.addressModel.find({ owner: user_id });
    return addresses;
  }

  async create(
    createAddress: CreateAddressDto,
    user_id: string,
  ): Promise<Address> {
    const user: User = await this.userService.getUserModel(user_id);

    if (!user) return null;

    let address = await this.addressModel.create({
      ...createAddress,
    });
    address.owner = user;
    address.save();
    address = address.toObject();
    delete address.owner;
    return address;
  }

  async remove(id: string) {
    const address = this.addressModel.findByIdAndDelete(id);
    if (!address) return null;
    return address;
  }
}
