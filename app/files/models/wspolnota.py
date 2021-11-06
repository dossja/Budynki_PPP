from files import db


class Wspolnoty(db.Model):
    __tablename__ = 'wspolnoty'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nazwa = db.Column(db.String(50), nullable=False)
    NIP = db.Column(db.String(50), nullable=False)
    REGON = db.Column(db.String(50), nullable=True)
    email = db.Column(db.String(50), nullable=False)
    telefon = db.Column(db.String(50), nullable=False)
    adres_id = db.Column(
        db.Integer, db.ForeignKey("adresy.id"))

    nieruchomosc = db.relationship(
        "Nieruchomosci", backref="wspolnota")

    # def __repr__(self):
    #     return f"{{\"id\": \"{self.id}\", \"nazwa\": \"{self.nazwa}\" , \"NIP\": \"{self.NIP}\", \"REGON\": \"{self.REGON}\", \"email\": \"{self.email}\", \"telefon\": \"{self.telefon}\"}}"

    def __repr__(self):
        return f"{{\"id\": \"{self.id}\", \"nazwa\": \"{self.nazwa}\" , \"NIP\": \"{self.NIP}\", \"REGON\": \"{self.REGON}\", \"email\": \"{self.email}\", \"telefon\": \"{self.telefon}\", \"adres\": {{\"id\": \"{self.adres.id}\", \"miejscowosc\" : \"{self.adres.miejscowosc}\", \"numerBudynku\" : \"{self.adres.numerBudynku}\", \"ulica\" : \"{self.adres.ulica}\"}}}}"

    def return_nieruchomosci(self):
        return f"{self.nieruchomosc}"
