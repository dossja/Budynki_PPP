from files import db


class Zlecenia(db.Model):
    __tablename__ = 'zlecenia'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    koszt = db.Column(db.Float, nullable=False)
    terminWykonania = db.Column(db.DateTime, nullable=False)
    dataWykonania = db.Column(db.DateTime, nullable=False)
    zgloszenie_id = db.Column(
        db.Integer, db.ForeignKey("zgloszenia.id"))
    firmaPodwykonawcza_id = db.Column(
        db.Integer, db.ForeignKey("firmyPodwykonawcze.id"))

    def __repr__(self):

        return f"{{\"id\": \"{self.id}\", \"koszt\": \"{self.koszt}\", \"terminWykonania\": \"{self.terminWykonania}\", \"dataWykonania\": \"{self.dataWykonania}\"}}"

    def return_all(self):
        return f"{{\"id\": \"{self.id}\", \"koszt\": \"{self.koszt}\", \"terminWykonania\": \"{self.terminWykonania}\", \"dataWykonania\": \"{self.dataWykonania}\", \"zgloszenie\": {{\"id\": \"{self.zgloszenie.id}\", \"opis\": \"{self.zgloszenie.opis}\"}} , \"firmaPodwykonawcza\": {{\"id\": \"{self.firmaPodwykonawcza.id}\", \"nazwa\": \"{self.firmaPodwykonawcza.nazwa}\", \"telefon\": \"{self.firmaPodwykonawcza.telefon}\", \"usluga\": \"{self.firmaPodwykonawcza.usluga}\"}}}}"
