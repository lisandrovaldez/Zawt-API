import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionController {
  constructor(private service: TransactionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  create(@Req() req, @Body() dto: CreateTransactionDto) {
    return this.service.create(req.user.sub, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all transactions' })
  findAll(@Req() req) {
    return this.service.findAll(req.user.sub);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a transaction' })
  remove(@Req() req, @Param('id') id: string) {
    return this.service.remove(req.user.sub, id);
  }
}
