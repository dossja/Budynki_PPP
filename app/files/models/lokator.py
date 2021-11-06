from files import db


class Lokatorzy(db.Model):
    __tablename__ = 'lokatorzy'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    imie = db.Column(db.String(50), nullable=False)
    nazwisko = db.Column(db.String(50), nullable=False)
    PESEL = db.Column(db.String(50), nullable=False)

    najem = db.relationship(
        "Najmy", backref="lokator")
    # najemLokator = db.relationship(
    #     "Najmy", secondary="NajmyLokatorzy", backref="lokator")

    def __repr__(self):
        return f"{{\"id\": \"{self.id}\", \"imie\": \"{self.imie}\" , \"nazwisko\": \"{self.nazwisko}\", \"PESEL\": \"{self.PESEL}\"}}"
