import { EFileTypes } from '../enums';

export interface IFile {
    id: number;
    title: string;
    description?: string;
    type: EFileTypes;
    url: string;
}
