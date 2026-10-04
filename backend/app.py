from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/api/submit", methods=["GET", "POST"])
def handle_submit():
  if request.method == "POST":
    data = request.get_json(silent=True)

    if data and ("name" in data or "email" in data):
      name = data.get("name")
      email = data.get("email")
      return jsonify({
          "status": "success",
          "message": f"Data received for {name} ({email}) successfully!",
      })

    return jsonify({
        "status": "error",
        "message": (
            "POST request received, but JSON data is missing or empty. Check"
            " your frontend fetch headers."
        ),
    })

  return jsonify({
      "status": "error",
      "message": "Please send a POST request with JSON data to submit.",
  })


if __name__ == "__main__":
  app.run(host="0.0.0.0", port=5000, debug=True)
