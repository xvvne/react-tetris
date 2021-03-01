import { memo } from 'react';
import { StyledCell } from '../styles/cell.styles';
import { TETROMINOS } from '../utils/tetrominos';

const Cell = (
  { type } 
) => (
  <StyledCell type={type} color={TETROMINOS[type].color}>
    {console.log('rerender')}
  </StyledCell>
);

export default memo(Cell);
