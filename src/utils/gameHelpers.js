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
