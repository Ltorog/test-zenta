import pytest
import json
import hashlib
import flask, sys, unittest,mock, json
from mockfirestore import MockFirestore

from src.utils import utils


sys.path.append("../..")

class TestUtils(unittest.TestCase): 

    def test_mapping(self):
        payload = {
            'shipping_order': {
                'imported_id': "1234",
                'order_price': 12345,
                'n_packages': 1,
                'content_description': "Producto test unitario",
                'type': "type",
                'weight': 4.3,
                'volume': 4.3,
            },
            'shipping_destination': {
                'customer': {
                    'name': "Test unitario",
                    'phone': "+569 99887766",
                    'email': "test@test.com",
                },
                'delivery_address': {
                    'home_address': {
                        'place': "Providencia",
                        'full_address': "Providencia 1234",
                        'information': "Dejar en conserjeria",
                        'zip_code': None,
                        'level1': None
                    }
                },
            },
            'shipping_origin': {
                'warehouse_code': "cod_test",
            },
            'carrier': {
                'carrier_code': '',
                'carrier_service': '',
                'tracking_number': None
            }
        }

        integration_data = {
            "custom_mapping": {
                "shipping_destination.customer.phone":"shippingInfo.shipmentDetails.address.phone"
                },
            "rule_tags": {},
            "warehouse": {"warehouse_code": "DEV"},
            "sellers": [],
            "user-id": "1234",
            "secret-wix": "secret_wix",
            "code-wix": "code auth"
        }

        payload = utils.apply_mapping(payload, None, integration_data['custom_mapping'])
        print("MAPPING DATA: ", payload["shipping_destination"]["customer"]['phone'])

        self.assertEqual(payload["shipping_destination"]["customer"]['phone'], "+569 99887766")



    def test_tags(self):
        pass