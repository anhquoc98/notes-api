import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNoteDto, UpdateNoteDto } from './dto/note-response.dto';
import { Note } from './entities/note.entity';
import { INotesService } from './interfaces/notes-service.interface';
import { NotesRepository } from './repositories/notes.repository';

@Injectable()
export class NotesService implements INotesService {
  constructor(private readonly notesRepository: NotesRepository) {}

  async findAll(): Promise<Note[]> {
    const notes = await this.notesRepository.findAll();
    
    if (notes.length === 0) {
      throw new NotFoundException('Không tìm thấy ghi chú nào.');
    }
    
    return notes;
  }

  async findOne(id: string): Promise<Note> {
    const note = await this.notesRepository.findOne(id);
    if (!note) {
      throw new NotFoundException('Không tìm thấy ghi chú.');
    }
    return note;
  }

  async create(dto: CreateNoteDto): Promise<{ message: string }> {
    await this.notesRepository.create(dto);
    return { message: 'Tạo ghi chú thành công' };
  }

  async update(id: string, dto: UpdateNoteDto): Promise<{ message: string }> {
    const note = await this.notesRepository.findOne(id);
    if (!note) {
      throw new NotFoundException('Không tìm thấy ghi chú.');
    }
    await this.notesRepository.update(note, dto);
    return { message: 'Cập nhật ghi chú thành công' };
  }

  async remove(id: string): Promise<{ message: string }> {
    const note = await this.notesRepository.findOne(id);
    if (!note) {
      throw new NotFoundException('Không tìm thấy ghi chú.');
    }
    await this.notesRepository.remove(note);
    return { message: 'Xóa ghi chú thành công.' };
  }
}
