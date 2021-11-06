from flask import render_template, url_for, flash, redirect, request, abort, jsonify
from files import app, db
from files.models.platnosc import Platnosci

from .. import db, app


@app.route("/platnosci", methods=["GET"])
def get_Platnosci():
    platnosci = Platnosci.query.all()

    return f"{platnosci}"


@app.route('/platnosci/<string:id>', methods=['GET'])
def get_platnosci_ID(id):
    platnosci = Platnosci.query.get(id)

    if platnosci is not None:
        return jsonify(f"{platnosci}"), 200
    return jsonify(error="platnosci not found"), 404


@app.route('/platnosci/newest', methods=['GET'])
def get_platnosci_Newest():
    platnosci = Platnosci.query.order_by(Platnosci.id.desc()).first()

    if platnosci is not None:
        return jsonify(f"{platnosci}"), 200
    return jsonify(error="platnosci not found"), 404


@app.route("/platnosci", methods=['POST'])
def post_platnosci():
    datas = request.get_json()

    kwota = datas.get('kwota', '')
    if kwota == '':
        return jsonify(error="kwota is empty"), 400
    terminPlatnosci = datas.get('terminPlatnosci', '')
    if terminPlatnosci == '':
        return jsonify(error="terminPlatnosci is empty"), 400
    dataPlatnosci = datas.get('dataPlatnosci', '')
    if dataPlatnosci == '':
        return jsonify(error="dataPlatnosci is empty"), 400
    typPlatnosci_id = datas.get('typPlatnosci_id', '')
    if typPlatnosci_id == '':
        return jsonify(error="typPlatnosci_id is empty"), 400
    najem_id = datas.get('najem_id', '')
    if najem_id == '':
        return jsonify(error="najem_id is empty"), 400

    model = Platnosci()
    model.kwota = kwota
    model.terminPlatnosci = terminPlatnosci
    model.dataPlatnosci = dataPlatnosci
    model.typPlatnosci_id = typPlatnosci_id
    model.najem_id = najem_id

    db.session.add(model)
    db.session.commit()

    return jsonify(f"{model}"), 200


@app.route('/platnosci/<string:id>', methods=['PUT'])
def put_platnosci(id):
    platnosci = Platnosci.query.get(id)
    datas = request.get_json()

    kwota = datas.get('kwota', '')
    if kwota != '':
        platnosci.kwota = kwota
    terminPlatnosci = datas.get('terminPlatnosci', '')
    if terminPlatnosci != '':
        platnosci.terminPlatnosci = terminPlatnosci
    dataPlatnosci = datas.get('dataPlatnosci', '')
    if dataPlatnosci != '':
        platnosci.dataPlatnosci = dataPlatnosci
    typPlatnosci_id = datas.get('typPlatnosci_id', '')
    if typPlatnosci_id != '':
        platnosci.typPlatnosci_id = typPlatnosci_id
    najem_id = datas.get('najem_id', '')
    if najem_id != '':
        platnosci.najem_id = najem_id

    db.session.add(platnosci)
    db.session.commit()

    if platnosci is not None:
        return jsonify(f"{platnosci}"), 200
    return jsonify(error="platnosci not updated"), 404


@app.route('/platnosci/<string:id>', methods=['DELETE'])
def delete_platnosci(id):
    platnosci = Platnosci.query.filter_by(id=id).delete()
    db.session.commit()

    return jsonify(f"platnosci deleted"), 200
