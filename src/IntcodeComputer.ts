interface IParam {
  value: number;
  address: number;
}

enum Mode {
  Position,
  Immediate,
  Relative
}
const paramCounts = [0, 3, 3, 1, 1, 2, 2, 3, 3, 1];

export class IntcodeComputer {
  input: number[];
  output: number[];
  memory: number[];
  instructions: any;
  pc: number;
  relativeBase: number;
  halted: boolean;
  waiting: boolean;

  constructor(memory: number[]) {
    this.input = [];
    this.output = [];
    this.memory = memory;
    this.pc = 0;
    this.instructions = [
      () => 0,
      this.add.bind(this),
      this.multiply.bind(this),
      this.readInteger.bind(this),
      this.printInteger.bind(this),
      this.jumpIfTrue.bind(this),
      this.jumpIfFalse.bind(this),
      this.lessThan.bind(this),
      this.equals.bind(this),
      this.adjustRelativeBase.bind(this)
    ];
    this.halted = false;
    this.waiting = false;
    this.relativeBase = 0;
  }

  add(params: IParam[]) {
    this.memory[params[2].address] = params[0].value + params[1].value;
  }

  multiply(params: IParam[]) {
    this.memory[params[2].address] = params[0].value * params[1].value;
  }

  readInteger(params: IParam[]) {
    if (this.input.length === 0) {
      this.pc -= 2;
      this.waiting = true;
      return;
    }
    this.waiting = false;
    this.memory[params[0].address] = this.input.shift()!;
  }

  printInteger(params: IParam[]) {
    this.output.push(params[0].value);
  }

  jumpIfTrue(params: IParam[]) {
    return params[0].value !== 0 ? params[1].value : 0;
  }

  jumpIfFalse(params: IParam[]) {
    return params[0].value === 0 ? params[1].value : 0;
  }

  lessThan(params: IParam[]) {
    this.memory[params[2].address] = params[0].value < params[1].value ? 1 : 0;
  }

  equals(params: IParam[]) {
    this.memory[params[2].address] =
      params[0].value === params[1].value ? 1 : 0;
  }

  adjustRelativeBase(params: IParam[]) {
    this.relativeBase += params[0].value;
  }

  simulate() {
    this.pc = 0;
    this.output = [];

    while (!this.halted) {
      this.step();
    }
  }

  step() {
    if (this.halted) return;

    const instruction = this.memory[this.pc];
    const opcode = instruction % 100;

    if (opcode === 99) {
      this.halted = true;
      return;
    }

    let params = [];
    for (let i = 0; i < paramCounts[opcode]; i++) {
      const mode = Math.floor(instruction / Math.pow(10, 2 + i)) % 10;
      if (mode === Mode.Position) {
        params.push({
          value: this.memory[this.memory[this.pc + i + 1]],
          address: this.memory[this.pc + i + 1]
        });
      } else if (mode === Mode.Immediate) {
        params.push({
          value: this.memory[this.pc + i + 1],
          address: -1
        });
      } else {
        params.push({
          value: this.memory[this.relativeBase + this.memory[this.pc + i + 1]],
          address: this.relativeBase + this.memory[this.pc + i + 1]
        });
      }
    }
    const ret: number | undefined | void = this.instructions[opcode](params);
    if (typeof ret !== 'undefined' && ret !== 0) {
      this.pc = ret;
      return;
    }
    this.pc += paramCounts[opcode] + 1;
  }
}
