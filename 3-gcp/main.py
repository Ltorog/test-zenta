import functions_framework
from cloudevents.http import CloudEvent

from flask import jsonify
from src.proformas.http.proforma_dto import ProformaDto

from src.proformas.factories.input_to_proforma_factory import InputRequestToProformaDto

from src.proformas.usecases.manage_proformas_usecase import ManageProformasUsecase
from src.frameworks.http.http_response import HttpResponse
from src.proformas.repositories.proformas_repository import ProformasRepository


proformas_repository = ProformasRepository()
manage_proformas_usecase = ManageProformasUsecase(proformas_repository)

@functions_framework.cloud_event
def init(cloud_event: CloudEvent):
    resource_name = cloud_event.data["protoPayload"]["resourceName"]
    proforma = InputRequestToProformaDto().create(resource_name)

    proforma = manage_proformas_usecase.update_proformas_and_create_new(proforma)
    proforma_dto = ProformaDto(proforma).response()

    message = 'UPDATED' 
    data = proforma_dto
    status_code = HttpResponse.OK

    response_data = {
        'message': message,
        'data': data,
        'status_code': status_code
    }

    return jsonify(response_data), status_code
