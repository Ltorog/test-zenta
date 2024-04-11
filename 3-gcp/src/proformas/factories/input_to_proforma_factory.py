from src.utils.utils import log_in_out
from src.proformas.entities.proforma import Proforma

class InputRequestToProformaDto:
    
    @staticmethod
    def create(resource_name:str):
        split_resource_name = resource_name.split('_')
        split_fecha_hora = split_resource_name[3].split('.')
        return Proforma(
            order_id    =   split_resource_name[1], 
            user_id     =   split_resource_name[2], 
            fecha_hora  =   split_fecha_hora[0], 
            url_archivo =   resource_name, 
            status      =   0
        )
