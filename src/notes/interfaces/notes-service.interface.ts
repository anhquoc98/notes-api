import { CreateNoteDto, UpdateNoteDto } from '../dto/note-response.dto';
import { Note } from '../entities/note.entity';

export interface INotesService {
  findAll(): Promise<Note[]>;
  findOne(id: string): Promise<Note>;
  create(dto: CreateNoteDto): Promise<{ message: string }>;
  update(id: string, dto: UpdateNoteDto): Promise<{ message: string }>;
  remove(id: string): Promise<{ message: string }>;
}

