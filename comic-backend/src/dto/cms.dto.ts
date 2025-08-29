import { IsOptional, MaxLength } from 'class-validator';

export class SaveComicDTO {
  @MaxLength(255)
  title: string;

  @MaxLength(1000)
  description: string;

  @MaxLength(255)
  genre: string;

  @MaxLength(255)
  type: string;

  subgenres: string[];

  published_at: Date;

  @MaxLength(255)
  cover: string;

  @MaxLength(255)
  image: string;

  @MaxLength(255)
  banner: string;
}

export class SaveChapterDTO {
  @IsOptional()
  chapter_no: number | null;

  @MaxLength(255)
  title: string;

  @MaxLength(255)
  subtitle: string;

  @MaxLength(255)
  image: string;

  price: number;

  fiat_price: number;

  published_at: Date;

  comic_id: number;

  pages: string[];
}

export class EditComicDTO {
  @MaxLength(255)
  title: string;

  @MaxLength(1000)
  description: string;

  @MaxLength(255)
  genre: string;

  @MaxLength(255)
  type: string;

  subgenres: string[];

  published_at: Date;

  cover: string | null;
  image: string | null;
  banner: string | null;
}
