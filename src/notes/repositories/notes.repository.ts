import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../entities/note.entity';
import { CreateNoteDto, UpdateNoteDto } from '../dto/note-response.dto';
import { INotesRepository } from '../interfaces/notes-repository.interface';

@Injectable()
export class NotesRepository implements INotesRepository {
  constructor(
    @InjectRepository(Note)
    private readonly typeOrmRepository: Repository<Note>,
  ) {}

  async findAll(): Promise<Note[]> {
    return await this.typeOrmRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Note | null> {
    return await this.typeOrmRepository.findOne({ where: { id } });
  }

  async create(dto: CreateNoteDto): Promise<Note> {
    const note = this.typeOrmRepository.create(dto);
    return await this.typeOrmRepository.save(note);
  }

  async update(note: Note, dto: UpdateNoteDto): Promise<Note> {
    Object.assign(note, dto);
    return await this.typeOrmRepository.save(note);
  }

  async remove(note: Note): Promise<void> {
    await this.typeOrmRepository.remove(note);
  }
}

