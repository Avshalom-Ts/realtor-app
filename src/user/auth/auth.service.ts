import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { UserType } from '@prisma/client';

interface SignupParams {
  email: string;
  password: string;
  name: string;
  phone: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async signup({ email, password, name, phone }: SignupParams) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    // console.log({ userExists });
    if (userExists) {
      throw new ConflictException({ message: 'User alredy exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // console.log({ hashedPassword });

    const user = await this.prismaService.user.create({
      data: {
        email,
        name,
        phone,
        password: hashedPassword,
        user_type: UserType.BUYER,
      },
    });
    return user;
  }
}
