from src.proformas.entities.proforma import Proforma

from src.proformas.repositories.proformas_repository import ProformasRepository

class ManageProformasUsecase:
    def __init__(self, proformas_repository):
        self.proformas_repository:ProformasRepository = proformas_repository


    def update_proformas_and_create_new(self, proforma: Proforma):
        fields = {
            'order_id': proforma.order_id,
            'user_id': proforma.user_id
        }
        proformas = self.proformas_repository.get_old_proformas(fields)
        self.delete_proformas(proformas)

        proforma = self.create_proforma(proforma)
        return proforma


    def create_proforma(self, proforma: Proforma):
        self.proformas_repository.create_proforma(proforma)


    def delete_proformas(self, proformas: Proforma):
        for proforma in proformas:
            proforma.status = False
            self.delete_proforma(proforma)


    def delete_proforma(self, proforma: Proforma):
        self.proformas_repository.update_proforma(proforma)