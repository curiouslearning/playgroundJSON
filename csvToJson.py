import json
from itertools import islice
import csv
import random
file = open ('blendingwords.csv', 'rw')
csv = csv.reader(file)
trials = []
output = open('blendingwords.json', 'wb')
output.write('[\r')
next(csv)
for line in csv:
    if len(line) > 6:
        target = line[3].upper()
        items = [line[3].upper(), line[5].upper(), line[7].upper(), line[9].upper()]
    else:
        target = line[0].upper()
        items=[line[0].upper(), line[1].upper(), line[2].upper(), line[3].upper()]
    random.shuffle(items)
    audiofile = target.lower() + "_sound.wav"
    output.write(json.dumps({'activeCells': ('true', 'true', 'true', 'true'),
                          'animationKeys': items, 'correct': target,
                          'numRows': '2', 'numCOlumns': '2',
                          'audioFile': audiofile}))
    output.write(',\r')
output.write(']')
output.close()
