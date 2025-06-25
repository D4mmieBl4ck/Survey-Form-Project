// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get form elements
  const form =
    document.querySelector("form") || document.querySelector(".container");
  const submitButton = document.querySelector(".submit-button");
  const improvementOtherCheckbox = document.getElementById("improvement4");
  const improvementOtherText = document.getElementById("improvement_other");

  // Show/hide "other" text input based on checkbox selection
  if (improvementOtherCheckbox && improvementOtherText) {
    improvementOtherCheckbox.addEventListener("change", function () {
      if (this.checked) {
        improvementOtherText.style.display = "block";
        improvementOtherText.focus();
      } else {
        improvementOtherText.style.display = "none";
        improvementOtherText.value = "";
      }
    });

    // Initially hide the text input
    improvementOtherText.style.display = "none";
  }

  // Form validation function
  function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const age = document.getElementById("age").value;
    const role = document.getElementById("role").value;
    const recommend = document.querySelector('input[name="recommend"]:checked');
    const rating = document.getElementById("rating").value;

    // Check required fields
    if (!name) {
      alert("Please enter your name.");
      document.getElementById("name").focus();
      return false;
    }

    if (!email) {
      alert("Please enter your email.");
      document.getElementById("email").focus();
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      document.getElementById("email").focus();
      return false;
    }

    if (!age || age < 20 || age > 120) {
      alert("Please enter a valid age between 20 and 120.");
      document.getElementById("age").focus();
      return false;
    }

    if (!role) {
      alert("Please select your current role.");
      document.getElementById("role").focus();
      return false;
    }

    if (!recommend) {
      alert("Please select whether you would recommend Econsphere.");
      return false;
    }

    if (!rating) {
      alert("Please rate your experience.");
      document.getElementById("rating").focus();
      return false;
    }

    return true;
  }

  // Form submission handler
  if (submitButton) {
    submitButton.addEventListener("click", function (e) {
      e.preventDefault();

      if (validateForm()) {
        // Collect form data
        const formData = {
          name: document.getElementById("name").value.trim(),
          email: document.getElementById("email").value.trim(),
          age: document.getElementById("age").value,
          role: document.getElementById("role").value,
          recommend: document.querySelector('input[name="recommend"]:checked')
            .value,
          rating: document.getElementById("rating").value,
          improvements: [],
          comments: document.getElementById("comments").value.trim(),
        };

        // Collect checked improvements
        const improvementCheckboxes = document.querySelectorAll(
          'input[name="improvement"]:checked'
        );
        improvementCheckboxes.forEach((checkbox) => {
          if (checkbox.value === "other" && improvementOtherText.value.trim()) {
            formData.improvements.push(improvementOtherText.value.trim());
          } else if (checkbox.value !== "other") {
            formData.improvements.push(checkbox.value);
          }
        });

        // Display success message
        alert(
          "Thank you for your feedback! Your survey has been submitted successfully."
        );

        // Log form data to console (for development purposes)
        console.log("Survey Data:", formData);

        // Reset form
        resetForm();

        // Here you would typically send the data to a server
        // Example: submitToServer(formData);
      }
    });
  }

  // Function to reset the form
  function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("age").value = "";
    document.getElementById("role").value = "";
    document.getElementById("rating").value = "";
    document.getElementById("comments").value = "";

    // Reset radio buttons
    const radioButtons = document.querySelectorAll('input[name="recommend"]');
    radioButtons.forEach((radio) => (radio.checked = false));

    // Reset checkboxes
    const checkboxes = document.querySelectorAll('input[name="improvement"]');
    checkboxes.forEach((checkbox) => (checkbox.checked = false));

    // Hide other text input
    if (improvementOtherText) {
      improvementOtherText.style.display = "none";
      improvementOtherText.value = "";
    }
  }

  // Add input event listeners for real-time validation feedback
  document.getElementById("email").addEventListener("input", function () {
    const email = this.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailRegex.test(email)) {
      this.style.borderColor = "#ff6b6b";
    } else {
      this.style.borderColor = "#ddd";
    }
  });

  document.getElementById("age").addEventListener("input", function () {
    const age = parseInt(this.value);

    if (this.value && (age < 20 || age > 120)) {
      this.style.borderColor = "#ff6b6b";
    } else {
      this.style.borderColor = "#ddd";
    }
  });

  // Function to submit data to server (placeholder)
  function submitToServer(data) {
    // This is where you would make an API call to submit the data
    // Example using fetch:
    /*
        fetch('/submit-survey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting your survey. Please try again.');
        });
        */
  }
});
