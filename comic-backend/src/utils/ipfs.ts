import { v4 as uuidv4 } from 'uuid';

export function generateUUIDFileName(file: Express.Multer.File): string {
  const fileExtension = file.fieldname.split('.').pop();
  const uuid = uuidv4();
  return `${uuid}.${fileExtension}`;
}
