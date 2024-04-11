
from src.proformas.entities.proforma import Proforma

class ProformaFactory():

    @staticmethod
    def create(order_id, user_id, fecha_hora, url_archivo, status=None):
        return Proforma(
            order_id    = order_id, 
            user_id     = user_id, 
            fecha_hora  = fecha_hora, 
            url_archivo = url_archivo, 
            status      = status if status else 0
        )