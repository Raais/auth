import { chat, user } from '@prisma/client';

import { DatabaseService } from 'src/database/database.service';
import { Injectable } from '@nestjs/common';
import { chatDTO } from 'src/data/chat.type';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async findOne(username: string): Promise<user | undefined> {
    return this.databaseService.user.findUnique({
      where: { username: username },
    });
  }

  async addChat(userId: number, message: string): Promise<chat | undefined> {
    return this.databaseService.chat.create({
      data: {
        user_id: userId,
        message: message,
      },
    });
  }

  async getChats(): Promise<chatDTO[] | undefined> {
    const chats = await this.databaseService.chat.findMany({
      include: { user: true },
    });
    const allChats: chatDTO[] = [];
    chats.map((chat) => {
      allChats.push({
        id: chat.id,
        author_id: chat.user_id,
        author_name: chat.user.username,
        message: chat.message,
      });
    });
    return allChats;
  }

  async userInfo(username: string): Promise<any> {
    const user = await this.databaseService.user.findUnique({
      where: { username: username },
    });

    const ret = {
      id: user.id,
      user: user.username,
      message: user.message,
    };

    return user.message ? ret : { ...ret, message: 'NULL' };
  }
}
