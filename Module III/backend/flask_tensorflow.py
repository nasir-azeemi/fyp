from json import dumps
from flask import Flask, make_response, request

import math

import pandas as pd
import numpy as np

import tensorflow as tf
from tensorflow import keras
from keras.models import Sequential, save_model, load_model
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.utils import to_categorical

import ast


import os
import io
import cv2
import base64 
import numpy as np
from PIL import Image


counter = 1

app = Flask(__name__)

@app.route('/ass2', methods=['POST'])
def personality_type():

    req = request.get_json()
    req = req["data"]

    data = pd.read_csv('data.csv', sep=";", low_memory=False)
    y = data['psychotype'].to_numpy()

    # Encoding categorical data
    label_encoder = LabelEncoder()
    y = label_encoder.fit_transform(y)
    y = to_categorical(y)

    model = tf.keras.models.load_model('Model_1' + '.h5')

    # tp = pd.read_excel('temp.xlsx', index_col=None, header=None)

    # col = tp.columns
    # col = col[:142]
    # x_new = tp[col]
    
    x_new = []
    for i in range(1, len(req)-1):
        x_new.append(int(req[str(i)])-1)
    
    # x_new = np.array([1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1])
    x_new = np.reshape(np.array(x_new), (1, len(x_new)))
    # print(x_new.shape)
    y_new = model.predict(x_new)

    y_new_labels = label_encoder.inverse_transform(np.argmax(y_new, axis=1))
    print(y_new_labels)
    
    # print(request.get_json())
    return make_response(dumps(y_new_labels.tolist()))



@app.route('/ass1', methods=['POST'])
def personality_trait_score():

    req = request.get_json()
    req = req["data"]

    
    x_new = {}
    for i in range(1, len(req)-1):
        x_new["Q"+str(i)+"A"] = int(req[str(i)])
    


    # x_neww = [5, 2, 1, 2, 5, 2, 4, 4, 2, 4, 2, 4, 6, 3, 1, 6, 2, 1, 4, 1, 7, 1, 4, 5, 2, 2, 5, 2, 3, 7, 7, 2, 2, 4, 2, 1, 7, 1, 3, 2, 7, 6, 2, 2, 6, 2, 6, 4, 5, 3, 3, 2, 2, 2, 2, 4, 5, 3, 3, 4, 6, 4, 6, 3, 2, 2, 7, 2, 2, 4, 4, 5, 1, 2, 2, 4, 6, 2, 6, 3, 5, 2, 3, 6, 7, 2, 4, 1, 2, 2, 5, 2, 6, 2, 6, 7, 2, 2, 1, 4, 2, 7, 6, 6, 2, 2, 6, 2, 7, 1, 3, 6, 7, 2, 7, 3, 4, 2, 2, 1, 6, 6, 2, 1, 3, 6, 2, 2, 6, 2, 6, 5, 2, 5, 6, 2, 2, 2, 2, 6, 5, 7, 6, 3, 6, 2, 3, 3, 2, 1, 2, 6, 1, 2, 6, 4, 1, 4, 6, 6, 4, 4, 2, 1, 2, 3, 4, 7, 2, 1, 7, 2, 4, 2, 6, 7, 6, 1, 1, 3, 4]    
    
    # for i in range(len(x_neww)):
    #     x_new["Q"+str(i+1)+"A"] = x_neww[i]

    tp = pd.DataFrame([x_new])
    print(tp.shape)
    
    traits = ["Openness", "Agreeableness", "Persistence", "Cooperativeness", "Openness to Experience", "Adjustment", "Ambition", "Learning Approach"]

    f = open("CorrelatedQs.txt", "r")
    questions_dict = f.readline()
    questions_dict = ast.literal_eval(questions_dict)


    final_arr = []


    trait = "Openness"

    model_Openness = tf.keras.models.load_model(trait + '.h5')

    selected_df = tp[questions_dict[trait]]
    x = selected_df.to_numpy()

    y_pred_Openness = model_Openness.predict(x)

    final_arr.append(str(y_pred_Openness[0][0]))


    trait = "Cooperativeness"

    model_Cooperativeness = tf.keras.models.load_model(trait + '.h5')

    selected_df = tp[questions_dict[trait]]
    x = selected_df.to_numpy()

    y_pred_Cooperativeness = model_Cooperativeness.predict(x)

    final_arr.append(str(y_pred_Cooperativeness[0][0]))


    trait = "Adjustment"

    model_Adjustment = tf.keras.models.load_model(trait + '.h5')

    selected_df = tp[questions_dict[trait]]
    x = selected_df.to_numpy()

    y_pred_Adjustment = model_Adjustment.predict(x)

    final_arr.append(str(y_pred_Adjustment[0][0]))


    trait = "Persistence"

    model_Persistence = tf.keras.models.load_model(trait + '.h5')

    selected_df = tp[questions_dict[trait]]
    x = selected_df.to_numpy()

    y_pred_Persistence = model_Persistence.predict(x)

    final_arr.append(str(y_pred_Persistence[0][0]))
    

    trait = "Agreeableness"

    model_Agreeableness = tf.keras.models.load_model(trait + '.h5')

    selected_df = tp[questions_dict[trait]]
    x = selected_df.to_numpy()

    y_pred_Agreeableness = model_Agreeableness.predict(x)

    final_arr.append(str(y_pred_Agreeableness[0][0]))


    trait = "Ambition"

    model_Ambition = tf.keras.models.load_model(trait + '.h5')

    selected_df = tp[questions_dict[trait]]
    x = selected_df.to_numpy()

    y_pred_Ambition = model_Ambition.predict(x)

    final_arr.append(str(y_pred_Ambition[0][0]))


    trait = "Openness to Experience"

    model_Openness_to_Experience = tf.keras.models.load_model(trait + '.h5')

    selected_df = tp[questions_dict[trait]]
    x = selected_df.to_numpy()

    y_pred_Openness_to_Experience = model_Openness_to_Experience.predict(x)

    final_arr.append(str(y_pred_Openness_to_Experience[0][0]))


    trait = "Learning Approach"

    model_Learning_Approach = tf.keras.models.load_model(trait + '.h5')

    selected_df = tp[questions_dict[trait]]
    x = selected_df.to_numpy()

    y_pred_Learning_Approach = model_Learning_Approach.predict(x)

    final_arr.append(str(y_pred_Learning_Approach[0][0]))


    def my_round(i):
        f = math.floor(i)
        return f if i - f < 0.5 else f+1


    for i in range(len(final_arr)):
        final_arr[i] = str( my_round(float(final_arr[i])) )

        
    # print(final_arr)

    return make_response(dumps(final_arr))
    

@app.route('/emotion_recog', methods=['POST'])
def emotion_recog():

    req = request.get_json()
    req = req["data"]

    # print(req["image"][req["image"].find(",")+1:50])

    
    model = load_model('emotion_recog.h5')
    y = ['Anger', 'Contempt', 'Disgust', 'Fear', 'Happiness', 'Neutral', 'Sadness', 'Surprise']

    frame_data = base64.b64decode(req["image"][req["image"].find(",")+1:])
    frame = Image.open(io.BytesIO(frame_data))

    # Encoding categorical data
    label_encoder = LabelEncoder()
    y = label_encoder.fit_transform(y)
    y = to_categorical(y)


    frame = cv2.cvtColor(np.array(frame), cv2.COLOR_BGR2RGB)
    
    # img.show()

    frame = cv2.flip(frame,1,1) 
    gray = cv2.cvtColor(frame, cv2.COLOR_RGB2GRAY)

    cascPath = os.path.dirname(cv2.__file__) + "/data/haarcascade_frontalface_alt2.xml"
    faceCascade = cv2.CascadeClassifier(cascPath)

    faces = faceCascade.detectMultiScale(gray,
                                        scaleFactor=1.1,
                                        minNeighbors=5,
                                        minSize=(48, 48),
                                        flags=cv2.CASCADE_SCALE_IMAGE)

    for (x,y,w,h) in faces:
        #extract face and send to model
        face_image = gray[y:y+h, x:x+w]
        face_image_48by48 = cv2.resize(face_image, (48,48), interpolation=cv2.INTER_AREA)
        model_input_image = np.reshape(face_image_48by48,[1,48,48,1])
        y_new = model.predict(model_input_image)
        y_new_labels = label_encoder.inverse_transform(np.argmax(y_new, axis=1))
        
        # draw rectangle + label
        # cv2.rectangle(frame, (x, y), (x + w, y + h),(0,255,0), 2)
        # cv2.putText(frame, y_new_labels[0], (x, y+h+1),cv2.FONT_HERSHEY_SIMPLEX,0.8,(255,255,255),2)


    # cv2.imshow('image window', frame)

    # cv2.waitKey(0)

    cv2.destroyAllWindows()

    return make_response(dumps(y_new_labels[0]))


@app.route('/batch_emotion_recog', methods=['POST'])
def batch_emotion_recog():

    global counter

    req = request.get_json()
    req = req["images"]

    # print(req["image"][req["image"].find(",")+1:50])

    
    model = load_model('emotion_recog.h5')
    y = ['Anger', 'Contempt', 'Disgust', 'Fear', 'Happiness', 'Neutral', 'Sadness', 'Surprise']
    
    # Encoding categorical data
    label_encoder = LabelEncoder()
    y = label_encoder.fit_transform(y)
    y = to_categorical(y)
    

    emotions = []

    for i in range(len(req)):
        frame_data = base64.b64decode(req[i][req[i].find(",")+1:])
        frame = Image.open(io.BytesIO(frame_data))


        frame = cv2.cvtColor(np.array(frame), cv2.COLOR_BGR2RGB)
        
        # img.show()

        frame = cv2.flip(frame,1,1) 
        gray = cv2.cvtColor(frame, cv2.COLOR_RGB2GRAY)

        cascPath = os.path.dirname(cv2.__file__) + "/data/haarcascade_frontalface_alt2.xml"
        faceCascade = cv2.CascadeClassifier(cascPath)

        faces = faceCascade.detectMultiScale(gray,
                                            scaleFactor=1.1,
                                            minNeighbors=5,
                                            minSize=(48, 48),
                                            flags=cv2.CASCADE_SCALE_IMAGE)

        for (x,y,w,h) in faces:
            #extract face and send to model
            face_image = gray[y:y+h, x:x+w]
            face_image_48by48 = cv2.resize(face_image, (48,48), interpolation=cv2.INTER_AREA)
            model_input_image = np.reshape(face_image_48by48,[1,48,48,1])
            y_new = model.predict(model_input_image)
            y_new_labels = label_encoder.inverse_transform(np.argmax(y_new, axis=1))
            
            # draw rectangle + label
            # cv2.rectangle(frame, (x, y), (x + w, y + h),(0,255,0), 2)
            # cv2.putText(frame, y_new_labels[0], (x, y+h+1),cv2.FONT_HERSHEY_SIMPLEX,0.8,(255,255,255),2)

        if len(faces) > 0:
            if y_new_labels[0] not in emotions:
                img = Image.open(io.BytesIO(frame_data))
                img.save(fp=f"./new_emotion_data/{counter}_{y_new_labels[0]}.png")
                counter += 1

            emotions.append(y_new_labels[0])

    # cv2.imshow('image window', frame)

    # cv2.waitKey(0)

    cv2.destroyAllWindows()

    return make_response(dumps(emotions))



if __name__ == "__main__":
    app.run(port=5000, debug=True)