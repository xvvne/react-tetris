import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino } from '../utils/tetrominos';
import { checkCollision, STAGE_WIDTH } from '../utils/gameHelpers';

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const rotate = (matrix, dir) => {
    // make the rows to become cols (transpose)

    const rotatedTetro = matrix.map((_, idx) => matrix.map((col) => col[idx]));
    // Reverse each row to get a rotated matrix.
    return dir > 0
      ? rotatedTetro.map((row) => row.reverse())
      : rotatedTetro.reverse();
  };

  const playerRotate = (stage, dir) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));

    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    const pos = clonedPlayer.pos.x;
    let offset = 1;

    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        return () => {
          rotate(clonedPlayer.tetromino, -dir);
          clonedPlayer.pos.x = pos;
        };
      }
    }
    setPlayer(clonedPlayer);
  };

  const updatePlayerPos = (event) => {
    const { x, y, collided } = event;

    setPlayer((prevState) => ({
      ...prevState,
      pos: { x: (prevState.pos.x += x), y: (prevState.pos.y += y) },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
