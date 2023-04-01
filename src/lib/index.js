export class ExserciseIterator {
  constructor(exercises) {
    this.exercises = exercises;
    this.curSet = 0;
    this.curSet = 0;
    this.off = false;
  }
  next() {
    if (this.curSet < this.exercises.length) {
      let value;
      if (this.off) {
        value = this.exercises[this.curSet].off;
        this.off = false;
        this.curSet++;
      } else {
        value = this.exercises[this.curSet].on;
        this.off = true;
      }
      if (this.curSet === this.exercises[this.curSet].sets) {
        this.curSet = 0;
        this.curSet++;
      }
      return {
        done: false,
        value: value * 1000,
      };
    }
    return {
      done: true,
    };
  }
  reset() {
    this.curSet = 0;
    this.curSet = 0;
    this.off = false;
  }
}
