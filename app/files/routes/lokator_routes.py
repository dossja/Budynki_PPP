from flask import render_template, url_for, flash, redirect, request, abort, jsonify
from files import app, db
from files.models.lokator import Lokatorzy

from .. import db, app


@app.route("/lokatorzy", methods=["GET"])
def get_lokatorzy():
    lokatorzy = Lokatorzy.query.all()

    return f"{lokatorzy}"


@app.route('/lokatorzy/<string:id>', methods=['GET'])
def get_lokatorzy_ID(id):
    lokatorzy = Lokatorzy.query.get(id)

    if lokatorzy is not None:
        return jsonify(f"{lokatorzy}"), 200
    return jsonify(error="lokatorzy not found"), 404


@app.route('/lokatorzy/newest', methods=['GET'])
def get_lokatorzy_Newest():
    lokatorzy = Lokatorzy.query.order_by(Lokatorzy.id.desc()).first()

    if lokatorzy is not None:
        return jsonify(f"{lokatorzy}"), 200
    return jsonify(error="lokatorzy not found"), 404


@app.route("/lokatorzy", methods=['POST'])
def post_lokatorzy():
    datas = request.get_json()
    imie = datas.get('imie', '')
    if imie == '':
        return jsonify(error="imie is empty"), 400
    nazwisko = datas.get('nazwisko', '')
    if nazwisko == '':
        return jsonify(error="nazwisko is empty"), 400
    PESEL = datas.get('PESEL', '')
    if PESEL == '':
        return jsonify(error="PESEL is empty"), 400

    model = Lokatorzy()
    model.imie = imie
    model.nazwisko = nazwisko
    model.PESEL = PESEL

    db.session.add(model)
    db.session.commit()

    return jsonify(f"{model}"), 200


@app.route('/lokatorzy/<string:id>', methods=['PUT'])
def put_lokatorzy(id):
    lokatorzy = Lokatorzy.query.get(id)
    datas = request.get_json()

    imie = datas.get('imie', '')
    if imie != '':
        lokatorzy.imie = imie
    nazwisko = datas.get('nazwisko', '')
    if nazwisko != '':
        lokatorzy.nazwisko = nazwisko
    PESEL = datas.get('PESEL', '')
    if PESEL != '':
        lokatorzy.PESEL = PESEL

    db.session.add(lokatorzy)
    db.session.commit()

    if lokatorzy is not None:
        return jsonify(f"{lokatorzy}"), 200
    return jsonify(error="lokatorzy not updated"), 404


@app.route('/lokatorzy/<string:id>', methods=['DELETE'])
def delete_lokatorzy(id):
    lokatorzy = Lokatorzy.query.filter_by(id=id).delete()
    db.session.commit()

    return jsonify(f"Adres deleted"), 200
