document.getElementById('loan-form').addEventListener('submit', function(e) {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('results').style.display = 'none';

    setTimeout(calculateResults, 3000);

    e.preventDefault()
});

function calculateResults() {
    console.log('Calculating...');

    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');



    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    // CALCULATIONS
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value)/100 / 12;
    const calculatedPayment = parseFloat(years.value) * 12;


    // COMPUTE MONTHLY PAYMENT
    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principal * x * calculatedInterest) / (x-1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly* calculatedPayment) - principal).toFixed(2)

         document.getElementById('loading').style.display = 'none';
         document.getElementById('results').style.display = 'block';
    }else{
        messageError('Please check your numbers');

         document.getElementById('loading').style.display = 'none';
         document.getElementById('results').style.display = 'none';
    }

}

function messageError(error) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));
    console.log(errorDiv);

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    card.insertBefore(errorDiv, heading);

    setTimeout(clearError, 3000);
    
};

function clearError() {
   document.querySelector('.alert').remove();
}