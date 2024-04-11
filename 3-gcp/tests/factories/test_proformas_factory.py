import pytest
import json
import hashlib
import flask, sys, unittest,mock, json

from src.proformas.factories.proforma_factory import ProformaFactory
from src.proformas.factories.input_to_proforma_factory import InputToProformaFactory


class TestProformaFactory(unittest.TestCase):

    def test_create_proforma_factory(self):
        order_id = 1234
        user_id = 99
        fecha_hora = '20240411133200'
        url_archivo = 'ack_1234_99_2024_20240411133200.pdf'
        proforma = ProformaFactory(order_id=order_id, user_id=user_id, url_archivo=url_archivo, fecha_hora=fecha_hora)

        self.assertEqual(proforma.order_id, 1234)
        self.assertEqual(proforma.user_id, 99)
        self.assertEqual(proforma.fecha_hora, fecha_hora)
        self.assertEqual(proforma.url_archivo, url_archivo)
        self.assertEqual(proforma.status, 0)


    def test_create_input_proforma_factory(self):
        url_archivo = 'ack_1234_99_2024_20240411133200.pdf'
        proforma = InputToProformaFactory().create(url_archivo)

        self.assertEqual(proforma.order_id, 1234)
        self.assertEqual(proforma.user_id, 99)
        self.assertEqual(proforma.fecha_hora, '20240411133200')
        self.assertEqual(proforma.url_archivo, url_archivo)
        self.assertEqual(proforma.status, 0)

