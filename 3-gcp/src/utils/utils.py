from jsonpath_ng import jsonpath, parse

DATE_FORMAT = "%Y-%m-%d %H:%M:%S"

def filter_dict(dict, fields):
    filtered_dict = {}
    for key in dict:
        if key in fields:
            filtered_dict[key] = dict[key]

    return filtered_dict

def format_date(datetime):
    return datetime.strftime(DATE_FORMAT)

def format_response(success, data, message, status_code):
    code = 'success'
    key_data = 'data'
    if not success:
        code = status_code
        key_data = 'errors'
    return {
	    'code': code,
        'message': message,
        key_data: data
    }

def format_errors_data(message):
    return {
        'code': 'error',
        'message': message
    }

def log_in_out(func):
    def decorated_func(*args, **kwargs):
        print("Ingresando a", func.__name__)
        result = func(*args, **kwargs)
        print("Saliendo de", func.__name__)
        return result
    return decorated_func

def apply_tags(payload, tags):
    if tags:
        for tag in tags:
            if not tag['origin'] or not tag['tag'] or not tag['attr'] or not tag['value']:
                raise ValueError('Error en la configuracion de los tags')
            origin = tag['origin']
            tag_value = tag['tag']
            attr = tag['attr']
            value = tag['value']
            if len(parse(f'$.{origin}').find(payload)) > 0 and parse(f'$.{origin}').find(payload)[0].value == tag_value:
                json_update_path(attr, payload, value)
    return payload

def apply_mapping(payload, order, mapping):
    new_enviame = payload

    if mapping and isinstance(mapping, dict):
        for payload_key, order_key in mapping.items():
            if order_key.find("+") == -1:
                print("PAYLOAD KEYS: ", order_key)
                payload_value = parse(f'$.{order_key}').find(order)
                print("PAYLOAD VALUE: ", payload_value)
                if len(payload_value) > 0:
                    print("VALUE OF PATH: ", payload_value[0].value)
                    payload_value = payload_value[0].value
            else:
                new_keys = order_key.split("+")
                new_value = ''
                for new_key in new_keys:
                    parse_new_value = parse(f'$.{new_key}').find(order)
                    if len(parse_new_value) > 0:
                        new_value = f"{new_value.strip()} {parse_new_value[0].value.strip()}"
                payload_value = new_value
            
            print("PAYLOAD_VALUE IN UPDATE: ", payload_value, len(payload_value) > 0)
            if isinstance(payload_value, list) is False or len(payload_value) > 0:
                new_enviame = json_update_path(payload_key, payload, payload_value)
    return new_enviame

def json_update_path(path, json, value):
    jsonpath_expr = parse(f'$.{path}')
    jsonpath_expr.find(json)
    return jsonpath_expr.update(json, value)

