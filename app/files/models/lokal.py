from files import db


class Lokale(db.Model):
    __tablename__ = 'lokale'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    numerLokalu = db.Column(db.Float, nullable=False)
    powierzchnia = db.Column(db.Float, nullable=False)
    nieruchomosc_id = db.Column(
        db.Integer, db.ForeignKey("nieruchomosci.id"))

    najem = db.relationship(
        "Najmy", backref="lokal")

    def __repr__(self):
        return f"{{\"id\": \"{self.id}\", \"numerLokalu\": \"{self.numerLokalu}\" , \"powierzchnia\": \"{self.powierzchnia}\"}}"

    def return_all(self):
        return f"{{\"id\": \"{self.id}\", \"numerLokalu\": \"{self.numerLokalu}\" , \"powierzchnia\": \"{self.powierzchnia}\", \"nieruchomosc\": {{\"id\": \"{self.nieruchomosc.id}\", \"cenaM2\": \"{self.nieruchomosc.cenaM2}\" , \"kwotaOplatyAdm\": \"{self.nieruchomosc.kwotaOplatyAdm}\"}}}}"
