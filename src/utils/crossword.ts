import { ClueType } from '../context/ClueContext';

type GridWord = {
    row: number;
    col: number;
    direction: "Across" | "Down";
    length: number;
    word: string;
}

const searchWord = async (word: string) => {
    const regex = new RegExp(`^${word}$`, 'i');
    const response = await fetch('/words_dictionary.json');
    const dictionary = await response.json();
    const matches = Object.keys(dictionary).filter(word => regex.test(word));
    return matches.map(word => word.toUpperCase());
}

const solveCrossword = async (clues: ClueType[], grid: string[][]) => {
    // Input: grid and words
    // Output: grid with words filled in

    let words: GridWord[] = [];
    // iterate through rows
    for (let i = 0; i < grid.length; i++) {
        let currWord = "";
        let currLength = 0;
        let startColumn = -1;
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === "." && currLength > 0) {
                words = [...words, { row: i, col: startColumn, direction: "Across", length: currLength, word: currWord }];
                currWord = "";
                currLength = 0;
            } else if (grid[i][j] === " ") {
                currWord += ".";
                currLength++;
                if (currLength == 1 && startColumn == -1) {
                    startColumn = j;
                }
            } else {
                currWord += grid[i][j];
                currLength++;
                if (currLength == 1 && startColumn == -1) {
                    startColumn = j;
                }
            }
        }
        if (currLength > 0) {
            words = [...words, { row: i, col: startColumn, direction: "Across", length: currLength, word: currWord }];
        }
    }

    // iterate through the columns
    // iterate through the columns
    for (let j = 0; j < grid[0].length; j++) {
        let currWord = "";
        let currLength = 0;
        let startRow = -1;
        for (let i = 0; i < grid.length; i++) {
            if (grid[i][j] === "." && currLength > 0) {
                words = [...words, { row: startRow, col: j, direction: "Down", length: currLength, word: currWord }];
                currWord = "";
                currLength = 0;
            } else if (grid[i][j] === " ") {
                currWord += ".";
                currLength++;
                if (currLength == 1 && startRow == -1) {
                    startRow = i;
                }
            } else {
                currWord += grid[i][j];
                currLength++;
                if (currLength == 1 && startRow == -1) {
                    startRow = i;
                }
            }
        }
        if (currLength > 0) {
            words = [...words, { row: startRow, col: j, direction: "Down", length: currLength, word: currWord }];
        }
    }

    // Sort clues by number of empty letters (ascending)
    const sortedWords = words.sort((a, b) => getNumEmptyLetters(b, grid) - getNumEmptyLetters(a, grid));

    console.log(sortedWords);

    const solution = await solve(sortedWords, grid);
    if (!solution) return null;

    console.log(solution);

    const isValid = await validateGrid(solution, words);
    return isValid ? solution : null;
}

// Helper function to count empty letters for a clue
const getNumEmptyLetters = (word: GridWord, grid: string[][]) => {
    let emptyCount = 0;
    const { row, col, direction, length } = word;

    if (direction === "Across") {
        for (let i = 0; i < length; i++) {
            if (grid[row][col + i] === " ") emptyCount++;
        }
    } else {
        for (let i = 0; i < length; i++) {
            if (grid[row + i][col] === " ") emptyCount++;
        }
    }
    return emptyCount;
};

// Backtracking algorithm to fill in the grid
const solve = async (sortedWords: GridWord[], grid: string[][], index: number = 0): Promise<string[][] | null> => {
    if (index === sortedWords.length) return grid;

    const gridWord = sortedWords[index];
    const { row, col, direction, length } = gridWord;

    console.log(gridWord.word.replace(" ", "."));

    // Try all possible words for the clue
    const possibleWords = await searchWord(gridWord.word.replace(" ", "."));

    console.log("possible words", possibleWords);

    for (const word of possibleWords) {
        // Try placing the word in the grid and see if it works
        if (canPlaceWord(grid, length, word, row, col, direction)) {
            const newGrid: string[][] = placeWord(grid, length, word, row, col, direction);
            const result: string[][] | null = await solve(sortedWords, newGrid, index + 1);
            if (result) return result;
        }
    }
    return null;
};

const canPlaceWord = (grid: string[][], length: number, word: string, row: number, col: number, direction: "Across" | "Down") => {
    if (direction === "Across") {
        for (let i = 0; i < length; i++) {
            if (grid[row][col + i] !== " " && grid[row][col + i] !== word[i]) return false;
        }
    } else {
        for (let i = 0; i < length; i++) {
            if (grid[row + i][col] !== " " && grid[row + i][col] !== word[i]) return false;
        }
    }
    return true;
}

const placeWord = (grid: string[][], length: number, word: string, row: number, col: number, direction: "Across" | "Down") => {
    const newGrid = grid.map(row => row.slice());
    if (direction === "Across") {
        for (let i = 0; i < length; i++) {
            newGrid[row][col + i] = word[i];
        }
    } else {
        for (let i = 0; i < length; i++) {
            newGrid[row + i][col] = word[i];
        }
    }
    return newGrid;
}

const validateGrid = async (grid: string[][], words: GridWord[]) => {
    if (!grid) return false;

    for (const word of words) {
        let solvedAnswer = "";
        if (word.direction === "Across") {
            for (let i = 0; i < word.length; i++) {
                solvedAnswer += grid[word.row][word.col + i];
            }
        } else {
            for (let i = 0; i < word.length; i++) {
                solvedAnswer += grid[word.row + i][word.col];
            }
        }

        const possibleWords = await searchWord(word.word.replace(" ", "."));
        if (!possibleWords.includes(solvedAnswer)) return false;
    }
    return true;
}

export { searchWord, solveCrossword };