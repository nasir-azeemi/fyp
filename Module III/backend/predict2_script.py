# To add a new cell, type '# %%'
# To add a new markdown cell, type '# %% [markdown]'
# %%
import pandas as pd
import numpy as np
import tensorflow as tf
from keras.models import load_model
import ast
pd.set_option("display.max_rows", 500, "display.max_columns", 500)


import sys

# %%
traits = ["Openness", "Agreeableness", "Persistence", "Cooperativeness", "Openness to Experience", "Adjustment", "Ambition", "Learning Approach"]

f = open("CorrelatedQs.txt", "r")
questions_dict = f.readline()
questions_dict = ast.literal_eval(questions_dict)

tp = pd.read_excel(f"{sys.argv[1]}.xlsx")
# tp = tp = pd.read_excel("temp1.xlsx")
# tp = pd.read_csv('questions.csv')

final_arr = []
# %%
trait = "Openness"

model_Openness = tf.keras.models.load_model(trait + '.h5')

selected_df = tp[questions_dict[trait]]
x = selected_df.to_numpy()

y_pred_Openness = model_Openness.predict(x)

# y_pred_Openness
# f = open(f"{str(sys.argv[1])}_Openness.txt", "w")
final_arr.append(str(y_pred_Openness[0][0]))
# f.close()



# %%
trait = "Cooperativeness"

model_Cooperativeness = tf.keras.models.load_model(trait + '.h5')

selected_df = tp[questions_dict[trait]]
x = selected_df.to_numpy()

y_pred_Cooperativeness = model_Cooperativeness.predict(x)

# y_pred_Cooperativeness
# f = open(f"{str(sys.argv[1])}_Cooperativeness.txt", "w")
final_arr.append(str(y_pred_Cooperativeness[0][0]))
# f.close()

# %%
trait = "Adjustment"

model_Adjustment = tf.keras.models.load_model(trait + '.h5')

selected_df = tp[questions_dict[trait]]
x = selected_df.to_numpy()

y_pred_Adjustment = model_Adjustment.predict(x)

# y_pred_Adjustment
# f = open(f"{str(sys.argv[1])}_Adjustment.txt", "w")
final_arr.append(str(y_pred_Adjustment[0][0]))
# f.close()

# %%
trait = "Persistence"

model_Persistence = tf.keras.models.load_model(trait + '.h5')

selected_df = tp[questions_dict[trait]]
x = selected_df.to_numpy()

y_pred_Persistence = model_Persistence.predict(x)

# y_pred_Persistence
# f = open(f"{str(sys.argv[1])}_Persistence.txt", "w")
final_arr.append(str(y_pred_Persistence[0][0]))
# f.close()


# %%
trait = "Agreeableness"

model_Agreeableness = tf.keras.models.load_model(trait + '.h5')

selected_df = tp[questions_dict[trait]]
x = selected_df.to_numpy()

y_pred_Agreeableness = model_Agreeableness.predict(x)

# y_pred_Agreeableness
# # f = open(f"{str(sys.argv[1])}_Agreeableness.txt", "w")
final_arr.append(str(y_pred_Agreeableness[0][0]))
# # f.close()


# %%
trait = "Ambition"

model_Ambition = tf.keras.models.load_model(trait + '.h5')

selected_df = tp[questions_dict[trait]]
x = selected_df.to_numpy()

y_pred_Ambition = model_Ambition.predict(x)

# y_pred_Ambition
# f = open(f"{str(sys.argv[1])}_Ambition.txt", "w")
final_arr.append(str(y_pred_Ambition[0][0]))
# f.close()

# %%
trait = "Openness to Experience"

model_Openness_to_Experience = tf.keras.models.load_model(trait + '.h5')

selected_df = tp[questions_dict[trait]]
x = selected_df.to_numpy()

y_pred_Openness_to_Experience = model_Openness_to_Experience.predict(x)

# y_pred_Openness_to_Experience
# f = open(f"{str(sys.argv[1])}_Openness_to_Experience.txt", "w")
final_arr.append(str(y_pred_Openness_to_Experience[0][0]))
# f.close()


# %%
trait = "Learning Approach"

model_Learning_Approach = tf.keras.models.load_model(trait + '.h5')

selected_df = tp[questions_dict[trait]]
x = selected_df.to_numpy()

y_pred_Learning_Approach = model_Learning_Approach.predict(x)

# y_pred_Learning_Approach
# f = open(f"{str(sys.argv[1])}_Learning_Approach.txt", "w")
final_arr.append(str(y_pred_Learning_Approach[0][0]))
# f.close()

import math

def my_round(i):
    f = math.floor(i)
    return f if i - f < 0.5 else f+1

for i in range(len(final_arr)):
    final_arr[i] = str( my_round(float(final_arr[i])) )

f = open(f"{str(sys.argv[1])}_2.txt", "w")
f.write("\n".join(final_arr))
f.close()
