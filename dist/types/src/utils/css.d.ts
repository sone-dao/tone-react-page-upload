export default class ToneCSSUtils {
    static setColors(namespace: string, primary: string, secondary: string): void;
    static hexToRgb(hex: string): {
        r: number;
        g: number;
        b: number;
    } | null;
}
