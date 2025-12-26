import { Injectable } from '@nestjs/common';

export class Connection {
  getName(): string | null {
    return null;
  }
}

@Injectable()
export class MySQLConnection extends Connection {
  getName(): string {
    return 'MySQL Connection';
  }
}

@Injectable()
export class MongoDBConnection extends Connection {
  getName(): string {
    return 'MongoDB Connection';
  }
}
