from files import db


class NajmyLokatorzy(db.Model):
    __tablename__ = 'najmyLokatorzy'
    lokator_id = db.Column(
        db.Integer, db.ForeignKey('lokatorzy.id'), primary_key=True)
    najem_id = db.Column(db.Integer, db.ForeignKey(
        'najmy.id'), primary_key=True)

    def __repr__(self):

        return f"{{\"lokator_id\": \"{self.lokator_id}\", \"najem_id\": \"{self.najem_id}\"}}"
