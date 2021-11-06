from files import db


class FirmyPodwykonawcze(db.Model):
    __tablename__ = 'firmyPodwykonawcze'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nazwa = db.Column(db.String(50), nullable=False)
    telefon = db.Column(db.String(50), nullable=False)
    usluga = db.Column(db.String(50), unique=False)

    zlecenie = db.relationship(
        "Zlecenia", backref="firmaPodwykonawcza")

    def __repr__(self):
        content = {'id': self.id, 'nazwa': self.nazwa,
                   'telefon': self.telefon, 'usluga': self.usluga}
        return f"{content}"
