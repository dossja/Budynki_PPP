from flask import render_template, url_for, flash, redirect, request, abort, jsonify
from files import app, db
from files.models.najem_lokator import NajmyLokatorzy

from .. import db, app


@app.route("/najmyLokatorzy", methods=["GET"])
def get_najmyLokatorzy():
    najmyLokatorzy = NajmyLokatorzy.query.all()

    return f"{najmyLokatorzy}"


@app.route('/najmyLokatorzy/<string:id>', methods=['GET'])
def get_najmyLokatorzy_ID(id):
    najmyLokatorzy = NajmyLokatorzy.query.filter_by(lokator_id=id).all()

    if najmyLokatorzy is not None:
        return jsonify(f"{najmyLokatorzy}"), 200
    return jsonify(error="najmyLokatorzy not found"), 404


@app.route('/najmyLokatorzy/<string:id>/lokatorzy', methods=['GET'])
def get_najmyLokatorzy_Lokatorzy(id):
    najmyLokatorzy = NajmyLokatorzy.query.filter_by(najem_id=id).all()

    if najmyLokatorzy is not None:
        return jsonify(f"{najmyLokatorzy}"), 200
    return jsonify(error="najmyLokatorzy not found"), 404


@app.route("/najmyLokatorzy", methods=['POST'])
def post_najmyLokatorzy():
    datas = request.get_json()
    lokator_id = datas.get('lokator_id', '')
    if lokator_id == '':
        return jsonify(error="lokator_id is empty"), 400
    najem_id = datas.get('najem_id', '')
    if najem_id == '':
        return jsonify(error="najem_id is empty"), 400

    model = NajmyLokatorzy()
    model.lokator_id = lokator_id
    model.najem_id = najem_id

    db.session.add(model)
    db.session.commit()

    return jsonify(f"{model}"), 200


@app.route('/najmyLokatorzy/<string:id>', methods=['PUT'])
def put_najmyLokatorzy(id):
    najmyLokatorzy = NajmyLokatorzy.query.get(id)
    datas = request.get_json()

    lokator_id = datas.get('lokator_id', '')
    if lokator_id != '':
        najmyLokatorzy.lokator_id = lokator_id
    najem_id = datas.get('najem_id', '')
    if najem_id != '':
        najmyLokatorzy.najem_id = najem_id

    db.session.add(najmyLokatorzy)
    db.session.commit()

    if najmyLokatorzy is not None:
        return jsonify(f"{najmyLokatorzy}"), 200
    return jsonify(error="najmyLokatorzy not updated"), 404


@app.route('/najmyLokatorzy/<string:id>', methods=['DELETE'])
def delete_najmyLokatorzy(id):
    najmyLokatorzy = NajmyLokatorzy.query.filter_by(id=id).delete()
    db.session.commit()

    return jsonify(f"najmyLokatorzy deleted"), 200
