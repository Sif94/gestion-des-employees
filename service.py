# -*- coding: utf-8 -*-
"""
Created on Sat Jan  6 19:38:19 2024

@author: Sifeddine
"""

#the script to run the server: 
#!bentoml serve service.py:svc --reload
import numpy as np
import bentoml
from bentoml.io import NumpyNdarray
 
modele_arbre_decision_runner = bentoml.sklearn.get("modele_arbre_decision:latest").to_runner()
 
svc = bentoml.Service("modele_arbre_decision", runners=[modele_arbre_decision_runner])
 
@svc.api(input=NumpyNdarray(), output=NumpyNdarray())
def classify(input_series: np.ndarray) -> np.ndarray:
    return modele_arbre_decision_runner.predict.run(input_series)