import React, {useState} from 'react';

// styled components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

//custom hooks
import {usePlayer} from '../hooks/usePlayer';
import {useStage} from '../hooks/useStage';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);//dropTime is null
    const [gameOver, setGameOver] = useState(false);//gameOver is false

    const [player] = usePlayer();//player's position with tetromino
    const [stage, setStage] = useStage(player);//stage created?

    console.log('re-render');
  return (
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
            {gameOver ? (
                <Display gameOver={gameOver} text="Game Over" />
            ) : (
          <div>
            <Display text='Score' />
            <Display text='Rows' />
            <Display text='Level' />
          </div>
            )};
          <StartButton />
        </aside>
      </StyledTetris>
  );
};

export default Tetris;
