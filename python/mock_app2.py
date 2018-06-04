import xlrd
import pandas as pd
import requests
import json



excel_file = 'SHOP_SCHEDULE.xls'
mills = pd.read_excel(excel_file, sheet_name="MILLS", usecols ="A:R")
lathes = pd.read_excel(excel_file, sheet_name="LATHES", usecols ="A:R")

mills = mills.to_json(orient="records", date_format='iso')
newmills = json.loads(mills)
x = []
for i in range(0,len(newmills)):
    if newmills[i]['MILL'] != None:
        if newmills[i]['SEQ #'] != 0:
            if newmills[i]['START JOB'] != None:
                SDATE = newmills[i]['START JOB']
                NEWSDATE = SDATE.split('T')
                NEWSTIME = NEWSDATE[1][0:5]
                newmills[i]['START JOB'] = NEWSDATE[0] + " " +  NEWSTIME
            if newmills[i]['FINISH JOB'] != None:
                FDATE = newmills[i]['FINISH JOB']
                NEWFDATE = FDATE.split('T')
                NEWFTIME = NEWFDATE[1][0:5]
                newmills[i]['FINISH JOB'] = NEWFDATE[0] + " " +  NEWFTIME
            if newmills[i]['NEED    DATE      '] != None:
                NDATE = newmills[i]['NEED    DATE      ']
                NEWNDATE = NDATE.split('T')
                NEWNTIME = NEWNDATE[1][0:5]
                newmills[i]['NEED    DATE      '] = NEWNDATE[0] + " " +  NEWNTIME
            x.append(newmills[i])
#print(x)

lathes = lathes.to_json(orient="records", date_format='iso')
newlathes = json.loads(lathes)
y = []
for i in range(0, len(newlathes)):
    if newlathes[i]['LATHE'] != None:
        if newlathes[i]['SEQ #'] != 0:
            if newlathes[i]['START JOB'] != None:
                try:
                    SDATE = newlathes[i]['START JOB']
                    NEWSDATE = SDATE.split('T')
                    NEWSTIME = NEWSDATE[1][0:5]
                    newlathes[i]['START JOB'] = NEWSDATE[0] + " " +  NEWSTIME
                except Exception as e:
                    print(e)
            if newmills[i]['FINISH JOB'] != None:
                try:
                    FDATE = newlathes[i]['FINISH JOB']
                    NEWFDATE = FDATE.split('T')
                    NEWFTIME = NEWFDATE[1][0:5]
                    newlathes[i]['FINISH JOB'] = NEWFDATE[0] + " " +  NEWFTIME
                except Exception as e:
                    print(e)
            if newlathes[i]['NEED DATE'] != None:
                try:
                    NDATE = newlathes[i]['NEED DATE']
                    NEWNDATE = NDATE.split('T')
                    NEWNTIME = NEWNDATE[1][0:5]
                    newlathes[i]['NEED DATE'] = NEWNDATE[0] + " " +  NEWNTIME
                except Exception as e:
                    print(e)
            y.append(newlathes[i])
#print(y)

newSchedule = {}
newSchedule["MILLS"] = x
newSchedule["LATHES"] = y
newSchedule = json.dumps(newSchedule)
r = requests.post('http://localhost:5001/manufacturing', data = {'schedule': newSchedule, 'secret': 'cschmidtbcf' })
