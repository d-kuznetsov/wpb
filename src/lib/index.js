export class ExserciseIterator {
  constructor(sets) {
    this.sets = sets;
    this.curSet = 0;
    this.curRep = 0;
    this.rest = false;
  }
  next() {
    if (this.curSet < this.sets.length) {
      let value;
      if (this.rest) {
        value = this.sets[this.curSet].rest;
        this.rest = false;
        this.curRep++;
      } else {
        value = this.sets[this.curSet].work;
        this.rest = true;
      }
      if (this.curRep === this.sets[this.curSet].reps) {
        this.curRep = 0;
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
}
