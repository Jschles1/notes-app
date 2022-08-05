import { render, screen, waitFor, act } from '@/jest.setup';
import { formatDate, renderDescriptionFirstLine, findNote, decodeHtml, debounce } from '@lib/helpers';

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

const timestamp = '1649370960451';
const description = 'Hello\nWorld';
const notes = [
    {
        _id: '234',
        name: 'Note Name',
        description: 'Note Description',
        folder: '123',
        createdAt: '1649370960451',
        updatedAt: '1649370960451',
    },
];
const html = '<p>Hello World</p>';
const text = 'Hello World 2';

describe('Helper Methods', () => {
    it('formatDate correctly formats timestamp string into readable date', () => {
        expect(formatDate(timestamp)).toEqual('04/07/2022');
        expect(formatDate(Number(timestamp))).toEqual('04/07/2022');
        expect(formatDate(timestamp, true)).toEqual('April 7th 2022 at 6:36 PM');
        expect(formatDate('')).toEqual(formatDate(today));
        expect(formatDate(undefined)).toEqual(formatDate(today));
        expect(formatDate(yesterday)).toEqual('Yesterday');
    });

    it('renderDescriptionFirstLine renders description string before first line break', () => {
        expect(renderDescriptionFirstLine(description)).toEqual('Hello');
    });

    it('findNote finds note with requested note ID', () => {
        expect(findNote(notes, '234')).toBe(notes[0]);
        expect(findNote(notes, '123')).toBe(undefined);
    });

    it('decodeHtml extracts text content from HTML string', () => {
        expect(decodeHtml(html)).toEqual('Hello World');
        expect(decodeHtml(text)).toEqual('Hello World 2');
    });

    it('debounce delays execution of a function based on timeout argument passed', async () => {
        jest.useFakeTimers();
        const fn = jest.fn();
        debounce(fn)();
        // act(() => {
        jest.runAllTimers();
        // });
        await waitFor(() => {
            expect(fn).toHaveBeenCalled();
        });
    });
});
