document.getElementById('ageForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const dobInput = document.getElementById('dob').value;
    const resultDiv = document.getElementById('result');
    if (!dobInput) {
        resultDiv.textContent = "Please enter your date of birth.";
        return;
    }

    const dob = new Date(dobInput);
    const today = new Date();

    if (dob > today) {
        resultDiv.textContent = "Date of birth cannot be in the future.";
        return;
    }

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if (days < 0) {
        months -= 1;
        // Get the number of days in the previous month
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years -= 1;
        months += 12;
    }

    resultDiv.textContent = `You are ${years} years, ${months} months, and ${days} days old.`;
});

document.addEventListener('DOMContentLoaded', function() {
    const resultDiv = document.getElementById('result');
    const dobInput = document.getElementById('dob');

    // On page load, show previous result if available
    const savedAge = localStorage.getItem('calculatedAge');
    const savedDob = localStorage.getItem('dob');
    if (savedAge) {
        resultDiv.textContent = savedAge;
        if (savedDob) dobInput.value = savedDob;
    }

    document.getElementById('ageForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const dobValue = dobInput.value;
        if (!dobValue) {
            resultDiv.textContent = "Please enter your date of birth.";
            localStorage.removeItem('calculatedAge');
            localStorage.removeItem('dob');
            return;
        }

        const dob = new Date(dobValue);
        const today = new Date();

        if (isNaN(dob)) {
            resultDiv.textContent = "Invalid date format.";
            localStorage.removeItem('calculatedAge');
            localStorage.removeItem('dob');
            return;
        }

        if (dob > today) {
            resultDiv.textContent = "Date of birth cannot be in the future.";
            localStorage.removeItem('calculatedAge');
            localStorage.removeItem('dob');
            return;
        }

        let years = today.getFullYear() - dob.getFullYear();
        let months = today.getMonth() - dob.getMonth();
        let days = today.getDate() - dob.getDate();

        if (days < 0) {
            months -= 1;
            const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += prevMonth.getDate();
        }

        if (months < 0) {
            years -= 1;
            months += 12;
        }

        const ageText = `You are ${years} years, ${months} months, and ${days} days old.`;
        resultDiv.textContent = ageText;

        // Save to localStorage
        localStorage.setItem('calculatedAge', ageText);
        localStorage.setItem('dob', dobValue);
    });
});