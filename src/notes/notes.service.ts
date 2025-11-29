import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNoteDto, UpdateNoteDto } from 'src/dto/note-response.dto';
import { Note } from 'src/entity/note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
  ) {}

  async findAll(): Promise<Note[]> {
    try {
      return await this.notesRepository.find({
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      throw new InternalServerErrorException('Lỗi khi lấy danh sách ghi chú.');
    }
  }

  async findOne(id: string): Promise<Note> {
    try {
      const note = await this.notesRepository.findOne({ where: { id } });
      if (!note) throw new NotFoundException('Không tìm thấy ghi chú.');
      return note;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Lỗi khi tìm ghi chú.');
    }
  }

  async create(dto: CreateNoteDto) {
    try {
      const note = this.notesRepository.create(dto);
       await this.notesRepository.save(note);
       return { message: 'Tạo ghi chú thành công' };
    } catch (error) {
      throw new BadRequestException('Lỗi khi tạo ghi chú.');
    }
  }

  async update(id: string, dto: UpdateNoteDto) {
    try {
      const note = await this.findOne(id);
      Object.assign(note, dto);
      await this.notesRepository.save(note);
      return { message: 'Cập nhật ghi chú thành công' };

    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('Lỗi khi cập nhật ghi chú.');
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const note = await this.findOne(id);
      await this.notesRepository.remove(note);
      return { message: 'Xóa ghi chú thành công.' };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('Lỗi khi xóa ghi chú.');
    }
  }
}
