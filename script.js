// Global variables
let selectedCollege = null;
let userMarks = null;
let selectedCourse = null;
let colleges = [];

// Initialize chatbot
document.addEventListener('DOMContentLoaded', function() {
  // Load college data
  colleges = [
    {
      "name": "Rajasthan Technical University",
      "location": "Kota",
      "courses": ["B.Tech", "M.Tech", "MBA"],
      "fee_structure": {
        "B.Tech": "₹80,000 per year",
        "M.Tech": "₹1,00,000 per year",
        "MBA": "₹90,000 per year"
      },
      "cutoff": {
        "B.Tech": 75,
        "M.Tech": 70,
        "MBA": 65
      },
      "contact": "rtu@rajasthan.gov.in"
    },
    {
      "name": "MNIT Jaipur",
      "location": "Jaipur",
      "courses": ["B.Tech", "M.Tech", "Ph.D."],
      "fee_structure": {
        "B.Tech": "₹1,20,000 per year",
        "M.Tech": "₹1,50,000 per year",
        "Ph.D.": "₹1,00,000 per year"
      },
      "cutoff": {
        "B.Tech": 85,
        "M.Tech": 80,
        "Ph.D.": 75
      },
      "contact": "info@mnit.ac.in"
    },
    {
      "name": "Government Engineering College Ajmer",
      "location": "Ajmer",
      "courses": ["B.Tech", "M.Tech"],
      "fee_structure": {
        "B.Tech": "₹75,000 per year",
        "M.Tech": "₹90,000 per year"
      },
      "cutoff": {
        "B.Tech": 70,
        "M.Tech": 65
      },
      "contact": "geca@rajasthan.gov.in"
    },
    {
      "name": "JECRC University",
      "location": "Jaipur",
      "courses": ["B.Tech", "M.Tech", "MBA", "BCA"],
      "fee_structure": {
        "B.Tech": "₹1,00,000 per year",
        "M.Tech": "₹1,20,000 per year",
        "MBA": "₹1,00,000 per year",
        "BCA": "₹60,000 per year"
      },
      "cutoff": {
        "B.Tech": 75,
        "M.Tech": 70,
        "MBA": 65,
        "BCA": 60
      },
      "contact": "info@jecrcuniversity.edu.in"
    },
    {
      "name": "SKIT Jaipur",
      "location": "Jaipur",
      "courses": ["B.Tech", "M.Tech", "MBA"],
      "fee_structure": {
        "B.Tech": "₹85,000 per year",
        "M.Tech": "₹1,10,000 per year",
        "MBA": "₹95,000 per year"
      },
      "cutoff": {
        "B.Tech": 72,
        "M.Tech": 68,
        "MBA": 63
      },
      "contact": "info@skit.ac.in"
    }
  ];

  // Initialize chatbot
  displayWelcomeMessage();

  // Toggle chatbot window
  document.getElementById('chatbot-toggle').addEventListener('click', function() {
    const chatbotWindow = document.getElementById('chatbot-window');
    chatbotWindow.style.display = chatbotWindow.style.display === 'block' ? 'none' : 'block';
  });

  // Close chatbot window
  document.getElementById('chatbot-close').addEventListener('click', function() {
    document.getElementById('chatbot-window').style.display = 'none';
  });

  // Send message on button click
  document.getElementById('chatbot-send').addEventListener('click', function() {
    const userMessage = document.getElementById('chatbot-input').value.trim();
    if (userMessage) {
      displayMessage(userMessage, 'user');
      document.getElementById('chatbot-input').value = '';
      handleUserMessage(userMessage);
    }
  });

  // Send message on Enter key
  document.getElementById('chatbot-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      const userMessage = document.getElementById('chatbot-input').value.trim();
      if (userMessage) {
        displayMessage(userMessage, 'user');
        document.getElementById('chatbot-input').value = '';
        handleUserMessage(userMessage);
      }
    }
  });
});

// Display welcome message
function displayWelcomeMessage() {
  displayMessage("Welcome to the Student Assistance Chatbot! How can I help you today?", 'bot');
  displayMessage("Choose an option:", 'bot');
  
  const options = document.createElement('div');
  options.classList.add('message', 'bot');
  options.innerHTML = `
    <button class="option-button" data-option="colleges">View Colleges</button>
    <button class="option-button" data-option="eligibility">Check Eligibility</button>
  `;
  
  document.getElementById('chatbot-messages').appendChild(options);
  
  // Add event listeners to option buttons
  document.querySelectorAll('.option-button').forEach(button => {
    button.addEventListener('click', function() {
      const option = this.getAttribute('data-option');
      if (option === 'colleges') {
        displayCollegesList();
      } else if (option === 'eligibility') {
        startEligibilityCheck();
      }
    });
  });
}

// Display list of colleges
function displayCollegesList() {
  const chatbotMessages = document.getElementById('chatbot-messages');
  const list = document.createElement('div');
  list.classList.add('message', 'bot');
  list.innerHTML = "<strong>Colleges:</strong><br>";

  colleges.forEach(college => {
    const button = document.createElement('button');
    button.classList.add('college-button');
    button.textContent = college.name;
    button.addEventListener('click', () => {
      selectedCollege = college;
      displayMessage(`You selected ${college.name}. What would you like to know?`, 'bot');
      displayCollegeOptions();
    });
    list.appendChild(button);
  });

  chatbotMessages.appendChild(list);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Display options for selected college
function displayCollegeOptions() {
  const options = document.createElement('div');
  options.classList.add('message', 'bot');
  options.innerHTML = `
    <button class="option-button" data-option="fee">Fee Structure</button>
    <button class="option-button" data-option="location">Location</button>
    <button class="option-button" data-option="courses">Courses</button>
    <button class="option-button" data-option="cutoff">Cutoff Marks</button>
    <button class="option-button" data-option="back">Back to Main Menu</button>
  `;
  
  document.getElementById('chatbot-messages').appendChild(options);
  
  // Add event listeners to option buttons
  document.querySelectorAll('.option-button').forEach(button => {
    button.addEventListener('click', function() {
      const option = this.getAttribute('data-option');
      if (option === 'fee') {
        displayMessage(`Fee structure for ${selectedCollege.name}: ${JSON.stringify(selectedCollege.fee_structure)}`, 'bot');
      } else if (option === 'location') {
        displayMessage(`Location of ${selectedCollege.name}: ${selectedCollege.location}`, 'bot');
      } else if (option === 'courses') {
        displayMessage(`Courses offered by ${selectedCollege.name}: ${selectedCollege.courses.join(', ')}`, 'bot');
      } else if (option === 'cutoff') {
        displayMessage(`Cutoff marks for ${selectedCollege.name}: ${JSON.stringify(selectedCollege.cutoff)}`, 'bot');
      } else if (option === 'back') {
        displayWelcomeMessage();
      }
    });
  });
}

// Start eligibility check process
function startEligibilityCheck() {
  displayMessage("Please enter your marks (percentage):", 'bot');
  
  // Create input field for marks
  const inputContainer = document.createElement('div');
  inputContainer.classList.add('message', 'bot');
  inputContainer.innerHTML = `
    <input type="number" id="marks-input" placeholder="Enter your marks (e.g., 85)" min="0" max="100">
    <button id="submit-marks">Submit</button>
  `;
  
  document.getElementById('chatbot-messages').appendChild(inputContainer);
  
  document.getElementById('submit-marks').addEventListener('click', function() {
    const marks = parseInt(document.getElementById('marks-input').value);
    if (isNaN(marks) || marks < 0 || marks > 100) {
      displayMessage("Please enter valid marks between 0 and 100.", 'bot');
      return;
    }
    userMarks = marks;
    displayCourseOptions();
  });
}

// Display course options for eligibility check
function displayCourseOptions() {
  // Get all unique courses from colleges
  const allCourses = new Set();
  colleges.forEach(college => {
    college.courses.forEach(course => allCourses.add(course));
  });
  
  displayMessage(`Your marks: ${userMarks}%. Please select a course:`, 'bot');
  
  const courseOptions = document.createElement('div');
  courseOptions.classList.add('message', 'bot');
  
  let buttonsHTML = '';
  allCourses.forEach(course => {
    buttonsHTML += `<button class="course-button" data-course="${course}">${course}</button>`;
  });
  
  courseOptions.innerHTML = buttonsHTML;
  document.getElementById('chatbot-messages').appendChild(courseOptions);
  
  // Add event listeners to course buttons
  document.querySelectorAll('.course-button').forEach(button => {
    button.addEventListener('click', function() {
      selectedCourse = this.getAttribute('data-course');
      checkEligibility();
    });
  });
}

// Check eligibility based on marks and course
function checkEligibility() {
  const eligibleColleges = colleges.filter(college => {
    // Check if college offers the selected course
    if (!college.courses.includes(selectedCourse)) return false;
    
    // Check if marks meet cutoff
    return userMarks >= college.cutoff[selectedCourse];
  });
  
  if (eligibleColleges.length === 0) {
    displayMessage(`Sorry, no colleges available for ${selectedCourse} with your marks (${userMarks}%).`, 'bot');
  } else {
    displayMessage(`Here are colleges you're eligible for (${selectedCourse}, ${userMarks}%):`, 'bot');
    eligibleColleges.forEach(college => {
      const cutoff = college.cutoff[selectedCourse];
      displayMessage(`- ${college.name} (Cutoff: ${cutoff}%, Location: ${college.location})`, 'bot');
    });
  }
  
  // Show options to start over
  displayMessage("Would you like to check another course or view colleges?", 'bot');
  const options = document.createElement('div');
  options.classList.add('message', 'bot');
  options.innerHTML = `
    <button class="option-button" data-option="colleges">View Colleges</button>
    <button class="option-button" data-option="eligibility">Check Eligibility</button>
    <button class="option-button" data-option="back">Back to Main Menu</button>
  `;
  document.getElementById('chatbot-messages').appendChild(options);
  
  // Add event listeners to option buttons
  document.querySelectorAll('.option-button').forEach(button => {
    button.addEventListener('click', function() {
      const option = this.getAttribute('data-option');
      if (option === 'colleges') {
        displayCollegesList();
      } else if (option === 'eligibility') {
        startEligibilityCheck();
      } else if (option === 'back') {
        displayWelcomeMessage();
      }
    });
  });
}

// Handle user messages
function handleUserMessage(message) {
  if (selectedCollege) {
    // Handle queries about a specific college
    const query = message.toLowerCase();
    if (query.includes("fee") || query.includes("cost") || query.includes("price")) {
      displayMessage(`Fee structure for ${selectedCollege.name}: ${JSON.stringify(selectedCollege.fee_structure)}`, 'bot');
    } else if (query.includes("location") || query.includes("address") || query.includes("where")) {
      displayMessage(`Location of ${selectedCollege.name}: ${selectedCollege.location}`, 'bot');
    } else if (query.includes("course") || query.includes("program") || query.includes("study")) {
      displayMessage(`Courses offered by ${selectedCollege.name}: ${selectedCollege.courses.join(', ')}`, 'bot');
    } else if (query.includes("cutoff") || query.includes("marks") || query.includes("eligibility")) {
      displayMessage(`Cutoff marks for ${selectedCollege.name}: ${JSON.stringify(selectedCollege.cutoff)}`, 'bot');
    } else if (query.includes("contact") || query.includes("email") || query.includes("phone")) {
      displayMessage(`Contact information for ${selectedCollege.name}: ${selectedCollege.contact}`, 'bot');
    } else {
      displayMessage("I can help with fee structure, location, courses, cutoff marks, and contact information. What would you like to know?", 'bot');
    }
  } else {
    // Handle general queries
    const query = message.toLowerCase();
    if (query.includes("hello") || query.includes("hi") || query.includes("hey")) {
      displayMessage("Hello! How can I help you today?", 'bot');
    } else if (query.includes("college") || query.includes("institute") || query.includes("university")) {
      displayCollegesList();
    } else if (query.includes("eligibility") || query.includes("marks") || query.includes("cutoff")) {
      startEligibilityCheck();
    } else {
      displayMessage("I can help you find information about colleges or check your eligibility. Would you like to:", 'bot');
      const options = document.createElement('div');
      options.classList.add('message', 'bot');
      options.innerHTML = `
        <button class="option-button" data-option="colleges">View Colleges</button>
        <button class="option-button" data-option="eligibility">Check Eligibility</button>
      `;
      document.getElementById('chatbot-messages').appendChild(options);
      
      // Add event listeners to option buttons
      document.querySelectorAll('.option-button').forEach(button => {
        button.addEventListener('click', function() {
          const option = this.getAttribute('data-option');
          if (option === 'colleges') {
            displayCollegesList();
          } else if (option === 'eligibility') {
            startEligibilityCheck();
          }
        });
      });
    }
  }
}

// Display messages in the chatbot
function displayMessage(message, sender) {
  const chatbotMessages = document.getElementById('chatbot-messages');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);
  messageElement.textContent = message;
  chatbotMessages.appendChild(messageElement);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}