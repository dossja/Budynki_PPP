from sqlalchemy import event, DDL
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_login import LoginManager

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@db:3306/buildings'
db = SQLAlchemy(app)

from files.models.kategoria_zgloszenia import KategorieZgloszen
from files.models.status_zgloszenia import StatusyZgloszen
from files.models.typ_platnosci import TypyPlatnosci
from files.routes import zlecenia_routes, zgloszenia_routes, firma_podwykonawcza_routes, typ_platnosci_routes, status_zgloszenia_routes, kategoria_zgloszenia_routes, adres_routes, lokal_routes, lokator_routes, najem_lokator_routes, najem_routes, najem_zgloszenie_routes, nieruchomosc_routes, platnosc_routes, wspolnota_routes

event.listen(StatusyZgloszen.__table__, 'after_create',
             DDL(""" INSERT INTO statusyZgloszen (id, nazwa) VALUES (1, 'oczekujace'), (2, 'przyjete'), (3, 'w realizacji'), (4, 'zrealizowane') """))

event.listen(KategorieZgloszen.__table__, 'after_create',
             DDL(""" INSERT INTO kategorieZgloszen (id, nazwa) VALUES (1, 'Usterka'), (2, 'Remont'), (3, 'Budynek') """))

event.listen(TypyPlatnosci.__table__, 'after_create',
             DDL(""" INSERT INTO typyPlatnosci (id, nazwa) VALUES (1, 'PayPal'), (2, 'DogeCoin'), (3, 'Przelew'), (4, 'Karta kredytowa'), (5, 'nerka') """))

db.create_all()
