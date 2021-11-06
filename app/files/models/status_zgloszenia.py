from files import db


class StatusyZgloszen(db.Model):
    __tablename__ = 'statusyZgloszen'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nazwa = db.Column(db.String(50), nullable=False)

    zgloszenia = db.relationship(
        "Zgloszenia", backref="statusyZgloszen")

    def __repr__(self):

        return f"{{\"id\": \"{self.id}\", \"nazwa\": \"{self.nazwa}\"}}"
