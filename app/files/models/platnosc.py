from files import db


class Platnosci(db.Model):
    __tablename__ = 'platnosci'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    kwota = db.Column(db.Float, nullable=False)
    terminPlatnosci = db.Column(db.DateTime, nullable=False)
    dataPlatnosci = db.Column(db.DateTime, nullable=False)
    typPlatnosci_id = db.Column(
        db.Integer, db.ForeignKey("typyPlatnosci.id"))
    najem_id = db.Column(
        db.Integer, db.ForeignKey("najmy.id"))

    # def __repr__(self):
    #     return f"{{\"id\": \"{self.id}\", \"kwota\": \"{self.kwota}\" , \"terminPlatnosci\": \"{self.terminPlatnosci}\", \"dataPlatnosci\": \"{self.dataPlatnosci}\"}}"

    def __repr__(self):
        return f"{{\"id\": \"{self.id}\", \"kwota\": \"{self.kwota}\" , \"terminPlatnosci\": \"{self.terminPlatnosci}\", \"dataPlatnosci\": \"{self.dataPlatnosci}\", \"typPlatnosci\": {{\"id\": \"{self.typPlatnosci.id}\", \"nazwa\" : \"{self.typPlatnosci.nazwa}\"}}, \"najem\": {{\"id\": \"{self.najem.id}\", \"numerUmowy\" : \"{self.najem.numerUmowy}\", \"emailNajemcy\" : \"{self.najem.emailNajemcy}\"}}}}"
