from flask import Flask, render_template, jsonify, request
import json
import random

# Initialize the Flask application
app = Flask(__name__)

# Load quiz data from the JSON file
def load_questions():
    """This function opens and reads the quiz_data.json file."""
    with open('quiz_data.json', 'r') as f:
        return json.load(f)

questions = load_questions()

# --- Page Routes (Serving HTML) ---

@app.route('/')
def home():
    """ Renders the homepage (index.html) """
    return render_template('index.html')

@app.route('/quiz')
def quiz():
    """ Renders the main quiz page (quiz.html) """
    return render_template('quiz.html')

# --- Routes for the Information Hub ---
@app.route('/info')
def info():
    """ Renders the main information hub page (info.html) """
    return render_template('info.html')

@app.route('/learner')
def learner():
    """ Renders the Learner's License detail page (learner.html) """
    return render_template('learner.html')

@app.route('/permanent')
def permanent():
    """ Renders the Permanent License detail page (permanent.html) """
    return render_template('permanent.html')

# --- API Routes (For the Quiz) ---
@app.route('/api/question')
def get_question():
    """ Serves a random quiz question to the front-end """
    question = random.choice(questions)
    return jsonify(question)

@app.route('/api/check_answer', methods=['POST'])
def check_answer():
    """ Checks the user's answer and returns the result """
    data = request.get_json()
    question_id = data.get('question_id')
    selected_answer = data.get('selected_answer')

    # Find the question in our list of questions
    question = next((q for q in questions if q['id'] == question_id), None)

    if not question:
        return jsonify({'error': 'Question not found'}), 404

    # Check if the selected answer is correct
    correct = (selected_answer == question['answer'])
    
    # Send back the result
    return jsonify({
        'correct': correct,
        'correct_answer': question['answer']
    })

# --- Run the App ---
if __name__ == '__main__':
    app.run(debug=True)

