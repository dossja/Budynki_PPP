from flask import render_template, url_for, flash, redirect, request, abort, jsonify
from files import app, db
from files.models.typ_platnosci import TypyPlatnosci

from .. import db, app


@app.route("/typyPlatnosci", methods=["GET"])
def get_typyPlatnosci():
    typyPlatnosci = TypyPlatnosci.query.all()

    return f"{typyPlatnosci}"
