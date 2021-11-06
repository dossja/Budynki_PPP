from files import db


class Nieruchomosci(db.Model):
    __tablename__ = 'nieruchomosci'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    cenaM2 = db.Column(db.Float, nullable=False)
    kwotaOplatyAdm = db.Column(db.Float, nullable=False)
    adres_id = db.Column(
        db.Integer, db.ForeignKey("adresy.id"))
    wspolnota_id = db.Column(
        db.Integer, db.ForeignKey("wspolnoty.id"))

    lokal = db.relationship(
        "Lokale", backref="nieruchomosc")

    # def __repr__(self):
    #     return f"{{\"id\": \"{self.id}\", \"cenaM2\": \"{self.cenaM2}\" , \"kwotaOplatyAdm\": \"{self.kwotaOplatyAdm}\"}}"

    def __repr__(self):
        return f"{{\"id\": \"{self.id}\", \"cenaM2\": \"{self.cenaM2}\" , \"kwotaOplatyAdm\": \"{self.kwotaOplatyAdm}\", \"adres\": {{\"id\": \"{self.adres.id}\", \"miejscowosc\" : \"{self.adres.miejscowosc}\", \"numerBudynku\" : \"{self.adres.numerBudynku}\", \"ulica\" : \"{self.adres.ulica}\"}}, \"wspolnota\": {{\"id\": \"{self.wspolnota.id}\", \"nazwa\": \"{self.wspolnota.nazwa}\" , \"NIP\": \"{self.wspolnota.NIP}\", \"REGON\": \"{self.wspolnota.REGON}\", \"email\": \"{self.wspolnota.email}\", \"telefon\": \"{self.wspolnota.telefon}\"}}}}"

    def return_lokale(self):
        return f"{ self.lokal }"
