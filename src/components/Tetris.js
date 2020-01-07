import React, {useState} from 'react';

import { createStage } from '../gameHelpers';//why we need createStage? due to rendering?

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

    const [player, updatePlayerPos, resetPlayer] = usePlayer();//player's position with tetromino
    const [stage, setStage] = useStage(player, resetPlayer);//stage created?

    console.log('re-render');

    const movePlayer = dir => {
        updatePlayerPos({x:dir, y:0});
    }

    const startGame = () => {
        //reset everything
        setStage(createStage());
        resetPlayer();
    }

    const drop = () => {
        updatePlayerPos({x:0, y:1, collided:false})

    }

    const dropPlayer = () => {
        drop();
    }

    const move = ({keyCode}) => {
        if(!gameOver){
            if(keyCode === 37){//key code for the left arrow
                console.log('left');
                movePlayer(-1);
            }
            else if(keyCode === 39){//for the right
                console.log('right');
                movePlayer(1);
            }
            else if(keyCode === 40){// for the drop maybe for a space?
                console.log('drop');
                dropPlayer();
            }
        }
    }

  return (//styledTetrisWrapper is there to recognize the click movement from the screen
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
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
          <StartButton callback={startGame}/>
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
