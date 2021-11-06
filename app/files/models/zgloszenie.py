from files import db


class Zgloszenia(db.Model):
    __tablename__ = 'zgloszenia'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    opis = db.Column(db.String(50), nullable=False)
    kosztCalkowity = db.Column(db.Float, nullable=False)
    zlecenie = db.relationship(
        "Zlecenia", backref="zgloszenie")

    kategoriaZgloszenia_id = db.Column(
        db.Integer, db.ForeignKey("kategorieZgloszen.id"))
    statusZgloszenia_id = db.Column(
        db.Integer, db.ForeignKey("statusyZgloszen.id"))
    # najemZgloszenie = db.relationship(
    #     "Najmy", secondary="NajmyZgloszenia", backref="zgloszenie")

    def __repr__(self):
        return f"{{\"id\": \"{self.id}\", \"opis\": \"{self.opis}\" , \"kosztCalkowity\": \"{self.kosztCalkowity}\"}}"

    def return_all(self):
        return f"{{\"id\": \"{self.id}\", \"opis\": \"{self.opis}\" , \"kosztCalkowity\": \"{self.kosztCalkowity}\", \"kategoriaZgloszenia\": {{\"id\": \"{self.kategoriaZgloszenia.id}\", \"nazwa\" : \"{self.kategoriaZgloszenia.nazwa}\"}}, \"statusZgloszenia\": {{\"id\": \"{self.statusZgloszenia.id}\", \"nazwa\" : \"{self.statusZgloszenia.nazwa}\"}}}}"
