import React, { useState } from 'react';

import { createStage, checkCollision } from '../gameHelpers'; //why we need createStage? due to rendering?

// styled components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

//custom hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus} from '../hooks/useGameStatus';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null); //dropTime is null
  const [gameOver, setGameOver] = useState(false); //gameOver is false

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer(); //player's position with tetromino
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer); //stage created?
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

  console.log('re-render');
  //used hooks with bunch of move functions. Need to elaborate on these
  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    //reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if(rows > (level + 1) * 10){
      setLevel(prev => prev + 1);
      //Also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      //create something when game is over
      if (player.pos.y < 1) {
        console.log('Game over!!');
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  //callback function for keyup event
  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        //key code for the left arrow
        console.log('left');
        movePlayer(-1);
      } else if (keyCode === 39) {
        //for the right
        console.log('right');
        movePlayer(1);
      } else if (keyCode === 40) {
        // for the drop maybe for a space?
        console.log('drop');
        dropPlayer();
      } else if (keyCode === 38) {
        //this is changing the tetromino
        playerRotate(stage, 1);
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    //styledTetrisWrapper is there to recognize the click movement from the screen
    <StyledTetrisWrapper
      role='button'
      tabIndex='0'
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text='Game Over' />
          ) : (
            <div>
              <Display text={'Score : ${score}'} />
              <Display text={'Rows : ${rows}'} />
              <Display text={'Level : ${level}'} />
            </div>
          )}
          ;
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
