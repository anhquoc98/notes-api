import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsString({ message: 'Title phải là chuỗi (string).' })
  @IsNotEmpty({ message: 'Title không được để trống.' })
  title: string;

  @IsString({ message: 'Content phải là chuỗi (string).' })
  @IsOptional()
  content?: string;
}

export class UpdateNoteDto extends PartialType(CreateNoteDto) {}

