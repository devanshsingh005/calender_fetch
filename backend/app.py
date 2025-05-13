from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)  

@app.route('/calendar-info', methods=['POST'])
def calendar_info():
    data = request.get_json()

    try:
        dt = datetime.strptime(data['date'], "%Y-%m-%d")
        return jsonify({
            "day": dt.day,
            "dayOfWeek": dt.strftime("%A")
        })
    except ValueError:
        return jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400

if __name__ == '__main__':
    app.run(debug=True, port=8000)
