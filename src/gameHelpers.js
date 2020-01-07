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

  