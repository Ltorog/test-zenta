from google.cloud import firestore

class Firestore:

    def __init__(self):
        self.client = firestore.Client()