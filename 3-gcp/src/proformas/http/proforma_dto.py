from src.utils.utils import log_in_out

from src.proformas.entities.proforma import Proforma

class ProformaDto:
    def __init__(self, proforma):
        self.proforma:Proforma = proforma

    @log_in_out
    def response(self):
        return {
            'data': {
                'order_id'      : self.proforma.order_id,
                'user_id'       : self.proforma.user_id,
                'fecha_hora'    : self.proforma.fecha_hora,
                'url_archivo'   : self.proforma.url_archivo,
                'status'        : self.proforma.status
            }
        }
