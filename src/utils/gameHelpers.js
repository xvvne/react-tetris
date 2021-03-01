export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

// create a multi dimensional array that represents rows and columns
export const createStage = () => {
  // create an array from another array that we're going to create from the stage height
  return Array.from(Array(STAGE_HEIGHT), () => {
    // for each row create a new array from the stage width, and fill it with another array.
    return new Array(STAGE_WIDTH).fill([0, 'clear']);
  });
};
// rename x and y
export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      // 1. check that we're on an actual tetromino cell
      if (player.tetromino[y][x] !== 0) {
        if (
          // 2. Check that our move is inside the game areas height (y)
          // We shouldn't go through the bottom of the play area.
          !stage[y + player.pos.y + moveY] ||
          // 3. Check that our move is inside the game areas width (x)
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          // 4. Check that the cell we're moving to isn't set to clear.
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            'clear'
        ) {
          return true;
        }
      }
    }
  }
};
