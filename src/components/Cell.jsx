import { StyledCell } from '../styles/cell.styles';
import { TETROMINOS } from '../utils/tetrominos';

const Cell = (
  { type } // if we have the type of L, it will grab the color of L.
) => (
  <StyledCell type={'L'} color={TETROMINOS['L'].color}>
    Cell
  </StyledCell>
);
export default Cell;
