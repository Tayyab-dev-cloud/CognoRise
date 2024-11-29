// script.js
document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '5677dc8dfb3ab3e2ff340794'; // Your API key from Exchangerate-API
    const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
  
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const convertBtn = document.getElementById('convertBtn');
    const resultDiv = document.getElementById('result');
  
    // Fetch exchange rates and populate dropdowns
    async function getCurrencies() {
      try {
        const response = await fetch(apiURL);
        const data = await response.json();
        const currencies = Object.keys(data.conversion_rates);
  
        currencies.forEach(currency => {
          const option1 = document.createElement('option');
          const option2 = document.createElement('option');
          option1.value = option2.value = currency;
          option1.textContent = option2.textContent = currency;
          fromCurrency.appendChild(option1);
          toCurrency.appendChild(option2);
        });
  
        fromCurrency.value = 'USD';  // Set default 'From' currency to USD
        toCurrency.value = 'PKR';    // Set default 'To' currency to PKR
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    }
  
    // Perform conversion
    async function convertCurrency() {
      const amount = amountInput.value;
      const from = fromCurrency.value;
      const to = toCurrency.value;
  
      if (!amount || isNaN(amount) || amount <= 0) {
        resultDiv.textContent = 'Please enter a valid amount.';
        return;
      }
  
      try {
        const response = await fetch(apiURL);
        const data = await response.json();
        const fromRate = data.conversion_rates[from];
        const toRate = data.conversion_rates[to];
  
        if (fromRate && toRate) {
          const rate = toRate / fromRate;
          const convertedAmount = (amount * rate).toFixed(2);
          resultDiv.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
        } else {
          resultDiv.textContent = 'Conversion rates not available.';
        }
      } catch (error) {
        console.error('Error converting currency:', error);
        resultDiv.textContent = 'Conversion failed. Try again.';
      }
    }
  
    convertBtn.addEventListener('click', convertCurrency);
  
    getCurrencies();
  });  