import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      adapter: new PrismaPg(
        new Pool({ connectionString: process.env.DATABASE_URL }),
      ),
    });
    console.info('Create Prisma service');
  }
}
