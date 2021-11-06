from flask import render_template, url_for, flash, redirect, request, abort, jsonify
from files import app, db
from files.models.nieruchomosc import Nieruchomosci

from .. import db, app


@app.route("/nieruchomosci", methods=["GET"])
def get_nieruchomosci():
    nieruchomosci = Nieruchomosci.query.all()

    return f"{nieruchomosci}"


@app.route('/nieruchomosci/<string:id>', methods=['GET'])
def get_nieruchomosci_ID(id):
    nieruchomosci = Nieruchomosci.query.get(id)

    if nieruchomosci is not None:
        return jsonify(f"{nieruchomosci}"), 200
    return jsonify(error="nieruchomosci not found"), 404


@app.route('/nieruchomosci/<string:id>/lokale', methods=['GET'])
def get_nieruchomosci_ID_lokale(id):
    nieruchomosci = Nieruchomosci.query.get(id)

    if nieruchomosci is not None:
        return jsonify(f"{nieruchomosci.return_lokale()}"), 200
    return jsonify(error="adres not found"), 404


@app.route("/nieruchomosci", methods=['POST'])
def post_nieruchomosci():
    datas = request.get_json()
    cenaM2 = datas.get('cenaM2', '')
    if cenaM2 == '':
        return jsonify(error="cenaM2 is empty"), 400
    kwotaOplatyAdm = datas.get('kwotaOplatyAdm', '')
    if kwotaOplatyAdm == '':
        return jsonify(error="kwotaOplatyAdm is empty"), 400
    adres_id = datas.get('adres_id', '')
    if adres_id == '':
        return jsonify(error="adres_id is empty"), 400
    wspolnota_id = datas.get('wspolnota_id', '')
    if wspolnota_id == '':
        return jsonify(error="wspolnota_id is empty"), 400

    model = Nieruchomosci()
    model.cenaM2 = cenaM2
    model.kwotaOplatyAdm = kwotaOplatyAdm
    model.adres_id = adres_id
    model.wspolnota_id = wspolnota_id

    db.session.add(model)
    db.session.commit()

    return jsonify(f"{model}"), 200


@app.route('/nieruchomosci/<string:id>', methods=['PUT'])
def put_nieruchomosci(id):
    nieruchomosci = Nieruchomosci.query.get(id)
    datas = request.get_json()

    cenaM2 = datas.get('cenaM2', '')
    if cenaM2 != '':
        nieruchomosci.cenaM2 = cenaM2
    kwotaOplatyAdm = datas.get('kwotaOplatyAdm', '')
    if kwotaOplatyAdm != '':
        nieruchomosci.kwotaOplatyAdm = kwotaOplatyAdm
    adres_id = datas.get('adres_id', '')
    if adres_id != '':
        nieruchomosci.adres_id = adres_id
    wspolnota_id = datas.get('wspolnota_id', '')
    if wspolnota_id != '':
        nieruchomosci.wspolnota_id = wspolnota_id

    db.session.add(nieruchomosci)
    db.session.commit()

    if nieruchomosci is not None:
        return jsonify(f"{nieruchomosci}"), 200
    return jsonify(error="nieruchomosci not updated"), 404


@app.route('/nieruchomosci/<string:id>', methods=['DELETE'])
def delete_nieruchomosci(id):
    nieruchomosci = Nieruchomosci.query.filter_by(id=id).delete()
    db.session.commit()

    return jsonify(f"nieruchomosci deleted"), 200
