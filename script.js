const pageOrder = ['summary', 'personal', 'address', 'payment', 'confirmation'];

// Core Navigation Function
function showPage(pageName) {
  document.querySelectorAll('.page').forEach(page => {
    if (page.id === `page-${pageName}`) {
      page.classList.add('active');
    } else {
      page.classList.remove('active');
    }
  });

  const targetIndex = pageOrder.indexOf(pageName);

  pageOrder.forEach((name, index) => {
    const stepIndicator = document.getElementById(`step-${name}`);
    if (!stepIndicator) return;

    stepIndicator.classList.remove('active', 'done');

    if (index === targetIndex) {
      stepIndicator.classList.add('active');
    } else if (index < targetIndex) {
      stepIndicator.classList.add('done');
    }
  });
}

// ==========================================================================
// INPUT VALIDATION ENGINE
// ==========================================================================

// Page 2 Form Validation (First Name, Last Name, Email, Phone)
function validatePersonal() {
  let valid = true;
  const alphaPattern = /^[a-zA-Z]+$/; // Rejects absolutely everything except clean letters

  // 1. First Name Validation
  const firstName = document.getElementById('firstname');
  const firstNameError = document.getElementById('firstname-error');
  const firstValue = firstName.value.trim();

  if (firstValue === '') {
    firstName.classList.add('error');
    firstNameError.textContent = 'First name is required.';
    valid = false;
  } else if (!alphaPattern.test(firstValue)) {
    firstName.classList.add('error');
    firstNameError.textContent = 'Letters only allowed.';
    valid = false;
  } else {
    firstName.classList.remove('error');
    firstNameError.textContent = '';
  }

  // 2. Last Name Validation
  const lastName = document.getElementById('lastname');
  const lastNameError = document.getElementById('lastname-error');
  const lastValue = lastName.value.trim();

  if (lastValue === '') {
    lastName.classList.add('error');
    lastNameError.textContent = 'Last name is required.';
    valid = false;
  } else if (!alphaPattern.test(lastValue)) {
    lastName.classList.add('error');
    lastNameError.textContent = 'Letters only allowed.';
    valid = false;
  } else {
    lastName.classList.remove('error');
    lastNameError.textContent = '';
  }

  // 3. Email Validation
  const email = document.getElementById('email');
  const emailError = document.getElementById('email-error');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    email.classList.add('error');
    emailError.textContent = 'Please enter a valid email address.';
    valid = false;
  } else {
    email.classList.remove('error');
    emailError.textContent = '';
  }

  // 4. Phone Number Validation
  const phone = document.getElementById('phone');
  const phoneError = document.getElementById('phone-error');
  const phoneValue = phone.value.trim();
  const phonePattern = /^\+?[0-9\s\-]{7,15}$/;

  if (phoneValue === '') {
    phone.classList.add('error');
    phoneError.textContent = 'Phone number is required.';
    valid = false;
  } else if (!phonePattern.test(phoneValue)) {
    phone.classList.add('error');
    phoneError.textContent = 'Enter a valid phone number (no letters).';
    valid = false;
  } else {
    phone.classList.remove('error');
    phoneError.textContent = '';
  }

  if (valid) showPage('address');
}

// Page 3 Form Validation (Street, City, Zipcode)
function validateAddress() {
  let valid = true;

  const street = document.getElementById('street');
  const streetError = document.getElementById('street-error');
  if (street.value.trim() === '') {
    street.classList.add('error');
    streetError.textContent = 'Street address is required.';
    valid = false;
  } else {
    street.classList.remove('error');
    streetError.textContent = '';
  }

  const city = document.getElementById('city');
  const cityError = document.getElementById('city-error');
  if (city.value.trim() === '') {
    city.classList.add('error');
    cityError.textContent = 'City is required.';
    valid = false;
  } else {
    city.classList.remove('error');
    cityError.textContent = '';
  }

  const zipcode = document.getElementById('zipcode');
  const zipcodeError = document.getElementById('zipcode-error');
  const zipValue = zipcode.value.trim();
  
  if (zipValue === '') {
    zipcode.classList.add('error');
    zipcodeError.textContent = 'Zip code is required.';
    valid = false;
  } else if (!/^[0-9\-]{5,10}$/.test(zipValue)) {
    zipcode.classList.add('error');
    zipcodeError.textContent = 'Enter a valid postal zip code (numbers only).';
    valid = false;
  } else {
    zipcode.classList.remove('error');
    zipcodeError.textContent = '';
  }

  if (valid) {showPage('payment');}
}

// Page 4 Payment Form Validation (Card, Expiry, CVV)
function validatePayment() {
  let valid = true;

  const cardInput = document.getElementById('cardnumber');
  const cardError = document.getElementById('cardnumber-error');
  const cleanCard = cardInput.value.replace(/\s+/g, '');
  
  if (!/^\d{16}$/.test(cleanCard)) {
    cardInput.classList.add('error');
    cardError.textContent = 'Enter a valid 16-digit card number.';
    valid = false;
  } else {
    cardInput.classList.remove('error');
    cardError.textContent = '';
  }

  const expiryInput = document.getElementById('cardexpiry');
  const expiryError = document.getElementById('cardexpiry-error');
  const expiryValue = expiryInput.value.trim();
  let dateValid = false;

  if (/^\d{2}\/\d{2}$/.test(expiryValue)) {
    const parts = expiryValue.split('/');
    const inputMonth = parseInt(parts[0], 10);
    const inputYear = parseInt('20' + parts[1], 10);
    
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    if (inputMonth >= 1 && inputMonth <= 12) {
      if (inputYear > currentYear || (inputYear === currentYear && inputMonth >= currentMonth)) {
        dateValid = true;
      }
    }
  }

  if (!dateValid) {
    expiryInput.classList.add('error');
    expiryError.textContent = 'Use a valid MM/YY future expiration date.';
    valid = false;
  } else {
    expiryInput.classList.remove('error');
    expiryError.textContent = '';
  }

  const cvvInput = document.getElementById('cardcvv');
  const cvvError = document.getElementById('cardcvv-error');
  const cleanCvv = cvvInput.value.trim();
  
  if (!/^\d{3,4}$/.test(cleanCvv)) {
    cvvInput.classList.add('error');
    cvvError.textContent = 'Enter a valid 3 or 4 digit code.';
    valid = false;
  } else {
    cvvInput.classList.remove('error');
    cvvError.textContent = '';
  }

  if (valid) {
    populateReviewScreen();
    showPage('confirmation');
  }
}

// Injects data summaries into review text slots
function populateReviewScreen() {
  const first = document.getElementById('firstname').value.trim();
  const last = document.getElementById('lastname').value.trim();
  document.getElementById('confirm-name').textContent = `${first} ${last}`;
  
  document.getElementById('confirm-email').textContent = document.getElementById('email').value;
  document.getElementById('confirm-phone').textContent = document.getElementById('phone').value;
  document.getElementById('confirm-street').textContent = document.getElementById('street').value;
  document.getElementById('confirm-city').textContent = document.getElementById('city').value;
  document.getElementById('confirm-zip').textContent = document.getElementById('zipcode').value;

  const fullCardNum = document.getElementById('cardnumber').value.replace(/\s+/g, '');
  document.getElementById('confirm-card').textContent = `•••• •••• •••• ${fullCardNum.slice(-4)}`;
}

// Handles the 2-second mock API state transaction delay
function handleGatewayTransaction() {
  showPage('status'); 
  
  document.getElementById('status-processing').style.display = 'block';
  document.getElementById('status-success').style.display = 'none';
  document.getElementById('status-error').style.display = 'none';

  setTimeout(() => {
    document.getElementById('status-processing').style.display = 'none';
    const transactionSucceeded = Math.random() > 0.3; // 70% success chance

    if (transactionSucceeded) {
      document.getElementById('status-success').style.display = 'block';
    } else {
      document.getElementById('status-error').style.display = 'block';
    }
  }, 2000);
}


// Navigation Event Triggers
document.getElementById('to-personal-btn').addEventListener('click', () => showPage('personal'));
document.getElementById('back-to-summary-btn').addEventListener('click', () => showPage('summary'));

document.getElementById('to-address-btn').addEventListener('click', validatePersonal);
document.getElementById('back-to-personal-btn').addEventListener('click', () => showPage('personal'));

document.getElementById('to-payment-btn').addEventListener('click', validateAddress);
document.getElementById('back-to-address-btn').addEventListener('click', () => showPage('address'));

document.getElementById('to-confirmation-btn').addEventListener('click', validatePayment);
document.getElementById('back-to-payment-btn').addEventListener('click', () => showPage('payment'));

document.getElementById('submit-order-btn').addEventListener('click', handleGatewayTransaction);
document.getElementById('retry-payment-btn').addEventListener('click', () => showPage('payment'));