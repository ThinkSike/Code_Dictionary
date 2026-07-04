from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/data', methods=['POST'])
def receive_data():
    data = request.json
    return jsonify({"status": "received", "data": data})

if __name__ == '__main__':
    print("Starting REST Server on http://127.0.0.1:5000")
    app.run(host='127.0.0.1', port=5000, debug=True)