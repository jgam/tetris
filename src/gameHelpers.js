//width and height
export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
  Array.from(
    Array(STAGE_HEIGHT),
    () => new Array(STAGE_WIDTH).fill([0, 'clear']) //0 is nothing and clear means nothing had been collided
  );

  //better to use for loop, bc it is faster than map. We will loop through tetrominos and the map
  //forEach will not break out of the loop once collision occurs

  export const checkCollision = (player, stage, {x: moveX, y: moveY}) => {
    for (let y = 0; y < player.tetromino.length; y += 1){
      for (let x = 0; x < player.tetromino[0].length; x+=1){
        //1. check that we are on the actual tetromino cell
        if(player.tetromino[y][x] !== 0){
          //2. check that our move is inside the game areas height (y)
          //we shouldn't go through the bottom of the play area
          if(!stage[y+player.pos.y+moveY] || 
          //3. check that our move is inside the game areas width (x)
          !stage[y+ player.pos.y + moveY][x + player.pos.x+ moveX] ||
          //4. Check that the cell we'are moving to isn't set to clear
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear')
          {
            return true;
          }
        }
      }
    }
  }