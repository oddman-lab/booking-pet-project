class Calculator {
  constructor(previouseInput, currentInput) {
    this.previouseInput = previouseInput;
    this.currentInput = currentInput;
    this.clear()
  }


  appendNumbers(number) {
    if (number === '.' && this.currentInput.includes('.')) return
    this.currentInput = this.currentInput.toString() + number.toString()
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const intDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(intDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = intDigits.toLocaleString('ru', {maximumFractionDigits: 0})
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    currentInput.innerText = this.getDisplayNumber(this.currentInput);
    if (this.operation != null) {
      previouseInput.innerText = 
        `${this.getDisplayNumber(this.previouseInput)} ${this.operation}`
    } else {
      previouseInput.innerText = ''
    }
  }

  selectingOperation(operation) {
    if (currentInput === '') return
    if (previouseInput != '') {
      this.calculate()
    }
    this.operation = operation
    this.previouseInput = this.currentInput
    this.currentInput = ''
  }

  clear() {
    this.previouseInput = '';
    this.currentInput = '';
    this.operation = undefined;
  }

  delete() {
    this.currentInput = this.currentInput.toString().slice(0, -1)
  }

  calculate() {
    let computing
    const current = parseFloat(this.currentInput)
    const prev = parseFloat(this.previouseInput)
    if (isNaN(current) || isNaN(prev)) return

    switch (this.operation) {
      case '+':
        computing = prev + current
        break
      case '-':
        computing = prev - current
        break
      case '*':
        computing = prev * current
        break
      case '÷':
        computing = prev / current
        // computing = (prev / current).toFixed(3)
        break
      case '%':
        computing = prev * (current / 100)
        break
      default:
        return
    }
    this.currentInput = computing
    this.operation = undefined
    this.previouseInput = ''
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operand]');
const deleteButton = document.querySelector('[data-delete]');
const equalButton = document.querySelector('[data-equal]');
const clearButton = document.querySelector('[data-allclear]');
const previouseInput = document.querySelector('[data-previouse-input]');
const currentInput = document.querySelector('[data-current-input]');

const calculator = new Calculator(previouseInput, currentInput)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
     calculator.appendNumbers(button.innerText);
     calculator.updateDisplay();
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
     calculator.selectingOperation(button.innerText);
     calculator.updateDisplay();
  })
})

equalButton.addEventListener('click', button => {
  calculator.calculate()
  calculator.updateDisplay()
})

clearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})


const showDisplay = document.querySelector('.disp-btn');
const display = document.querySelector('.calc__display');
const showDisplayDecor = document.querySelector('.fas');
const mainCalc = document.querySelector('.body__main');
const extendedCalc = document.querySelector('.body__extended')
const calcTypeButton = document.querySelector('.extended__calc');
const extendedButton = document.querySelector('.fa-hard-hat')


showDisplay.addEventListener('click', () => {
  display.classList.toggle('show-display');
  showDisplayDecor.classList.toggle('fa-angle-up');
  showDisplayDecor.classList.toggle('fa-angle-down');
});

calcTypeButton.addEventListener('click', () => {
  extendedButton.classList.toggle('fa-hard-hat_engiOn')
  extendedCalc.classList.toggle('body__extended_show')
})
