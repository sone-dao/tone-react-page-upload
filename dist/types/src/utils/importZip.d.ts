import { ReleaseArt, ReleaseSong } from '../types';
export default class ImportZip {
    debug: boolean;
    zip: Blob;
    files: {
        name: string;
        blob: Blob;
    }[];
    art: ReleaseArt[];
    songs: ReleaseSong[];
    constructor(file: File);
    getFiles(): Promise<{
        name: string;
        blob: Blob;
    }[]>;
    getArtFromFiles(): Promise<ReleaseArt[]>;
    getSongsFromFiles(): Promise<ReleaseSong[]>;
    getTypeFromExtension(filename: string): "audio/flac" | "image/jpeg" | "image/png" | undefined;
    blobToDataURL(blob: Blob): Promise<string>;
}
