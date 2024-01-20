import { UploadRelease } from '../types';
type ReleaseArtProps = {
    release: UploadRelease;
    setReleaseProperty: Function;
    artColors: string[];
    setArtColors: Function;
};
export default function ReleaseArt({ release, setReleaseProperty, artColors, setArtColors, }: ReleaseArtProps): import("react/jsx-runtime").JSX.Element;
export {};
