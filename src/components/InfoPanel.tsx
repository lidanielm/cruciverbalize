import { useState } from 'react';
import ClueTable from './ClueTable';
import WordSearch from './WordSearchMode';
import { searchWord } from '../utils/crossword';
import FillMode from './FillMode';

type InfoPanelMode =
    | "default"
    | "fill"
    | "clues"
    | "wordsearch";

// css for button type
const buttonStyle = "bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow";
const buttonStyleActive = "bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow";

const InfoPanel = () => {
    const [mode, setMode] = useState<InfoPanelMode>("default");

    const handleWordSearch = async (word: string) => {
        try {
            const matches = await searchWord(word);
            return matches;
        } catch (error) {
            console.error('Error searching dictionary:', error);
            return [];
        }
    }

    return (
        <div className="info-panel">
            <div className="flex justify-center space-x-4 mb-4">
                <button
                    className={mode === "default" ? buttonStyleActive : buttonStyle}
                    onClick={() => setMode("default")}
                >
                    Default
                </button>
                <button className={buttonStyle} onClick={() => setMode("fill")}>
                    Fill
                </button>
                <button
                    className={mode === "clues" ? buttonStyleActive : buttonStyle}
                    onClick={() => setMode("clues")}
                >
                    Clues
                </button>
                <button
                    className={mode === "wordsearch" ? buttonStyleActive : buttonStyle}
                    onClick={() => setMode("wordsearch")}
                >
                    Word Search
                </button>
            </div>
            {mode === "default" && (
                <div>
                    <h3>Default Mode</h3>
                    <p>This is the default mode where you can provide general information.</p>
                </div>
            )}
            {mode === "fill" && (
                <FillMode />
            )}
            {mode === "clues" && (
                <ClueTable isCreating={true} />
            )}
            {mode === "wordsearch" && (
                <div>
                    <WordSearch
                        onSearch={handleWordSearch}
                    />
                </div>
            )}
        </div>
    );
}

export default InfoPanel;