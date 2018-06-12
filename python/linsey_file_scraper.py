import xlrd
import pandas as pd
import requests
import json



excel_file = 'prod_floor.xlsx'
mills = pd.read_excel(excel_file, sheet_name="All", usecols ="A:F")
mills = mills.to_json(orient="records", date_format='iso')
newmills = json.loads(mills)
x = {}
keys = []
for i in range(0,len(newmills)-100):
    if newmills[i]["RoutingNo"] in keys:
        newT = newmills[i]["PromiseDate"].split('T')
        newmills[i]["PromiseDate"] = newT[0]
        x[newmills[i]["RoutingNo"]].append(newmills[i])
    else:
        keys.append(newmills[i]["RoutingNo"])
        x[newmills[i]["RoutingNo"]] = []
        newT = newmills[i]["PromiseDate"].split('T')
        newmills[i]["PromiseDate"] = newT[0]
        x[newmills[i]["RoutingNo"]].append(newmills[i])

newSchedule = json.dumps(x)
#r = requests.post('http://api.bcfmanufacturing.com/manufacturing', data = {'schedule': newSchedule, 'secret': 'cschmidtbcf' })
r = requests.post('http://localhost:5001/manufacturing/assembly', data = {'schedule': newSchedule, 'secret': 'cschmidtbcf'})
