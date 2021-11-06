from files import db


class NajmyZgloszenia(db.Model):
    __tablename__ = 'najmyZgloszenia'
    zgloszenie_id = db.Column(
        db.Integer, db.ForeignKey('zgloszenia.id'), primary_key=True)
    # zgloszenie = db.relationship("Zgloszenia", foreign_keys=zgloszenie_id)
    najem_id = db.Column(db.Integer, db.ForeignKey(
        'najmy.id'), primary_key=True)
    # najem = db.relationship("Najmy", foreign_keys=najem_id)

    def __repr__(self):

        return f"{{\"zgloszenie_id\": \"{self.zgloszenie_id}\", \"najem_id\": \"{self.najem_id}\"}}"
