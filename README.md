LicenseLane: Your Roadmap to Driving Licenses 🚗
<p align="center">
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
<img src="https://www.google.com/search?q=https://img.shields.io/badge/Flask-000000%3Fstyle%3Dfor-the-badge%26logo%3Dflask%26logoColor%3Dwhite" />
<img src="https://www.google.com/search?q=https://img.shields.io/badge/HTML5-E34F26%3Fstyle%3Dfor-the-badge%26logo%3Dhtml5%26logoColor%3Dwhite" />
<img src="https://www.google.com/search?q=https://img.shields.io/badge/Tailwind_CSS-38B2AC%3Fstyle%3Dfor-the-badge%26logo%3Dtailwind-css%26logoColor%3Dwhite" />
</p>

<p align="center">
<em>A full-stack web application designed to simplify the process of obtaining a driving license in India. This project, based on research from my 5th semester, provides a one-stop solution with an informational hub and an interactive practice quiz.</em>
</p>

<img width="2879" height="1528" alt="image" src="https://github.com/user-attachments/assets/817fc957-74f1-4a7c-b985-c50e7ca216f0" />

<img width="2879" height="1524" alt="image" src="https://github.com/user-attachments/assets/acc7c984-848d-4172-84a7-f6f4dd2f8cf4" />


✨ Core Features
📖 Comprehensive Information Hub: A clean, multi-page section providing detailed, step-by-step guides on the process, eligibility, and required documents for both Learner's and Permanent driving licenses.

🧠 Interactive Practice Quiz: A dynamic quiz with questions and images related to Indian road signs and traffic rules. The options are lettered (A, B, C, D) to simulate a real test environment.

💻 Full-Stack Architecture: Built with a Python and Flask back-end that serves pages and handles the quiz logic, and an HTML/Tailwind CSS front-end for a modern and responsive user experience.

🌐 API-Driven Quiz: The quiz dynamically fetches questions from a back-end API, checks user answers, and provides instant feedback, demonstrating a clear separation between the front-end and back-end.

🛠️ Technology Stack
Back-End:

Language: Python

Framework: Flask (for serving pages and creating APIs)

Front-End:

Structure: HTML5

Styling: Tailwind CSS (for rapid, modern UI design)

Interactivity: Vanilla JavaScript (for API communication in the quiz)

Data Format:

JSON: For storing and managing the quiz questions and answers.

📁 Project Structure
The project is organized with a standard Flask application structure, separating the back-end logic, front-end templates, and static assets.

LicenseLane-Project/
├── app.py              # The main Flask server and back-end logic
├── quiz_data.json      # The database of quiz questions
├── requirements.txt    # List of Python dependencies
├── static/
│   └── images/         # Folder for road sign images
└── templates/
    ├── index.html      # The main homepage
    ├── info.html       # The information hub landing page
    ├── learner.html    # Learner's License details
    ├── permanent.html  # Permanent License details
    └── quiz.html       # The interactive quiz page
