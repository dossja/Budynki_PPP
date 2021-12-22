from flask import render_template, url_for, flash, redirect, request, abort, jsonify
from files import app, db
from files.models.zgloszenie import Zgloszenia

from .. import db, app


@app.route("/zgloszenia", methods=["GET"])
def get_zgloszenia():
    zgloszenia = Zgloszenia.query.all()

    return f"{zgloszenia}"


@app.route('/zgloszenia/<string:id>', methods=['GET'])
def get_zgloszenia_ID(id):
    zgloszenia = Zgloszenia.query.get(id)

    if zgloszenia is not None:
        return jsonify(f"{zgloszenia}"), 200
    return jsonify(error="zgloszenia not found"), 404


@app.route('/zgloszenia/newest', methods=['GET'])
def get_zgloszenia_Newest():
    zgloszenia = Zgloszenia.query.order_by(Zgloszenia.id.desc()).first()

    if zgloszenia is not None:
        return jsonify(f"{zgloszenia}"), 200
    return jsonify(error="zgloszenia not found"), 404


@app.route("/zgloszenia", methods=['POST'])
def post_zgloszenia():
    datas = request.get_json()
    opis = datas.get('opis', '')
    if opis == '':
        return jsonify(error="opis is empty"), 400
    kosztCalkowity = datas.get('kosztCalkowity', '')
    if kosztCalkowity == '':
        return jsonify(error="kosztCalkowity is empty"), 400
    kategoriaZgloszenia_id = datas.get('kategoriaZgloszenia_id', '')
    if kategoriaZgloszenia_id == '':
        return jsonify(error="kategoriaZgloszenia_id is empty"), 400
    statusZgloszenia_id = datas.get('statusZgloszenia_id', '')
    if statusZgloszenia_id == '':
        return jsonify(error="statusZgloszenia_id is empty"), 400

    model = Zgloszenia()
    model.opis = opis
    model.kosztCalkowity = kosztCalkowity
    model.kategoriaZgloszenia_id = kategoriaZgloszenia_id
    model.statusZgloszenia_id = statusZgloszenia_id

    db.session.add(model)
    db.session.commit()

    return jsonify(f"{model}"), 200


@app.route('/zgloszenia/<string:id>', methods=['PUT'])
def put_zgloszenia(id):
    zgloszenia = Zgloszenia.query.get(id)
    datas = request.get_json()

    opis = datas.get('opis', '')
    if opis != '':
        zgloszenia.opis = opis
    kosztCalkowity = datas.get('kosztCalkowity', '')
    if kosztCalkowity != '':
        zgloszenia.kosztCalkowity = kosztCalkowity
    kategoriaZgloszenia_id = datas.get('kategoriaZgloszenia_id', '')
    if kategoriaZgloszenia_id != '':
        zgloszenia.kategoriaZgloszenia_id = kategoriaZgloszenia_id
    statusZgloszenia_id = datas.get('statusZgloszenia_id', '')
    if statusZgloszenia_id != '':
        zgloszenia.statusZgloszenia_id = statusZgloszenia_id

    db.session.add(zgloszenia)
    db.session.commit()

    if zgloszenia is not None:
        return jsonify(f"{zgloszenia}"), 200
    return jsonify(error="zgloszenia not updated"), 404


@app.route('/zgloszenia/<string:id>', methods=['DELETE'])
def delete_zgloszenia(id):
    zgloszenia = Zgloszenia.query.filter_by(id=id).delete()
    db.session.commit()

    return jsonify(f"zgloszenia deleted"), 200
