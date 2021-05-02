#! C:\Users\Mudit\AppData\Local\Programs\Python\Python38\python.exe

#!/usr/bin/env python
# coding: utf-8

# In[1]:


# importing necessary libraries/modules

import cv2  # opencv library
from datetime import datetime  # datetime library to get date and time logs
import dlib  # dlib library to define face measures
from collections import Counter  # counting library
print("Content-Type: text/html\n")
# using opencv-contrib functions to define different facial features
cascade_face = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
cascade_eye = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_eye.xml')
cascade_smile = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_smile.xml')

# creating face detector object
detector = dlib.get_frontal_face_detector()

# empty array to count occurrences
cnt = []

# function for facial features and recognition


def detection(grayscale, img):

    # display current date and time
    cv2.putText(img, str(datetime.now()), (10, 30),
                cv2.FONT_HERSHEY_SIMPLEX, .5, (255, 255, 255), 2, cv2.LINE_AA)

    # scale factor for frames
    ds_factor = 0.5

    # grayscale conversion of detector
    face_cnt = detector(grayscale)

    # initializing a variable
    i = 0

    # to detect faces and their frequencies
    for face in face_cnt:

        # Get the coordinates of faces
        x, y = face.left(), face.top()
        x1, y1 = face.right(), face.bottom()

        #cv2.rectangle(frame, (x, y), (x1, y1), (0, 255, 0), 2)

        # Increment iterator for each face in faces
        i = i+1

        # Display the rectangle and necessary text
        cv2.rectangle(img, (x, y), (x1, y1), (255, 130, 0), 2)
        cv2.putText(img, 'face num'+str(i), (x-10, y-10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
        cnt.append('face num'+str(i))
        cv2.putText(img, 'Frame Count:'+str(len(cnt)), (10, 50),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1, cv2.LINE_AA)

        # print(len(Counter(cnt).keys()))

    # function to recognize face to detect other facial features
    face = cascade_face.detectMultiScale(grayscale, 1.3, 5)
    for (x_face, y_face, w_face, h_face) in face:

        #cv2.rectangle(img, (x_face, y_face), (x_face+w_face, y_face+h_face), (255, 130, 0), 2)
        ri_grayscale = grayscale[y_face:y_face+h_face, x_face:x_face+w_face]
        ri_color = img[y_face:y_face+h_face, x_face:x_face+w_face]

        # detect eyes
        eye = cascade_eye.detectMultiScale(ri_grayscale, 1.2, 18)
        for (x_eye, y_eye, w_eye, h_eye) in eye:

            cv2.rectangle(ri_color, (x_eye, y_eye),
                          (x_eye+w_eye, y_eye+h_eye), (0, 180, 60), 2)
            eyestext = 'Eyes'
            cv2.putText(img, eyestext, (x_eye+225, y_eye+150),
                        cv2.FONT_HERSHEY_COMPLEX, 0.50, (255, 255, 255), 1)

        # detect mouth
        smile = cascade_smile.detectMultiScale(ri_grayscale, 1.7, 20)
        for (x_smile, y_smile, w_smile, h_smile) in smile:

            cv2.rectangle(ri_color, (x_smile, y_smile),
                          (x_smile+w_smile, y_smile+h_smile), (255, 0, 130), 2)
            smiletext = 'Mouth'
            cv2.putText(img, smiletext, (x_smile+200, y_smile+150),
                        cv2.FONT_HERSHEY_COMPLEX, 0.50, (255, 255, 255), 1)

    # print(len(Counter(cnt).keys()))
    return img


# use webcam for detection
vc = cv2.VideoCapture(0)

# main function to run the program
while True:

    # read frame by frame from the video
    _, img = vc.read()

    # coversion of frame to grayscale
    grayscale = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # call the defined function
    final = detection(grayscale, img)

    # Uncomment the current print statement for live counting
    print(len(Counter(cnt).keys()))

    # generate output window
    cv2.imshow('Video', final)

    # to quit the output window
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# to get the final count of faces
print("Final Face Count :", len(Counter(cnt).keys()))

# release software resource
vc.release()

# destroy any opecv output window and stop kernel
cv2.destroyAllWindows()


# In[ ]:
