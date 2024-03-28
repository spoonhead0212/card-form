let nameValid;
let numberValid
let validMonth
let validYr
let validateCvv

// Name
document.getElementById('holder-name').addEventListener('input', function () {
    const nameError = document.querySelector('.name-error')
    const cardName = document.querySelector('.card-name-ui')
    const nameValue = this.value.trim().toUpperCase();

    if (nameValue === '') {
        errorAlert(nameError, this)
        cardName.style.opacity = 0
        nameError.innerHTML = 'Can\'t be blank'
        nameValid = false
    } else {
        cardName.textContent = nameValue
        cardName.style.opacity = 1 
        DeactiveErrorAlert(nameError, this)
        nameValid = true
    }
})

// Number
document.getElementById('holder-number').addEventListener('input', function () {
    const numberValue = this.value.toString().trim();
    editNumber(numberValue)
})

const editNumber = (num) => {
    // error
    const NumError = document.querySelector('.number-error');
    const NumInputError = document.querySelector('.number-input');

    const cardNumber = document.querySelector('.card-number-ui')

    let cleanNumber = num.replace(/\s/g, '');
    let cleanedNumber = ''

    for (i = 0; i < cleanNumber.length; i += 4) {
        cleanedNumber += cleanNumber.slice(i, i + 4) + ' '
    }

    if (cleanedNumber === ''){
       NumError.style.display = 'block'
       NumError.style.color = 'hsl(0, 100%, 66%)'
       NumError.innerHTML = 'Can\'t be blank'
       cardNumber.style.opacity = 0
       NumInputError.style.border = '1px solid hsl(0, 100%, 66%)'
       numberValid = false
    } else if (/[a-zA-Z]/.test(num.toString())) {
        // cardNumber.textContent = ''
        cardNumber.style.opacity = 0
        errorAlert(NumError, NumInputError)
        numberValid = false
    } else if (cleanedNumber.length !== 20) {
        NumError.style.display = 'block'
        NumError.style.color = 'hsl(0, 100%, 66%)'
        NumError.textContent = '16 digits'
        cardNumber.textContent = cleanedNumber;
        // alert('too much digit')
        NumInputError.style.border = '1px solid hsl(0, 100%, 66%)';numberValid = false
        if (cleanedNumber.length > 20) {
            cardNumber.style.display = 'none'
        } else {
            cardNumber.style.display = 'block'
        }
    } else {
        cardNumber.style.opacity = 1
        cardNumber.textContent = cleanedNumber
        DeactiveErrorAlert(NumError, NumInputError)
        numberValid = true
    }
}

// Month
document.querySelector('.month').addEventListener('input', function() {
    const monthUi = document.querySelector('.month-ui')
    const dateError = document.querySelector('.mon-yr-error')
    const monthValue = Number(this.value)
    if (monthValue === '') {
        monthUi.style.opacity = 0
        errorAlert(dateError, this)
        monthUi.innerHTML = 'Can\'t be blank'
        validMonth = false
    } else if (monthValue > 12) {
        monthUi.style.opacity = 0
        errorAlert(dateError, this)
        dateError.innerHTML = 'Invalid Month'
        validMonth = false
    } else if (monthValue < 1) {
        monthUi.style.opacity = 0
        errorAlert(dateError, this)
        dateError.innerHTML = 'Can\'t be blank'
        validMonth = false
    } else {
        monthUi.innerHTML = monthValue
        monthUi.style.opacity = 1
        DeactiveErrorAlert(dateError, this)
        validMonth = true
    }
})

document.querySelector('.year').addEventListener('input', function() {
    const dateError = document.querySelector('.mon-yr-error')
    const yearUi = document.querySelector('.year-ui')
    const yearValue = Number(this.value).toString().trim().slice(-2)
    const currentDate = new Date()
    const currentYr = currentDate.getFullYear().toString().slice(-2)
    const maxYear = Number(currentYr.slice(-2)) + 4;

    if (yearValue === '' ) {
        yearUi.style.opacity = 0                             
        errorAlert(dateError, this)
        dateError.innerHTML = 'Can\'t be blank'
        validYr = false
    } else if (yearValue >= currentYr && yearValue <= maxYear) {
        yearUi.innerHTML = yearValue
        yearUi.style.opacity = 1
        DeactiveErrorAlert(dateError, this)
        validYr = true
    } else {
        yearUi.style.opacity = 0
        errorAlert(dateError, this)
        dateError.innerHTML = 'Invalid year'
        validYr = false
    }
})

document.querySelector('.cvv-number').addEventListener('input', function() {
    const cvvInput = this.value.trim()
    const cvvError = document.querySelector('.cvv-error')
    const cardCvvUi = document.querySelector('.card-cvv-ui')
    if (cvvInput === '') {
        errorAlert(cvvError, this)
        cvvError.innerHTML = 'Can\'t be blank'
        validateCvv = false
    } else if (cvvInput.length !== 3) {
        errorAlert(cvvError, this)
        cardCvvUi.innerHTML = cvvInput
        cvvError.innerHTML = '3 digits'
        validateCvv = false
        if (cvvInput.length > 3) {
            cardCvvUi.style.display = 'none'
        } else if (cvvInput.length <= 3){
            cardCvvUi.style.display = 'block'
        }
    } else {
        DeactiveErrorAlert(cvvError, this)
        cardCvvUi.innerHTML = cvvInput
        validateCvv = true
    }
})

const errorAlert = (showMe, borderMe) => {
    showMe.style.display = 'block'
    showMe.style.color = 'hsl(0, 100%, 66%)'
    borderMe.style.border = '1px solid hsl(0, 100%, 66%)'
}

const DeactiveErrorAlert = (hideMe, borderMe) => {
    hideMe.style.display = 'none'
    borderMe.style.border = '1px solid hsl(279, 6%, 55%)'
}

const form = document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault()
    const completePage = document.querySelector('.completed')
    const formPage = document.querySelector('.form-parent')
    if (nameValid && numberValid && validMonth && validYr && validateCvv) {
        completePage.style.right = 0
        completePage.style.transition = '400ms ease'
        formPage.style.display = 'none'
    }
})

const screenWidth = window.screen.width
const screenHeight = window.screen.height
const topContainer = document.querySelector('.left')
const bottomContainer = document.querySelector('.right')
const topHeight = topContainer.clientHeight
const bottomHeight = bottomContainer.clientHeight
const body = document.body
console.log(body);

console.log(screenWidth, screenHeight);
console.log(topHeight, bottomHeight);

if (screenWidth < 850) {
    console.log('break');
    body.style.minHeight = `${topHeight + bottomHeight}px`
    console.log(`${topHeight + bottomHeight}`);
}