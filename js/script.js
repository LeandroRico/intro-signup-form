const form = document.querySelector('.js-form')
const firstName = document.querySelector('.js-first-name')
const lastName = document.querySelector('.js-last-name')
const email = document.querySelector('.js-email')
const password = document.querySelector('.js-password')

const inputs = [firstName, lastName, email, password]

const placeHolders = []

inputs.forEach((input) => {
  const values = input.getAttribute('placeholder')
  placeHolders.push(values)
})

let warnings = ''

function validateForm() {
  const emailVerification = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
  inputs.forEach((input) => {
    if (!input.value) {
      input.removeAttribute('placeholder')
      warnings = `${getName(input.name)}` + ` cannot be empty`
      showWarning(input, warnings)
    }

    if (email.value) {
      if (!emailVerification.test(email.value)) {
        warnings = 'Looks like this is not an email'
        showWarning(email, warnings)
      }
    }

    if (
      firstName.value &&
      lastName.value &&
      email.value &&
      password.value &&
      emailVerification.test(email.value)
    ) {
      warnings = ''
    }
  })
}

function getName(input) {
  const inputName = input.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
    return str.toUpperCase()
  })
  return inputName
}

function showWarning(formField, message) {
  const warningMessage = formField.nextElementSibling
  warningMessage.innerText = message
  warningMessage.classList.add('showWarning')
  formField.classList.add('warning')
  formField.addEventListener('click', () => {
    warningMessage.innerText = ''
    formField.classList.remove('warning')
  })
}

function sendForm() {
  const notification = document.getElementById('notification')
  notification.innerText = 'FORM SUBMITTED SUCCESSFULLY'
  notification.classList.add('show-notification')
  setTimeout(() => {
    notification.classList.remove('show-notification')
  }, 3000)
  form.reset()
  let i = 0
  while (i < placeHolders.length) {
    inputs.forEach((input) => {
      input.setAttribute('placeholder', placeHolders[i])
      i++
    })
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  validateForm()
  if (!warnings) {
    sendForm()
  }
})
