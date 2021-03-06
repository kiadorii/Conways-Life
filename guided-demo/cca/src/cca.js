/**
 * Implemention of a CCA
 */

const MODULO = 8;

/**
 * Make a 2D array helper function
 */
function Array2D(width, height) {
	let a = new Array(height);
  
	for (let i = 0; i < height; i++) {
	  a[i] = new Array(width);
	}
  
	return a;
}
  
/**
 * CCA class
 */
class CCA {

  /**
   * Constructor
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;


    // This is where we have our Double Buffer
    this.cells = [
      Array2D(width, height), // active buffer
      Array2D(width, height)  // back buffer
    ];

    this.currentBufferIndex = 0;

    this.randomize();

    this.clear();
  }

  /**
   * Return the current active buffer
   * 
   * This should NOT be modified by the caller
   */
  getCells() {
    return this.cells[this.currentBufferIndex];
  }

  /**
   * Clear the cca grid
   */
  clear() {
  }

  /**
   * Randomize the cca grid
   */
  randomize() {
    for(let height = 0; height < this.height; height++) {
      for (let width = 0; width < this.width; width++) {
        this.cells[this.currentBufferIndex][height][width] = (Math.random() * MODULO) | 0;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    let currentBuffer = this.cells[this.currentBufferIndex];
    let backBuffer = this.cells[this.currentBufferIndex === 0 ? 1: 0];
    
    // See if we have a neighbor that can infect this cell and change it's color
    function hasInfectiousNeighbor(height, width) {
      const nextValue = (currentBuffer[height][width] + 1) % MODULO;

      // West
      if (width > 0) {
        if (currentBuffer[height][width - 1] === nextValue) {
          return true;
        }
      }

      // North
      if (height > 0) {
        if (currentBuffer[height - 1][width] === nextValue) {
          return true;
        }
      }

      // East
      if (width < this.width - 1) {
        if (currentBuffer[height][width + 1] === nextValue) {
          return true;
        }
      }

      // South
      if (height < this.height - 1) {
        if (currentBuffer[height + 1][width] === nextValue) {
          return true;
        }
      }
    }

    for(let h = 0; h < this.height; h++) {
      for(let w = 0; w < this.width; w++) {
        if (hasInfectiousNeighbor.call(this, h, w)) {
          backBuffer[h][w] = (currentBuffer[h][w] + 1) % MODULO;
        } else {
          backBuffer[h][w] = currentBuffer[h][w];
        }
      }
    }

    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1: 0;
  }
}

export default CCA;