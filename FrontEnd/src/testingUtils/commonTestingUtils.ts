import { act } from '@testing-library/react';

/**
 * Converts a hex color string to an rgb string.
 * @param hex - The hex color string (e.g. "#fff" or "#ffffff")
 * @returns The rgb string (e.g. "rgb(255, 255, 255)")
 */
export const hexToRgb = (hex: string): string => {
    const cleanHex = hex.replace('#', '');
    const chunkSize = cleanHex.length / 3;
    const regex = new RegExp(`(.{${chunkSize}})`, 'g');
    const rgbArray = cleanHex.match(regex)?.map((l) => parseInt(cleanHex.length % 2 ? l + l : l, 16)) ?? [];
    return `rgb(${rgbArray.join(', ')})`;
};

/**
 * Flushes all pending promises (useful for testing async code).
 */
export const flushPromises = async (): Promise<void> => {
    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
};
