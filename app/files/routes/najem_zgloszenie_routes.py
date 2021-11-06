from flask import render_template, url_for, flash, redirect, request, abort, jsonify
from files import app, db
from files.models.najem_zgloszenie import NajmyZgloszenia

from .. import db, app


@app.route("/najmyZgloszenia", methods=["GET"])
def get_najmyZgloszenia():
    najmyZgloszenia = NajmyZgloszenia.query.all()

    return f"{najmyZgloszenia}"


@app.route('/najmyZgloszenia/<string:id>', methods=['GET'])
def get_najmyZgloszenia_ID(id):
    najmyZgloszenia = NajmyZgloszenia.query.filter_by(zgloszenie_id=id).all()

    if najmyZgloszenia is not None:
        return jsonify(f"{najmyZgloszenia}"), 200
    return jsonify(error="najmyZgloszenia not found"), 404


@app.route('/najmyZgloszenia/<string:id>/twoje', methods=['GET'])
def get_najmyZgloszenia_Twoje(id):
    najmyZgloszenia = NajmyZgloszenia.query.filter_by(najem_id=id).all()

    if najmyZgloszenia is not None:
        return jsonify(f"{najmyZgloszenia}"), 200
    return jsonify(error="najmyZgloszenia not found"), 404


@app.route("/najmyZgloszenia", methods=['POST'])
def post_najmyZgloszenia():
    datas = request.get_json()
    zgloszenie_id = datas.get('zgloszenie_id', '')
    if zgloszenie_id == '':
        return jsonify(error="zgloszenie_id is empty"), 400
    najem_id = datas.get('najem_id', '')
    if najem_id == '':
        return jsonify(error="najem_id is empty"), 400

    model = NajmyZgloszenia()
    model.zgloszenie_id = zgloszenie_id
    model.najem_id = najem_id

    db.session.add(model)
    db.session.commit()

    return jsonify(f"{model}"), 200


@app.route('/najmyZgloszenia/<string:id>', methods=['PUT'])
def put_najmyZgloszenia(id):
    najmyZgloszenia = NajmyZgloszenia.query.get(id)
    datas = request.get_json()

    zgloszenie_id = datas.get('zgloszenie_id', '')
    if zgloszenie_id != '':
        najmyZgloszenia.zgloszenie_id = zgloszenie_id
    najem_id = datas.get('najem_id', '')
    if najem_id != '':
        najmyZgloszenia.najem_id = najem_id

    db.session.add(najmyZgloszenia)
    db.session.commit()

    if najmyZgloszenia is not None:
        return jsonify(f"{najmyZgloszenia}"), 200
    return jsonify(error="najmyZgloszenia not updated"), 404


@app.route('/najmyZgloszenia/<string:id>', methods=['DELETE'])
def delete_najmyZgloszenia(id):
    najmyZgloszenia = NajmyZgloszenia.query.filter_by(id=id).delete()
    db.session.commit()

    return jsonify(f"najmyZgloszenia deleted"), 200
