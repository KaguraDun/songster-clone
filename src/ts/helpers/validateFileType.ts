import { UPLOAD_FILE_TYPES } from '../../models/Constants';

export default function validateFileType(file: File) {
  for (let i = 0; i < UPLOAD_FILE_TYPES.length; i += 1) {
    if (file.type === UPLOAD_FILE_TYPES[i]) {
      return true;
    }
  }

  return false;
}
