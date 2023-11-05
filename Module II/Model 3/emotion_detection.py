import cv2
import os
import numpy as np
from keras.models import load_model
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.utils import to_categorical

model = load_model('Model_1.h5')
y = ['Anger', 'Contempt', 'Disgust', 'Fear', 'Happiness', 'Neutral', 'Sadness', 'Surprise']

# Encoding categorical data
label_encoder = LabelEncoder()
y = label_encoder.fit_transform(y)
y = to_categorical(y)

cascPath = os.path.dirname(cv2.__file__) + "/data/haarcascade_frontalface_alt2.xml"
faceCascade = cv2.CascadeClassifier(cascPath)
video_capture = cv2.VideoCapture(0)

while True:
    # Capture frame-by-frame
    ret, frame = video_capture.read()
    frame = cv2.flip(frame,1,1) 
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
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
        cv2.rectangle(frame, (x, y), (x + w, y + h),(0,255,0), 2)
        cv2.putText(frame, y_new_labels[0], (x, y+h+1),cv2.FONT_HERSHEY_SIMPLEX,0.8,(255,255,255),2)

    cv2.imshow('Video', frame)
    if cv2.waitKey(10) & 0xFF == ord('q'):
        break
video_capture.release()
cv2.destroyAllWindows()