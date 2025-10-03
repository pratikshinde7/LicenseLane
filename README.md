LicenseLane: Your Roadmap to Driving Licenses 🚗
<p align="center">
<em>A full-stack web application designed to simplify the process of obtaining a driving license in India. This project, based on research from my 5th semester, provides a one-stop solution with an informational hub and an interactive practice quiz.</em>
</p>

<p align="center">
<!-- It's highly recommended to add a screenshot or a short GIF of the project in action here! -->
<!-- Example: <img src="demo.gif" width="700" /> -->
</p>

Core Features
📖 Comprehensive Information Hub: A clean, multi-page section providing detailed, step-by-step guides on the process, eligibility, and required documents for both Learner's and Permanent driving licenses.

🧠 Interactive Practice Quiz: A dynamic quiz with questions and images related to Indian road signs and traffic rules. The options are lettered (A, B, C, D) to simulate a real test environment.

💻 Full-Stack Architecture: Built with a Python and Flask back-end that serves pages and handles the quiz logic, and an HTML/Tailwind CSS front-end for a modern and responsive user experience.

🌐 API-Driven Quiz: The quiz dynamically fetches questions from a back-end API, checks user answers, and provides instant feedback, demonstrating a clear separation between the front-end and back-end.

Technology Stack
Back-End:

Language: Python

Framework: Flask (for serving pages and creating APIs)

Front-End:

Structure: HTML5

Styling: Tailwind CSS (for rapid, modern UI design)

Interactivity: Vanilla JavaScript (for API communication in the quiz)

Data Format:

JSON: For storing and managing the quiz questions and answers.

Setup and Installation
To run this project on your local machine, please follow these steps:

Clone the Repository

git clone [https://github.com/your-username/LicenseLane-Project.git](https://github.com/your-username/LicenseLane-Project.git)
cd LicenseLane-Project


Create and Activate a Virtual Environment

# Create the environment
python -m venv venv

# Activate on Windows
.\venv\Scripts\activate


Install the Required Dependencies
The requirements.txt file contains all the necessary Python libraries.

pip install -r requirements.txt


Run the Application
This will start the Flask development server.

python app.py


View the Website
Open your web browser and navigate to the address shown in the terminal (usually http://127.0.0.1:5000).

Project Structure
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
