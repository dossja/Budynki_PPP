from flask import render_template, url_for, flash, redirect, request, abort, jsonify
from files import app, db
from files.models.firma_podwykonawcza import FirmyPodwykonawcze

from .. import db, app


@app.route("/firmyPodwykonawcze", methods=["GET"])
def get_firmyPodwykonawcze():
    firmyPodwykonawcze = FirmyPodwykonawcze.query.all()

    return f"{firmyPodwykonawcze}"


@app.route('/firmyPodwykonawcze/<string:id>', methods=['GET'])
def get_firmyPodwykonawcze_ID(id):
    firmyPodwykonawcze = FirmyPodwykonawcze.query.get(id)

    if firmyPodwykonawcze is not None:
        return jsonify(f"{firmyPodwykonawcze}"), 200
    return jsonify(error="firmyPodwykonawcze not found"), 404


@app.route('/firmyPodwykonawcze/newest', methods=['GET'])
def get_firmyPodwykonawcze_Newest():
    firmyPodwykonawcze = FirmyPodwykonawcze.query.order_by(FirmyPodwykonawcze.id.desc()).first()

    if firmyPodwykonawcze is not None:
        return jsonify(f"{firmyPodwykonawcze}"), 200
    return jsonify(error="firmyPodwykonawcze not found"), 404

@app.route('/firmyPodwykonawcze/newestId', methods=['GET'])
def get_firmyPodwykonawcze_NewestId():
    firmyPodwykonawcze = FirmyPodwykonawcze.query.order_by(FirmyPodwykonawcze.id.desc()).first()
    datas = firmyPodwykonawcze.id
    if firmyPodwykonawcze is not None:
        return jsonify(f"{datas}"), 200
    return jsonify(error="firmyPodwykonawcze not found"), 404



@app.route("/firmyPodwykonawcze", methods=['POST'])
def post_firmyPodwykonawcze():
    datas = request.get_json()
    nazwa = datas.get('nazwa', '')
    if nazwa == '':
        return jsonify(error="nazwa is empty"), 400
    telefon = datas.get('telefon', '')
    if telefon == '':
        return jsonify(error="telefon is empty"), 400
    usluga = datas.get('usluga', '')
    if usluga == '':
        return jsonify(error="usluga is empty"), 400

    model = FirmyPodwykonawcze()
    model.nazwa = nazwa
    model.telefon = telefon
    model.usluga = usluga

    db.session.add(model)
    db.session.commit()

    return jsonify(f"{model}"), 200


@app.route('/firmyPodwykonawcze/<string:id>', methods=['PUT'])
def put_firmyPodwykonawcze(id):
    firmyPodwykonawcze = FirmyPodwykonawcze.query.get(id)
    datas = request.get_json()

    telefon = datas.get('telefon', '')
    if telefon != '':
        firmyPodwykonawcze.telefon = telefon
    nazwa = datas.get('nazwa', '')
    if nazwa != '':
        firmyPodwykonawcze.nazwa = nazwa
    usluga = datas.get('usluga', '')
    if usluga != '':
        firmyPodwykonawcze.usluga = usluga

    db.session.add(firmyPodwykonawcze)
    db.session.commit()

    if firmyPodwykonawcze is not None:
        return jsonify(f"{firmyPodwykonawcze}"), 200
    return jsonify(error="firmyPodwykonawcze not updated"), 404


@app.route('/firmyPodwykonawcze/<string:id>', methods=['DELETE'])
def delete_firmyPodwykonawcze(id):
    firmyPodwykonawcze = FirmyPodwykonawcze.query.filter_by(id=id).delete()
    db.session.commit()

    return jsonify(f"firmyPodwykonawcze deleted"), 200
