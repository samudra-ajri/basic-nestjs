import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

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

export function createConnection(configService: ConfigService): Connection {
  const connectionType = configService.get<string>('DATABASE');
  if (connectionType === 'mysql') {
    return new MySQLConnection();
  } else if (connectionType === 'mongodb') {
    return new MongoDBConnection();
  }
  return new Connection();
}
