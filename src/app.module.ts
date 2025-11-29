import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { NotesModule } from './notes/notes.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'postgres',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'nest',
      password: process.env.DB_PASS || 'nest',
      database: process.env.DB_NAME || 'notesdb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    NotesModule
  ],

})
export class AppModule {}

