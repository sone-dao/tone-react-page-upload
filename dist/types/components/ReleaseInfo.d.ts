import { UploadRelease } from '../types';
type ReleaseInfoProps = {
    user: any;
    canUploadAs: string[];
    release: UploadRelease;
    setReleaseProperty: Function;
    artColors: string[];
};
export default function ReleaseInfo({ user, canUploadAs, release, setReleaseProperty, artColors, }: ReleaseInfoProps): import("react/jsx-runtime").JSX.Element;
export {};
