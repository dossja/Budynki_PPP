from flask import render_template, url_for, flash, redirect, request, abort, jsonify
from files import app, db
from files.models.lokal import Lokale

from .. import db, app


@app.route("/lokale", methods=["GET"])
def get_lokale():
    lokale = Lokale.query.all()

    return f"{lokale}"


@app.route('/lokale/<string:id>', methods=['GET'])
def get_lokale_ID(id):
    lokale = Lokale.query.get(id)

    if lokale is not None:
        return jsonify(f"{lokale}"), 200
    return jsonify(error="lokale not found"), 404


@app.route('/lokale/newest', methods=['GET'])
def get_lokale_Newest():
    lokale = Lokale.query.order_by(Lokale.id.desc()).first()

    if lokale is not None:
        return jsonify(f"{lokale}"), 200
    return jsonify(error="lokale not found"), 404


@app.route('/lokale/<string:id>/biland/<string:pocz>&<string:kon>', methods=['GET'])
def get_lokale_ID_Bilans(id, pocz, kon):
    lokale = Lokale.query.filter(Lokale.da)

    if lokale is not None:
        return jsonify(f"{lokale}"), 200
    return jsonify(error="lokale not found"), 404


@app.route("/lokale", methods=['POST'])
def post_lokale():
    datas = request.get_json()
    numerLokalu = datas.get('numerLokalu', '')
    if numerLokalu == '':
        return jsonify(error="numerLokalu is empty"), 400
    powierzchnia = datas.get('powierzchnia', '')
    if powierzchnia == '':
        return jsonify(error="powierzchnia is empty"), 400
    nieruchomosc_id = datas.get('nieruchomosc_id', '')
    if nieruchomosc_id == '':
        return jsonify(error="nieruchomosc_id is empty"), 400

    model = Lokale()
    model.numerLokalu = numerLokalu
    model.powierzchnia = powierzchnia
    model.nieruchomosc_id = nieruchomosc_id

    db.session.add(model)
    db.session.commit()

    return jsonify(f"{model}"), 200


@app.route('/lokale/<string:id>', methods=['PUT'])
def put_lokale(id):
    lokale = Lokale.query.get(id)
    datas = request.get_json()

    numerLokalu = datas.get('numerLokalu', '')
    if numerLokalu != '':
        lokale.numerLokalu = numerLokalu
    powierzchnia = datas.get('powierzchnia', '')
    if powierzchnia != '':
        lokale.powierzchnia = powierzchnia
    nieruchomosc_id = datas.get('nieruchomosc_id', '')
    if nieruchomosc_id != '':
        lokale.nieruchomosc_id = nieruchomosc_id

    db.session.add(lokale)
    db.session.commit()

    if lokale is not None:
        return jsonify(f"{lokale}"), 200
    return jsonify(error="lokale not updated"), 404


@app.route('/lokale/<string:id>', methods=['DELETE'])
def delete_lokale(id):
    lokale = Lokale.query.filter_by(id=id).delete()
    db.session.commit()

    return jsonify(f"lokale deleted"), 200
