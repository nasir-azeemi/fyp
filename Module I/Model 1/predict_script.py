# To add a new cell, type '# %%'
# To add a new markdown cell, type '# %% [markdown]'
# %%

import sys

# print(sys.argv[1])

import pandas as pd
import numpy as np
pd.set_option("display.max_rows", 500, "display.max_columns", 500)


# %%
import tensorflow as tf
from tensorflow import keras
from keras.models import Sequential, save_model, load_model
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.utils import to_categorical


# %%
data = pd.read_csv('data.csv', sep=";", low_memory=False)
y = data['psychotype'].to_numpy()


# %%
# Encoding categorical data
label_encoder = LabelEncoder()
y = label_encoder.fit_transform(y)
y = to_categorical(y)


# %%
model = tf.keras.models.load_model('Model_1' + '.h5')

new_filename = str(sys.argv[1]) + ".xlsx"

tp = pd.read_excel(new_filename, index_col=None, header=None)

# tp = pd.read_excel("temp.xlsx", index_col=None, header=None)

col = tp.columns
col = col[:142]
x_new = tp[col]

print(x_new)


# %%
y_new = model.predict(x_new)


# %%
y_new_labels = label_encoder.inverse_transform(np.argmax(y_new, axis=1))
print(y_new_labels)

f = open(f"{str(sys.argv[1])}.txt", "w")
f.write(y_new_labels[0])
f.close()

