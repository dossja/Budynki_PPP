from files import db


class Adresy(db.Model):
    __tablename__ = 'adresy'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    miejscowosc = db.Column(db.String(50), nullable=False)
    numerBudynku = db.Column(db.String(50), nullable=False)
    ulica = db.Column(db.String(50), nullable=False)
    wspolnota = db.relationship(
        "Wspolnoty", backref="adres", uselist=False)
    nieruchomosc = db.relationship(
        "Nieruchomosci", backref="adres", uselist=False)

    def __repr__(self):
        return f"{{\"id\": \"{self.id}\", \"miejscowosc\": \"{self.miejscowosc}\" , \"numerBudynku\": \"{self.numerBudynku}\", \"ulica\": \"{self.ulica}\"}}"
