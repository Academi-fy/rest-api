import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SetupAccount } from '@prisma/client';
import { CreateSetupAccountDto, EditSetupAccountDto } from './dto';

@Injectable()
export class SetupAccountService {
  constructor(private prisma: PrismaService) {}

  async getAllSetupAccounts(): Promise<SetupAccount[]> {
    return this.prisma.setupAccount.findMany({});
  }

  async getSetupAccountById(setupAccountId: string): Promise<SetupAccount> {
    return this.prisma.setupAccount.findUnique({
      where: { id: setupAccountId },
    });
  }

  async getSetupAccountBySchoolName(schoolName: string): Promise<SetupAccount> {
    return this.prisma.setupAccount.findUnique({
      where: { schoolName: schoolName },
    });
  }

  async createSetupAccount(dto: CreateSetupAccountDto): Promise<SetupAccount> {
    return this.prisma.setupAccount.create({
      data: {
        ...dto,
      },
    });
  }

  async editSetupAccount(
    setupAccountId: string,
    dto: EditSetupAccountDto,
  ): Promise<SetupAccount> {
    return this.prisma.setupAccount.update({
      where: { id: setupAccountId },
      data: {
        ...dto,
      },
    });
  }

  async deleteSetupAccount(setupAccountId: string): Promise<boolean> {
    const deletedSetupAccount = await this.prisma.setupAccount.delete({
      where: { id: setupAccountId },
    });
    return Boolean(deletedSetupAccount);
  }
}
