from flask import render_template, url_for, flash, redirect, request, abort, jsonify
from files import app, db
from files.models.wspolnota import Wspolnoty

from .. import db, app


@app.route("/wspolnoty", methods=["GET"])
def get_wspolnoty():
    wspolnoty = Wspolnoty.query.all()

    return f"{wspolnoty}"


@app.route('/wspolnoty/<string:id>', methods=['GET'])
def get_wspolnoty_ID(id):
    wspolnoty = Wspolnoty.query.get(id)

    if wspolnoty is not None:
        return jsonify(f"{wspolnoty}"), 200
    return jsonify(error="wspolnoty not found"), 404


@app.route('/wspolnoty/<string:id>/nieruchomosci', methods=['GET'])
def get_wspolnoty_ID_nieruchomosci(id):
    wspolnoty = Wspolnoty.query.get(id)

    if wspolnoty is not None:
        return jsonify(f"{wspolnoty.return_nieruchomosci()}"), 200
    return jsonify(error="wspolnoty not found"), 404


@app.route('/wspolnoty/newest', methods=['GET'])
def get_wspolnoty_Newest():
    wspolnoty = Wspolnoty.query.order_by(Wspolnoty.id.desc()).first()

    if wspolnoty is not None:
        return jsonify(f"{wspolnoty}"), 200
    return jsonify(error="wspolnoty not found"), 404


@app.route("/wspolnoty", methods=['POST'])
def post_wspolnoty():
    datas = request.get_json()
    nazwa = datas.get('nazwa', '')
    if nazwa == '':
        return jsonify(error="nazwa is empty"), 400
    NIP = datas.get('NIP', '')
    if NIP == '':
        return jsonify(error="NIP is empty"), 400
    REGON = datas.get('REGON', '')
    if REGON == '':
        return jsonify(error="REGON is empty"), 400
    email = datas.get('email', '')
    if email == '':
        return jsonify(error="email is empty"), 400
    telefon = datas.get('telefon', '')
    if telefon == '':
        return jsonify(error="telefon is empty"), 400
    adres_id = datas.get('adres_id', '')
    if adres_id == '':
        return jsonify(error="adres_id is empty"), 400

    model = Wspolnoty()
    model.nazwa = nazwa
    model.NIP = NIP
    model.REGON = REGON
    model.email = email
    model.telefon = telefon
    model.adres_id = adres_id

    db.session.add(model)
    db.session.commit()

    return jsonify(f"{model}"), 200


@app.route('/wspolnoty/<string:id>', methods=['PUT'])
def put_wspolnoty(id):
    wspolnoty = Wspolnoty.query.get(id)
    datas = request.get_json()

    nazwa = datas.get('nazwa', '')
    if nazwa != '':
        wspolnoty.nazwa = nazwa
    NIP = datas.get('NIP', '')
    if NIP != '':
        wspolnoty.NIP = NIP
    REGON = datas.get('REGON', '')
    if REGON != '':
        wspolnoty.REGON = REGON
    email = datas.get('email', '')
    if email != '':
        wspolnoty.email = email
    telefon = datas.get('telefon', '')
    if telefon != '':
        wspolnoty.telefon = telefon
    adres_id = datas.get('adres_id', '')
    if adres_id != '':
        wspolnoty.adres_id = adres_id

    db.session.add(wspolnoty)
    db.session.commit()

    if wspolnoty is not None:
        return jsonify(f"{wspolnoty}"), 200
    return jsonify(error="wspolnoty not updated"), 404


@app.route('/wspolnoty/<string:id>', methods=['DELETE'])
def delete_wspolnoty(id):
    wspolnoty = Wspolnoty.query.filter_by(id=id).delete()
    db.session.commit()

    return jsonify(f"wspolnoty deleted"), 200
