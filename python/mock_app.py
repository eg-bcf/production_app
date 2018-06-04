import xlrd
import pandas as pd
import requests
import json



excel_file = 'M:\\Brian\\SHOP_SCHEDULE.xls'
movies = pd.read_excel(excel_file, sheet_name="MILLS", usecols ="A:U")
#newmovies = movies
#print(movies)
movies = movies.to_json(orient="records", date_format='iso')
newmovies = json.loads(movies)
x = []
for i in range(0,len(newmovies)):
    if newmovies[i]['MILL'] != None:
        if newmovies[i]['START JOB'] != None:
            SDATE = newmovies[i]['START JOB']
            NEWSDATE = SDATE.split('T')
            NEWSTIME = NEWSDATE[1][0:5]
            newmovies[i]['START JOB'] = NEWSDATE[0] + " " +  NEWSTIME
        if newmovies[i]['FINISH JOB'] != None:
            FDATE = newmovies[i]['FINISH JOB']
            NEWFDATE = FDATE.split('T')
            NEWFTIME = NEWFDATE[1][0:5]
            newmovies[i]['FINISH JOB'] = NEWFDATE[0] + " " +  NEWFTIME
        if newmovies[i]['NEED    DATE      '] != None:
            NDATE = newmovies[i]['NEED    DATE      ']
            NEWNDATE = NDATE.split('T')
            NEWNTIME = NEWNDATE[1][0:5]
            newmovies[i]['NEED    DATE      '] = NEWNDATE[0] + " " +  NEWNTIME
        x.append(newmovies[i])
z = json.dumps(x)
r = requests.post('http://api.bcfmanufacturing.com/manufacturing', data = {'schedule': z, 'secret': 'cschmidtbcf' })
