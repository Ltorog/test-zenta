import datetime

class Proforma:

    def __init__(
            self,
            order_id,
            user_id,
            fecha_hora,
            url_archivo,
            status,
            ):
        self.order_id:int           = order_id
        self.user_id:int            = user_id
        self.fecha_hora:datetime    = fecha_hora
        self.url_archivo:str        = url_archivo
        self.status:bool            = status
