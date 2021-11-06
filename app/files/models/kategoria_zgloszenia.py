from files import db


class KategorieZgloszen(db.Model):
    __tablename__ = 'kategorieZgloszen'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nazwa = db.Column(db.String(50), nullable=False)

    zgloszenie = db.relationship(
        "Zgloszenia", backref="kategorieZgloszen")

    def __repr__(self):
        return f"{{\"id\": \"{self.id}\", \"nazwa\": \"{self.nazwa}\"}}"
