from flask import Blueprint, render_template, jsonify
import json
import os

main = Blueprint("main", __name__)

@main.route("/")
def home():
    return render_template("home.html")

@main.route("/map")
def map_page():
    return render_template("map.html")

@main.route("/recommendations")
def recommendations():
    return render_template("recommendations.html")

@main.route("/methodology")
def methodology():
    return render_template("methodology.html")

@main.route("/data")
def data():
    file_path = os.path.join(os.getcwd(), "data", "manhattan.geojson")

    with open(file_path, "r", encoding="utf-8") as f:
        geojson = json.load(f)

    return jsonify(geojson)