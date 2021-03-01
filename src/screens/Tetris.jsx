import React, { useState } from 'react';

import { checkCollision, createStage } from '../utils/gameHelpers';

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from '../styles/tetris.styles.js';

// Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

// Components
import Stage from '../components/Stage';
import Display from '../components/Display';
import StartButton from '../components/StartButton';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  console.log('re-render');

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    console.log('test');
    // Reset everything
    setDropTime(1000);
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
  };

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game Over
      if (player.pos.y < 1) {
        console.log('GAME OVER!!!');
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        console.log('interval on');
        setDropTime(1000);
      }
    }
  };

  const dropPlayer = () => {
    console.log('interval off');
    setDropTime(null);
    drop();
  };

  const move = (event) => {
    const { keyCode } = event;

    if (!gameOver) {
      // if (keyCode === 37) {
      //   movePlayer(-1);
      // } else if (keyCode === 39) {
      //   movePlayer(1);
      // } else if (keyCode === 40) {
      //   dropPlayer();
      // } else if (keyCode === 38) {
      //   playerRotate(stage, 1);
      // }

      // you'll see this more in game dev...
      switch (keyCode) {
        case 37:
          movePlayer(-1);
          break;
        case 39:
          movePlayer(1);
          break;
        case 40:
          dropPlayer();
          break;
        case 38:
          playerRotate(stage, 1);
          break;
        default:
          break;
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={(e) => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Level" />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
