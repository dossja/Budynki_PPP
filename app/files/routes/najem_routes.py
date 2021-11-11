from flask import render_template, url_for, flash, redirect, request, abort, jsonify
from files import app, db
from files.models.najem import Najmy

from .. import db, app


@app.route("/najmy", methods=["GET"])
def get_najmy():
    najmy = Najmy.query.all()

    return f"{najmy}"


@app.route('/najmy/<string:id>', methods=['GET'])
def get_najmy_ID(id):
    najmy = Najmy.query.get(id)

    if najmy is not None:
        return jsonify(f"{najmy}"), 200
    return jsonify(error="najmy not found"), 404


@app.route('/najmy/lokator/<string:id>', methods=['GET'])
def get_najmy_IDLokatora(id):
    najmy = Najmy.query.filter_by(lokator_id=id).all()

    if najmy is not None:
        return jsonify(f"{najmy}"), 200
    return jsonify(error="najmy not found"), 404


@app.route('/najmy/newest', methods=['GET'])
def get_najmy_Newest():
    najmy = Najmy.query.order_by(Najmy.id.desc()).first()

    if najmy is not None:
        return jsonify(f"{najmy}"), 200
    return jsonify(error="najmy not found"), 404


@app.route("/najmy", methods=['POST'])
def post_najmy():
    datas = request.get_json()

    numerUmowy = datas.get('numerUmowy', '')
    if numerUmowy == '':
        return jsonify(error="numerUmowy is empty"), 400
    emailNajemcy = datas.get('emailNajemcy', '')
    if emailNajemcy == '':
        return jsonify(error="emailNajemcy is empty"), 400
    dataPoczatku = datas.get('dataPoczatku', '')
    if dataPoczatku == '':
        return jsonify(error="dataPoczatku is empty"), 400
    dataZakonczona = datas.get('dataZakonczona', '')
    if dataZakonczona == '':
        return jsonify(error="dataZakonczona is empty"), 400
    lokal_id = datas.get('lokal_id', '')
    if lokal_id == '':
        return jsonify(error="lokal_id is empty"), 400
    lokator_id = datas.get('lokator_id', '')
    if lokator_id == '':
        return jsonify(error="lokator_id is empty"), 400

    model = Najmy()
    model.numerUmowy = numerUmowy
    model.emailNajemcy = emailNajemcy
    model.dataPoczatku = dataPoczatku
    model.dataZakonczona = dataZakonczona
    model.lokal_id = lokal_id
    model.lokator_id = lokator_id

    db.session.add(model)
    db.session.commit()

    return jsonify(f"{model}"), 200


@app.route('/najmy/<string:id>', methods=['PUT'])
def put_najmy(id):
    najmy = Najmy.query.get(id)
    datas = request.get_json()

    numerUmowy = datas.get('numerUmowy', '')
    if numerUmowy != '':
        najmy.numerUmowy = numerUmowy
    emailNajemcy = datas.get('emailNajemcy', '')
    if emailNajemcy != '':
        najmy.emailNajemcy = emailNajemcy
    dataPoczatku = datas.get('dataPoczatku', '')
    if dataPoczatku != '':
        najmy.dataPoczatku = dataPoczatku
    dataZakonczona = datas.get('dataZakonczona', '')
    if dataZakonczona != '':
        najmy.dataZakonczona = dataZakonczona
    lokal_id = datas.get('lokal_id', '')
    if lokal_id != '':
        najmy.lokal_id = lokal_id
    lokator_id = datas.get('lokator_id', '')
    if lokator_id != '':
        najmy.lokator_id = lokator_id

    db.session.add(najmy)
    db.session.commit()

    if najmy is not None:
        return jsonify(f"{najmy}"), 200
    return jsonify(error="najmy not updated"), 404


@app.route('/najmy/<string:id>', methods=['DELETE'])
def delete_najmy(id):
    najmy = Najmy.query.filter_by(id=id).delete()
    db.session.commit()

    return jsonify(f"Najmy deleted"), 200
