from flask import render_template, url_for, flash, redirect, request, abort, jsonify
from files import app, db
from files.models.status_zgloszenia import StatusyZgloszen

from .. import db, app


@app.route("/statusyZgloszen", methods=["GET"])
def get_statusyZgloszen():
    statusyZgloszen = StatusyZgloszen.query.all()

    return f"{statusyZgloszen}"
