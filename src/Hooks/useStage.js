import { useState, useEffect } from 'react';
import { createStage } from '../utils/gameHelpers';

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());

  useEffect(() => {
    const updateStage = (prevStage) => {
      // first flush the stage
      // $TODO: Refactor to a for loop for better performance.

      const newStage = prevStage.map((row) =>
        row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell))
      );

      // draw the tetromino
      // looping through the tetromino and check which cells are occupied and then
      // get the shape of the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`,
            ];
          }
        });
      });

      return newStage;
    };

    setStage((prevState) => updateStage(prevState));
  }, [player]);

  return [stage, setStage];
};
