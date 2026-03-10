import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateTransactionDto) {
    const { date, ...rest } = dto;

    return this.prisma.transaction.create({
      data: {
        ...rest,
        amount: dto.amount,
        date: new Date(date),
        userId,
      },
    });
  }

  async findAll(userId: string) {
    const transactions = await this.prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });

    return transactions.map((transaction) => ({
      ...transaction,
      amount: Number(transaction.amount),
    }));
  }

  async remove(userId: string, id: string) {
    return this.prisma.transaction.delete({
      where: {
        id,
        userId,
      },
    });
  }
}
