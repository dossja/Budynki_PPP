from files import db


class Najmy(db.Model):
    __tablename__ = 'najmy'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    numerUmowy = db.Column(db.String(50), nullable=False)
    emailNajemcy = db.Column(db.String(50), nullable=False)
    dataPoczatku = db.Column(db.DateTime, nullable=False)
    dataZakonczona = db.Column(db.DateTime, nullable=False)
    lokal_id = db.Column(
        db.Integer, db.ForeignKey("lokale.id"))
    lokator_id = db.Column(
        db.Integer, db.ForeignKey("lokatorzy.id"))

    platnosc = db.relationship(
        "Platnosci", backref="najem")
    # najemLokator = db.relationship(
    #     "Lokatorzy", secondary="NajmyLokatorzy", backref="najem")
    # najemZgloszenie = db.relationship(
    #     "NajmyZgloszenia", backref="najem")

    # def __repr__(self):
    #     return f"{{\"id\": \"{self.id}\", \"numerUmowy\": \"{self.numerUmowy}\" , \"emailNajemcy\": \"{self.emailNajemcy}\", \"dataPoczatku\": \"{self.dataPoczatku}\", \"dataZakonczona\": \"{self.dataZakonczona}\"}}"

    def __repr__(self):
        return f"{{\"id\": \"{self.id}\", \"numerUmowy\": \"{self.numerUmowy}\" , \"emailNajemcy\": \"{self.emailNajemcy}\", \"dataPoczatku\": \"{self.dataPoczatku}\", \"dataZakonczona\": \"{self.dataZakonczona}\", \"lokal\": {{\"id\": \"{self.lokal.id}\", \"numerLokalu\": \"{self.lokal.numerLokalu}\" , \"powierzchnia\": \"{self.lokal.powierzchnia}\"}}, \"lokator\": {{\"id\": \"{self.lokator.id}\", \"imie\": \"{self.lokator.imie}\" , \"nazwisko\": \"{self.lokator.nazwisko}\", \"PESEL\": \"{self.lokator.PESEL}\"}}}}"
