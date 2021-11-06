from flask import render_template, url_for, flash, redirect, request, abort, jsonify
from files import app, db
from files.models.adres import Adresy

from .. import db, app


@app.route("/adresy", methods=["GET"])
def get_adresy():
    adresy = Adresy.query.all()

    return f"{adresy}"


@app.route('/adresy/<string:id>', methods=['GET'])
def get_adresy_ID(id):
    adres = Adresy.query.get(id)

    if adres is not None:
        return jsonify(f"{adres}"), 200
    return jsonify(error="adres not found"), 404


@app.route('/adresy/newest', methods=['GET'])
def get_adresy_Newest():
    adres = Adresy.query.order_by(Adresy.id.desc()).first()

    if adres is not None:
        return jsonify(f"{adres}"), 200
    return jsonify(error="adres not found"), 404


@app.route("/adresy", methods=['POST'])
def post_adresy():
    datas = request.get_json()
    miejscowosc = datas.get('miejscowosc', '')
    if miejscowosc == '':
        return jsonify(error="miejscowosc is empty"), 400
    numerBudynku = datas.get('numerBudynku', '')
    if numerBudynku == '':
        return jsonify(error="numerBudynku is empty"), 400
    ulica = datas.get('ulica', '')
    if ulica == '':
        return jsonify(error="ulica is empty"), 400

    model = Adresy()
    model.miejscowosc = miejscowosc
    model.numerBudynku = numerBudynku
    model.ulica = ulica

    db.session.add(model)
    db.session.commit()

    return jsonify(f"{model}"), 200


@app.route('/adresy/<string:id>', methods=['PUT'])
def put_adresy(id):
    adres = Adresy.query.get(id)
    datas = request.get_json()

    miejscowosc = datas.get('miejscowosc', '')
    if miejscowosc != '':
        adres.miejscowosc = miejscowosc
    numerBudynku = datas.get('numerBudynku', '')
    if numerBudynku != '':
        adres.numerBudynku = numerBudynku
    ulica = datas.get('ulica', '')
    if ulica != '':
        adres.ulica = ulica

    db.session.add(adres)
    db.session.commit()

    if adres is not None:
        return jsonify(f"{adres}"), 200
    return jsonify(error="adres not updated"), 404


@app.route('/adresy/<string:id>', methods=['DELETE'])
def delete_adresy(id):
    adres = Adresy.query.filter_by(id=id).delete()
    db.session.commit()

    return jsonify(f"Adres deleted"), 200
