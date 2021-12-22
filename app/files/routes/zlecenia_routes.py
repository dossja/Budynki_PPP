from flask import render_template, url_for, flash, redirect, request, abort, jsonify
from files import app, db
from files.models.zlecenie import Zlecenia

from .. import db, app


@app.route("/zlecenia", methods=["GET"])
def get_zlecenia():
    zlecenia = Zlecenia.query.all()

    return f"{zlecenia}"

@app.route('/zlecenia/zgloszenia/<string:id>', methods=['GET'])
def get_zlecenia_Zgloszenia(id):
    zlecenia = Zlecenia.query.filter_by(zgloszenie_id=id).all()

    if zlecenia is not None:
        return jsonify(f"{zlecenia}"), 200
    return jsonify(error="zlecenia not found"), 404


@app.route('/zlecenia/<string:id>', methods=['GET'])
def get_zlecenia_ID(id):
    zlecenia = Zlecenia.query.get(id)

    if zlecenia is not None:
        return jsonify(f"{zlecenia}"), 200
    return jsonify(error="zlecenia not found"), 404


@app.route('/zlecenia/newest', methods=['GET'])
def get_zlecenia_Newest():
    zlecenia = Zlecenia.query.order_by(Zlecenia.id.desc()).first()

    if zlecenia is not None:
        return jsonify(f"{zlecenia}"), 200
    return jsonify(error="zlecenia not found"), 404


@app.route("/zlecenia", methods=['POST'])
def post_zlecenia():
    datas = request.get_json()
    koszt = datas.get('koszt', '')
    if koszt == '':
        return jsonify(error="koszt is empty"), 400
    terminWykonania = datas.get('terminWykonania', '')
    if terminWykonania == '':
        return jsonify(error="terminWykonania is empty"), 400
    dataWykonania = datas.get('dataWykonania', '')
    if dataWykonania == '':
        return jsonify(error="dataWykonania is empty"), 400
    zgloszenie_id = datas.get('zgloszenie_id', '')
    if zgloszenie_id == '':
        return jsonify(error="zgloszenie_id is empty"), 400
    firmaPodwykonawcza_id = datas.get('firmaPodwykonawcza_id', '')
    if firmaPodwykonawcza_id == '':
        return jsonify(error="firmaPodwykonawcza_id is empty"), 400

    model = Zlecenia()
    model.koszt = koszt
    model.terminWykonania = terminWykonania
    model.dataWykonania = dataWykonania
    model.zgloszenie_id = zgloszenie_id
    model.firmaPodwykonawcza_id = firmaPodwykonawcza_id

    db.session.add(model)
    db.session.commit()

    return jsonify(f"{model}"), 200


@app.route('/zlecenia/<string:id>', methods=['PUT'])
def put_zlecenia(id):
    zlecenia = Zlecenia.query.get(id)
    datas = request.get_json()

    koszt = datas.get('koszt', '')
    if koszt != '':
        zlecenia.koszt = koszt
    terminWykonania = datas.get('terminWykonania', '')
    if terminWykonania == '':
        zlecenia.terminWykonania = terminWykonania
    dataWykonania = datas.get('dataWykonania', '')
    if dataWykonania == '':
        zlecenia.dataWykonania = dataWykonania
    zgloszenie_id = datas.get('zgloszenie_id', '')
    if zgloszenie_id == '':
        zlecenia.zgloszenie_id = zgloszenie_id
    firmaPodwykonawcza_id = datas.get('firmaPodwykonawcza_id', '')
    if firmaPodwykonawcza_id == '':
        zlecenia.firmaPodwykonawcza_id = firmaPodwykonawcza_id

    db.session.add(zlecenia)
    db.session.commit()

    if zlecenia is not None:
        return jsonify(f"{zlecenia}"), 200
    return jsonify(error="zlecenia not updated"), 404


@app.route('/zlecenia/<string:id>', methods=['DELETE'])
def delete_zlecenia(id):
    zlecenia = Zlecenia.query.filter_by(id=id).delete()
    db.session.commit()

    return jsonify(f"zlecenia deleted"), 200
