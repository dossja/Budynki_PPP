from flask import render_template, url_for, flash, redirect, request, abort, jsonify
from files import app, db
from files.models.kategoria_zgloszenia import KategorieZgloszen

from .. import db, app


@app.route("/kategorieZgloszen", methods=["GET"])
def get_kategorieZgloszen():
    kategorieZgloszen = KategorieZgloszen.query.all()

    return f"{kategorieZgloszen}"
