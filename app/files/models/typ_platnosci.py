from files import db


class TypyPlatnosci(db.Model):
    __tablename__ = 'typyPlatnosci'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nazwa = db.Column(db.String(50), nullable=False)

    platnosci = db.relationship(
        "Platnosci", backref="typPlatnosci")

    def __repr__(self):
        return f"{{\"id\": \"{self.id}\", \"nazwa\": \"{self.nazwa}\"}}"
