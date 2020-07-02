import { EFileTypes } from '../enums';

export interface IFile {
    id: number;
    title: string;
    file_name: string;
    thumbnail: string;
    thumbnail_small: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    file_type_id: number;
}
