 document.addEventListener('DOMContentLoaded', function() {
            const cardSelection = document.getElementById('cardSelection');
            const cardOptionsList = document.getElementById('cardOptionsList');
            const cardOptions = document.querySelectorAll('.card-option');
            const paymentDetails = document.getElementById('paymentDetails');
            const donationForm = document.getElementById('donationForm');
            const donateBtn = document.getElementById('donateBtn');
            const successMessage = document.getElementById('successMessage');
            const errorMessage = document.getElementById('errorMessage');
            const redirectDialog = document.getElementById('redirectDialog');
            const goHomeBtn = document.getElementById('goHomeBtn');
            const stayBtn = document.getElementById('stayBtn');
            
            let selectedCard = null;

            // Show card options when card selection is made
            cardSelection.addEventListener('change', function() {
                if (this.value === 'cards') {
                    cardOptionsList.classList.add('active');
                } else {
                    cardOptionsList.classList.remove('active');
                    paymentDetails.classList.remove('active');
                }
            });

            // Handle card option selection
            cardOptions.forEach(option => {
                option.addEventListener('click', function() {
                    // Remove previous selection
                    cardOptions.forEach(opt => opt.classList.remove('selected'));
                    
                    // Add selection to clicked option
                    this.classList.add('selected');
                    selectedCard = this.dataset.card;
                    
                    // Show payment details
                    showPaymentDetails(selectedCard);
                });
            });

            function showPaymentDetails(cardType) {
                let detailsHTML = '';
                
                switch(cardType) {
                    case 'paypal':
                        detailsHTML = `
                            <h4>PayPal Details</h4>
                            <input type="email" placeholder="PayPal Email" required>
                            <input type="number" placeholder="Donation Amount ($)" min="1" required>
                        `;
                        break;
                    
                    case 'ccp':
                        detailsHTML = `
                            <h4>CCP Details</h4>
                            <input type="text" placeholder="CCP Account Number" required>
                            <input type="text" placeholder="Account Holder Name" required>
                            <input type="number" placeholder="Donation Amount" min="1" required>
                        `;
                        break;
                    
                    case 'baridimob':
                        detailsHTML = `
                            <h4>Baridimob Details</h4>
                            <input type="tel" placeholder="Mobile Number" required>
                            <input type="text" placeholder="PIN Code" required>
                            <input type="number" placeholder="Donation Amount" min="1" required>
                        `;
                        break;
                    
                    case 'googlepay':
                        detailsHTML = `
                            <h4>Google Pay Details</h4>
                            <input type="email" placeholder="Google Account Email" required>
                            <input type="tel" placeholder="Phone Number" required>
                            <input type="number" placeholder="Donation Amount ($)" min="1" required>
                        `;
                        break;
                    
                    case 'applepay':
                        detailsHTML = `
                            <h4>Apple Pay Details</h4>
                            <input type="email" placeholder="Apple ID Email" required>
                            <input type="text" placeholder="Touch ID / Face ID Confirmation" required>
                            <input type="number" placeholder="Donation Amount ($)" min="1" required>
                        `;
                        break;
                    
                    case 'wise':
                        detailsHTML = `
                            <h4>Wise Details</h4>
                            <input type="email" placeholder="Wise Account Email" required>
                            <input type="text" placeholder="Transfer Reference" required>
                            <input type="number" placeholder="Donation Amount" min="1" required>
                        `;
                        break;
                    
                    case 'mastercard':
                        detailsHTML = `
                            <h4>MasterCard Details</h4>
                            <input type="text" placeholder="Card Number" maxlength="19" required>
                            <input type="text" placeholder="Cardholder Name" required>
                            <div style="display: flex; gap: 10px;">
                                <input type="text" placeholder="MM/YY" maxlength="5" required>
                                <input type="text" placeholder="CVV" maxlength="3" required>
                            </div>
                            <input type="number" placeholder="Donation Amount ($)" min="1" required>
                        `;
                        break;
                }
                
                paymentDetails.innerHTML = detailsHTML;
                paymentDetails.classList.add('active');
                
                // Add input formatting for card number
                if (cardType === 'mastercard') {
                    const cardNumberInput = paymentDetails.querySelector('input[placeholder="Card Number"]');
                    const expiryInput = paymentDetails.querySelector('input[placeholder="MM/YY"]');
                    
                    cardNumberInput.addEventListener('input', function(e) {
                        let value = e.target.value.replace(/\s/g, '');
                        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
                        if (formattedValue !== e.target.value) {
                            e.target.value = formattedValue;
                        }
                    });
                    
                    expiryInput.addEventListener('input', function(e) {
                        let value = e.target.value.replace(/\D/g, '');
                        if (value.length >= 2) {
                            value = value.substring(0, 2) + '/' + value.substring(2, 4);
                        }
                        e.target.value = value;
                    });
                }
            }

            // Handle form submission
            donationForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Hide previous messages
                successMessage.style.display = 'none';
                errorMessage.style.display = 'none';
                
                // Validate form
                const fullName = document.getElementById('fullName').value.trim();
                const phoneNumber = document.getElementById('phoneNumber').value.trim();
                const country = document.getElementById('country').value;
                const cardSelectionValue = document.getElementById('cardSelection').value;
                
                if (!fullName || !phoneNumber || !country || !cardSelectionValue || !selectedCard) {
                    errorMessage.style.display = 'block';
                    errorMessage.scrollIntoView({ behavior: 'smooth' });
                    return;
                }
                
                // Check if payment details are filled
                const paymentInputs = paymentDetails.querySelectorAll('input[required]');
                let paymentValid = true;
                
                paymentInputs.forEach(input => {
                    if (!input.value.trim()) {
                        paymentValid = false;
                    }
                });
                
                if (!paymentValid) {
                    errorMessage.textContent = 'Please fill in all payment details.';
                    errorMessage.style.display = 'block';
                    errorMessage.scrollIntoView({ behavior: 'smooth' });
                    return;
                }
                
                // Show loading state
                donateBtn.classList.add('loading');
                donateBtn.textContent = 'Processing...';
                
                // Simulate form submission
                setTimeout(() => {
                    // Hide success message and show redirect dialog
                    successMessage.style.display = 'none';
                    redirectDialog.classList.add('active');
                    
                    // Reset form
                    donationForm.reset();
                    cardOptionsList.classList.remove('active');
                    paymentDetails.classList.remove('active');
                    cardOptions.forEach(opt => opt.classList.remove('selected'));
                    selectedCard = null;
                    
                    // Reset button
                    donateBtn.classList.remove('loading');
                    donateBtn.textContent = 'Donate Now';
                }, 2000);
            });

            // Handle dialog button clicks
            goHomeBtn.addEventListener('click', function() {
                // Redirect to homepage
                window.location.href = '../home/homepage.html';
            });
            
            stayBtn.addEventListener('click', function() {
                // Close dialog and show success message
                redirectDialog.classList.remove('active');
                successMessage.style.display = 'block';
                successMessage.scrollIntoView({ behavior: 'smooth' });
            });
            
            // Close dialog when clicking outside
            redirectDialog.addEventListener('click', function(e) {
                if (e.target === redirectDialog) {
                    redirectDialog.classList.remove('active');
                    successMessage.style.display = 'block';
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                }
            });

            // Add smooth scrolling for better UX
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });
        });
