import { useState, useEffect, useCallback } from 'react';

export const useGameStatus = (rowsCleared) => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);

  const calcScore = useCallback(() => {
    const linePoints = [40, 100, 300, 1200];
    // if we have score
    if (rowsCleared > 0) {
      // This is how original Tetris score is calculated
      setScore(
        (prevState) => prevState + linePoints[rowsCleared - 1] * (level + 1)
      );
      setRows((prevState) => prevState + rowsCleared);
    }
  }, [level, rowsCleared]);

  useEffect(() => {
    calcScore();
  }, [calcScore, rowsCleared, score]);

  return [score, setScore, rows, setRows, level, setLevel];
};
