# UPDATE PROFORMAS

### Descripción 

Se decidió usar la función `providers/cloud.storage/eventTypes/object.google.cloud.storage.object.v1.finalized` debido a que siempre cambiará el nombre del archivo
en storage, debido a que se guarda según la fecha y no se menciona que se actualiza el mismo. Es por esto, que la mejor opción es utilizar el evento ya mencionado
para que cuando se creen, se busquen las demás proformas que tengan el mismo order_id, user_id pero diferente fecha_hora y bloquearlas con el status = 2 y crear
una nueva proforma con el status = 0
