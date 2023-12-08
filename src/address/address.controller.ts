import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from './address.schema';
import { CreateAddressDto } from './dto/create-address.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import mongoose from 'mongoose';

@ApiTags("Address Management API's")
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiOperation({
    description: 'Retrive all the addresses associated with a user',
  })
  @Get('user/:id')
  async getAllUserAddresses(@Param() { id }): Address[] {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('The id is not a valid ObjectID');
    }

    const addresses = await this.addressService.getAll(id);

    if (!addresses) throw new NotFoundException(['User not found']);

    return addresses;
  }

  @ApiOperation({ description: 'Add new address to the user profile.' })
  @ApiBody({ type: CreateAddressDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createAddress(
    @Request() req,
    @Body() createAddress: CreateAddressDto,
  ): Promise<Address> {
    if (!mongoose.isValidObjectId(req.user.id)) {
      throw new BadRequestException(['The id is not a valid ObjectID']);
    }
    const address = await this.addressService.create(
      createAddress,
      req.user.id,
    );
    if (!address) {
      throw new BadRequestException([
        "Address couldn't be saved due to an invalid fields",
      ]);
    }
    return address;
  }

  @ApiOperation({ description: 'Delete an address by id' })
  @ApiParam({ type: String })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteAddress(@Param() { id }): Address {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException(['The id is not a valid ObjectID']);
    }

    const address = await this.addressService.remove(id);

    if (!address) {
      throw new NotFoundException(['Address is not found']);
    }

    return address;
  }
}
