
from src.proformas.entities.proforma import Proforma

class ProformasRepository():

    def __init__(self):
        self.db = None


    def get_old_proformas(self, fields):
        return self.db.getProformasByFields(fields)


    def create_proforma(self, proforma):
        return self.db.create(proforma)


    def update_proforma(self, proforma: Proforma):
        self.db.update_all(proforma)

        return True
