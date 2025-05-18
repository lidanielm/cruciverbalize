import { useContext, useState } from 'react';
import { GridContextType, GridContext } from '../context/GridContext';
import { ClueContextType, ClueContext } from '../context/ClueContext';
import { solveCrossword } from '../utils/crossword';

const FillMode = () => {
    const { grid, setGrid } = useContext<GridContextType>(GridContext);
    const { clues } = useContext<ClueContextType>(ClueContext);
    const [solvedMessage, setSolvedMessage] = useState<string>("");

    const autoFill = async () => {
        const solution = await solveCrossword(clues, grid);
        if (solution == grid) {
            setSolvedMessage("No solution found");
        } else {
            setSolvedMessage("Solution found!");

            // Update the grid with the solution
            if (solution) {
                setGrid(solution);
                for (const clue of clues) {
                    let newAnswer = "";
                    if (clue.direction === "Across") {
                        for (let i = 0; i < clue.length; i++) {
                            newAnswer += solution[clue.row][clue.col + i];
                        }
                    } else {
                        for (let i = 0; i < clue.length; i++) {
                            newAnswer += solution[clue.row + i][clue.col];
                        }
                    }
                    clue.answer = newAnswer;
                }
            }
        }
    }

    return (
        <div>
            <h3>Fill Mode</h3>
            <button className="bg-blue-500 text-white p-2 rounded-md" onClick={autoFill}>Auto Fill</button>
            <p className="text-red-500">{solvedMessage}</p>
        </div>
    )
}

export default FillMode;