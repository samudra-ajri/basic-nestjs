import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';

@Injectable()
export class MemberService {
  constructor(private modulRef: ModuleRef) {}

  getConnectionName(): string | null {
    const connection = this.modulRef.get(Connection);
    return connection.getName();
  }

  sendMail(): void {
    const mailService = this.modulRef.get(MailService);
    mailService.send();
  }
}
