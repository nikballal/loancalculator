//listen for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
  //loader
  document.getElementById('loading').style.display = 'block'

  setTimeout(calculateResults, 2000)

  e.preventDefault()
})

//calculate results
function calculateResults() {
  console.log('Calculating....')
  //UI variables for all the form fields
  const amount = document.getElementById('amount')
  const interest = document.getElementById('interest')
  const years = document.getElementById('years')
  const monthlyPayment = document.getElementById('monthly-payment')
  const totalPayment = document.getElementById('total-payment')
  const totalInterest = document.getElementById('total-interest')
  //calculations
  const principal = parseFloat(amount.value)
  const calculatedInterest = parseFloat(interest.value) / 100 / 12
  const calculatedPayments = parseFloat(years.value) * 12 //calculated payments (no of installments)
  //compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments)
  const monthly = (principal * x * calculatedInterest) / (x - 1)
  //check if values are finite
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2)
    totalPayment.value = (monthly * calculatedPayments).toFixed(2)
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2)

    //show results
    document.getElementById('results').style.display = 'block'

    //hide loader
    document.getElementById('loading').style.display = 'none'
  } else {
    showError('Please check your numbers')
    //hide loader
    document.getElementById('loading').style.display = 'none'
  }
}

//Show Error
function showError(error) {
  //hide results
  document.getElementById('results').style.display = 'none'
  //hide loader
  document.getElementById('loading').style.display = 'none'
  //create a div
  const errorDiv = document.createElement('div')
  //get elements
  const card = document.querySelector('.card')
  const heading = document.querySelector('.heading')

  //add class
  errorDiv.className = 'alert alert-danger'

  //create text node and append
  errorDiv.appendChild(document.createTextNode(error))

  //insert error above heading
  card.insertBefore(errorDiv, heading)

  //clear error after 3 seconds
  setTimeout(clearError, 3000)
}

//clear and remove the error
function clearError() {
  document.querySelector('.alert').remove()
}
