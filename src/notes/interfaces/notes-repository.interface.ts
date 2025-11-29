import { CreateNoteDto, UpdateNoteDto } from '../dto/note-response.dto';
import { Note } from '../entities/note.entity';

export interface INotesRepository {
  findAll(): Promise<Note[]>;
  findOne(id: string): Promise<Note | null>;
  create(dto: CreateNoteDto): Promise<Note>;
  update(note: Note, dto: UpdateNoteDto): Promise<Note>;
  remove(note: Note): Promise<void>;
}

