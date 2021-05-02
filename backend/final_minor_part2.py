#! C:\Users\Mudit\AppData\Local\Programs\Python\Python38\python.exe
#!/usr/bin/env python
# coding: utf-8

# Module1

# In[1]:


# importing necessary libraries/modules

import cv2  # opencv library
import argparse
import imutils
import sys
import numpy as np  # numpy library for calculations

import pandas  # pandas library to create csv files
from datetime import datetime  # datetime library to get date and time logs
import os  # os library to direct path of the training files
import face_recognition  # face-recognition module to specify face length

# print("Content-Type: text/html\n")

# static variable to catch non-motion frame
static_back = None

# array to eppend frame when any moving object appear
motion_list = [None, None]

# time of movement
time = []

# initializing DataFrame to ctach the moving object frame,
# one column is start time and other column is end time
df = pandas.DataFrame(columns=["Start", "End"])

# use webcam for detection
vidcap = cv2.VideoCapture(0)

# to create background subtraction output window
fgbg = cv2.createBackgroundSubtractorMOG2()

# define output video file for motion frames
fourcc = cv2.VideoWriter_fourcc(*'XVID')
out = cv2.VideoWriter('A:\output.avi', fourcc, 20.0, (640, 480))

# images' path to train for face detection and recognition
path = (r'C:\xampp\htdocs\python\images\Test')

# empty arrays to append images
images = []

classNames = []

myList = os.listdir(path)

# print(myList)

# read images and append them in array
for cl in myList:
    curImg = cv2.imread(f'{path}/{cl}')
    images.append(curImg)
    classNames.append(os.path.splitext(cl)[0])

# print(classNames)

# function to encode images for recognition


def findEncodings(images):
    encodeList = []
    for img in images:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(img)[0]
        encodeList.append(encode)
    return encodeList

# function to read recognized faces in a csv file


def createlog(name):
    with open(r'C:\Users\Mudit\Downloads\log.csv', 'r+', errors='ignore') as f:
        myDataList = f.readlines()
        nameList = []
        for line in myDataList:
            entry = line.split(',')
            nameList.append(entry[0])
        if name not in nameList:
            now = datetime.now()
            dtString = now.strftime('%H:%M:%S')
            f.writelines(f'\n{name},{dtString}')


# call encoded images function
encodeListKnown = findEncodings(images)
# print('Encoding Complete')

# read video frames for motion detection and face recognition
ret, framePrimary = vidcap.read()
ret, frameSecondary = vidcap.read()

# empty array to count motion frames
cnt = []

# main function
while vidcap.isOpened():

    # reading frame from video
    check, framePrimary = vidcap.read()

    # initializing motion = 0 (no motion)
    motion = 0

    # generate difference between two different output windows
    difference = cv2.absdiff(framePrimary, frameSecondary)

    # conversion of RGB to grayscale
    gray = cv2.cvtColor(difference, cv2.COLOR_BGR2GRAY)

    # apply Gaussian blur to the frame
    blur = cv2.GaussianBlur(gray, (5, 5), 0)

    # define threshold value using blur
    _, thresh = cv2.threshold(blur, 20, 255, cv2.THRESH_BINARY)
    dilated = cv2.dilate(thresh, None, iterations=3)

    # apply background subtractor for primary frame
    fgmask = fgbg.apply(framePrimary)

    # establish contours
    contours, _ = cv2.findContours(
        dilated, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    blob = cv2.dnn.blobFromImages(framePrimary, 1.0,
                                  (7, 7), (114, 107, 99),
                                  swapRB=True, crop=True)
    blob = np.transpose(blob, (1, 0, 2, 3))
    blob = np.expand_dims(blob, axis=0)
    contour_sum = 0

    # read images from frames for face recognition
    success, img = vidcap.read()

    # uncomment below to use screen as the primary source of live video input
    #img = captureScreen()

    # resize images as per convenience
    imgS = cv2.resize(img, (0, 0), None, 0.25, 0.25)

    # RGB encoding color to the images
    imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)

    # function for face recognition
    facesCurFrame = face_recognition.face_locations(imgS)
    encodesCurFrame = face_recognition.face_encodings(imgS, facesCurFrame)

    # reading each frame for motion contour detection
    for contour in contours:
        (x, y, w, h) = cv2.boundingRect(contour)

        # specify contour area threshold value
        if cv2.contourArea(contour) < 15000:
            continue

        # motion = 1 for object in motion
        motion = 1

        # to put a contour an text around object in motion
        cv2.rectangle(framePrimary, (x, y), (x+w, y+h), (0, 255, 0), 2)
        cv2.putText(framePrimary, "Report: {}".format('Movement'),
                    (10, 18), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 3)
        cv2.putText(framePrimary, str(datetime.now()), (10, 400),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 3)
        cnt.append(len(contours))
        out.write(framePrimary)
        cv2.putText(framePrimary, str(len(cnt)), (10, 180),
                    cv2.FONT_HERSHEY_SIMPLEX, 4, (255, 255, 255), 4, cv2.LINE_AA)

        # for face recognition using encoded images
        for encodeFace, faceLoc in zip(encodesCurFrame, facesCurFrame):
            matches = face_recognition.compare_faces(
                encodeListKnown, encodeFace)
            faceDis = face_recognition.face_distance(
                encodeListKnown, encodeFace)

            # print name of the face recognized
            print(faceDis, end="~")
            matchIndex = np.argmin(faceDis)

            # print the name of person recognized and time of recognition in a csv file
            if matches[matchIndex]:
                name = classNames[matchIndex].upper()
                print(name, end="~")
                #y1,x2,y2,x1 = faceLoc
                #y1, x2, y2, x1 = y1*4,x2*4,y2*4,x1*4
                # cv2.rectangle(img,(x1,y1),(x2,y2),(0,255,0),2)
                # cv2.rectangle(img,(x1,y2-35),(x2,y2),(0,255,0),cv2.FILLED)
                # cv2.putText(img,name,(x1+6,y2-6),cv2.FONT_HERSHEY_COMPLEX,1,(255,255,255),2)
                createlog(name)

    # appending the status of motion
    motion_list.append(motion)
    motion_list = motion_list[-2:]

    # appending start time of motion
    if motion_list[-1] == 1 and motion_list[-2] == 0:
        time.append(datetime.now())

    # appending End time of motion
    if motion_list[-1] == 0 and motion_list[-2] == 1:
        time.append(datetime.now())

    # display both the output screen
    cv2.imshow("feed", framePrimary)
    cv2.imshow("FG MASK Frame", fgmask)

    framePrimary = frameSecondary
    ret, frameSecondary = vidcap.read()

    # generate key to quit the process
    key = cv2.waitKey(1)

    # if q entered whole process will stop
    if key == ord('q'):
        if motion == 1:
            time.append(datetime.now())
        break

# print final motion frames detected
print(len(cnt))

# generate dataframe for start and end time for each motion frame
for j in range(0, len(time), 2):
    df = df.append({"Start": time[j], "End": time[j + 1]}, ignore_index=True)

# creating a CSV file in which start and end time of movements will be saved
df.to_csv(r'A:\time_of_movements.csv')

# destroy any opecv output window and stop kernel
cv2.destroyAllWindows()

# release software resource
vidcap.release()

# generate output file of motion frames
out.release()


# In[ ]:
