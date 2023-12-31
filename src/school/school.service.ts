import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { School } from '@prisma/client';
import { CreateSchoolDto, EditSchoolDto } from './dto';

@Injectable()
export class SchoolService {
  constructor(private prisma: PrismaService) {}

  async getAllSchools(): Promise<School[]> {
    return this.prisma.school.findMany({});
  }

  async getSchoolById(schoolId: string): Promise<School> {
    return this.prisma.school.findUnique({
      where: { id: schoolId },
    });
  }

  async getSchoolByName(schoolName: string): Promise<School> {
    return this.prisma.school.findUnique({
      where: { name: schoolName },
    });
  }

  async createSchool(dto: CreateSchoolDto): Promise<School> {
    return this.prisma.school.create({
      data: {
        ...dto,
        setupAccount: { connect: { id: dto.setupAccount } },
      },
    });
  }

  async editSchool(schoolId: string, dto: EditSchoolDto): Promise<School> {
    return this.prisma.school.update({
      where: { id: schoolId },
      data: {
        ...dto,
        setupAccount: dto.setupAccount
          ? { connect: { id: dto.setupAccount } }
          : undefined,
      },
    });
  }

  async deleteSchool(schoolId: string) {
    const deletedSchool = await this.prisma.school.delete({
      where: { id: schoolId },
    });
    return Boolean(deletedSchool);
  }
}
