import json

from cs50 import SQL
from flask_cors import CORS

from flask import Flask, send_file 
from flask import request 
from flask import jsonify

from datetime import datetime
from datetime import timedelta 
from datetime import timezone

from werkzeug.security import check_password_hash 
from werkzeug.security import generate_password_hash

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt 
from flask_jwt_extended import get_jwt_identity 
from flask_jwt_extended import unset_jwt_cookies 
from flask_jwt_extended import jwt_required 
from flask_jwt_extended import JWTManager

app = Flask(__name__)
CORS(app)

# JWT configuration
app.config["JWT_SECRET_KEY"] = "ê?VÙì]ÁÖ/OÒRK1àèA9("
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = False
jwt = JWTManager(app)

# Databases
db = SQL("sqlite:///database.db")


@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    # response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Credentials"] = True
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPT"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

# Resets expiration timer on `access_tokens`
@app.after_request
def refresh_access_token(response):
    try:
        token_expiration = get_jwt()["exp"]
        current_time = datetime.now(timezone.utc)
        target_time = datetime.timestamp(current_time + timedelta(minutes = 30))
        if target_time > token_expiration:
            access_token = create_access_token(identity = get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        return response

# Registers new users
@app.route("/register", methods=["POST"])
def register():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    confirmation = request.json.get("confirmation", None)

    if (db.execute("SELECT ALL username FROM users WHERE username = ?", username)):
        return jsonify({"msg": "Username already taken"}), 401
    if not username or not password or not confirmation:
        return jsonify({"msg": "User or Password is blank"}), 401
    if confirmation != password:
        return jsonify({"msg": "Password does not match confirmation password"}), 401
    
    pwdHash = generate_password_hash(password)
    db.execute("INSERT INTO users (username, hash) VALUES(?, ?)", username, pwdHash)

    return  jsonify({"msg": "Registration successful"}), 200


# Logs users in
@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username")
    password = request.json.get("password")
    
    response_fail = jsonify({"msg": "Login failed incorrect username or password"})
    response_404 = jsonify({"msg": "Username does not match any accounts"})

    if not username or not password:
        return response_404, 404

    if (db.execute("SELECT ALL username FROM users WHERE username = ?", username)):
        pwdHash = (db.execute("SELECT hash FROM users WHERE username = ?", username))

        if (check_password_hash(pwdHash[0]["hash"], password)):
            user = (db.execute("SELECT id FROM users WHERE username = ?", username))
            access_token = create_access_token(identity = username)
            response = {
                "id": user[0]["id"],
                "user": username,
                "access_token": access_token
            }
            return response, 200
        else: 
            return response_fail, 401
    return response_404


# Logs users out
@app.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    response = jsonify({"msg": "Successfully logged out"})
    unset_jwt_cookies(response) 
    return response


# Adds clicked on item to the users cart database
@app.route("/cartadd", methods=["POST"])
@jwt_required()
def cartadd():
    current_user = get_jwt_identity()
    if current_user == None:
        return {"msg": "Must be logged in"}
    userID = db.execute("SELECT id FROM users WHERE username = ?", current_user)
    itemID = request.json.get("itemID", None)

    if not userID or not itemID:
        return {"msg": "Not found"}, 404

    if db.execute("SELECT ALL itemID FROM carts WHERE id = ? AND itemID = ?", userID[0]["id"], itemID):
        return {"msg": "Item already in cart"}, 200

    db.execute("INSERT INTO carts (id, itemID) VALUES(?, ?)", userID[0]["id"], itemID)
    return {"msg": "Item added successfully"}, 200


# Removes item from the users cart database
@app.route("/cartremove", methods=["POST"])
@jwt_required()
def cartremove():
    current_user = get_jwt_identity()
    userID = db.execute("SELECT id FROM users WHERE username = ?", current_user)
    itemID = request.json.get("itemID", None)

    if not userID or not itemID:
        return {"msg": "Not found"}, 404
    if (db.execute("SELECT ALL id FROM carts WHERE id = ? AND itemID = ?", userID[0]["id"], itemID)):
        try:
            db.execute("DELETE FROM carts WHERE id = ? AND itemID = ?", userID[0]["id"], itemID)
        except:
            return {"msg": "Failed to remove item"}
        else:
            return {"msg": "Successfully removed item"}, 200
    return {"msg": "Item not found"}, 404


# Updates cart from client data
@app.route("/updatecart", methods=["POST"])
@jwt_required()
def updateCart():
    current_user = get_jwt_identity()
    if not current_user:
        return 404
    ID = db.execute("SELECT id FROM users WHERE username = ?", current_user)
    userID = ID[0]['id']
    if not userID:
        return 401
    if db.execute("SELECT ALL itemID FROM carts WHERE id = ?", userID):
        cartData = db.execute("SELECT * FROM carts WHERE id = ?", userID)
        items = []
        for i in range(len(cartData)):
            items.append(cartData[i]["itemID"])
        data = []
        for i in range(len(items)):
            data.append(db.execute("SELECT * FROM catalog WHERE id = ?", items[i]))
        return data
    return 404


# Pushes catalog data to front end to display
@app.route("/main", methods=["POST"])
def getCatalog():
    catalog = db.execute("SELECT * FROM catalog")
    return jsonify(catalog)


# Create new catalog item
@app.route("/newitem", methods=["POST"])
# @jwt_required()
def newitem():
    # current_user = get_jwt_identity()
    # if (current_user == "admin"):
        itemID = request.json.get("itemID", None)
        itemName = request.json.get("itemName", None)
        itemSKU = request.json.get("itemSKU", None)
        itemPrice = request.json.get("itemPrice", None)
        imgPath = request.json.get("imgPath", None)

        if not itemID or not itemName or not itemSKU or not itemPrice or not imgPath:
            return {"msg": "One or more fields are empty"}, 401 

        if (db.execute("SELECT ALL id FROM catalog WHERE id = ?", itemID)):
            return {"msg": "Item ID already being used"}

        try:
            db.execute("INSERT INTO catalog (id, name, sku, price, imagePath) VALUES(?, ?, ?, ?, ?)", itemID, itemName, itemSKU, itemPrice, imgPath)
        except:
            return {"msg": "Failed to create new item"}, 401
        else:
            return {"msg": "Successfully added new item"}, 200


# Removes catalog item
@app.route("/removeitem", methods=["POST"])
# @jwt_required()
def removeitem():
    # current_user = get_jwt_identity()
    # if (current_user == "admin"):
        itemID = request.json.get("itemID", None)
        if not itemID or not db.execute("SELECT ALL id FROM catalog WHERE id = ?", itemID):
            return {"msg": "Item ID empty or not found"}, 401
        try:
            db.execute("DELETE FROM catalog WHERE id = ?", itemID)
        except:
            return {"msg": "Failed to remove item"}
        else:
            return {"msg": "Successfully removed item"}, 200


# Image load test
@app.route("/image/<itemname>", methods=["GET"])
def imageLoad(itemname):
    item = itemname    
    filename = f'static/{item}.jpg'
    return send_file(filename, mimetype='image/gif')


# Server app launcher
if __name__ == "__main__":
    app.run(debug=True)