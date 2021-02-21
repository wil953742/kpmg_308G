import pandas as pd;
import joblib

user = ['남자',180,82]
category = "후드 집업"

if (category == "후드 집업" or category == "환절기 코트"):
	Sex = []
	Reviewer_Sex = []
	Height = []
	Weight = []
	Upper = []
	Shoulder = []
	Chest = []
	Arm = []

	# Put Data in the Lists above
	test = pd.DataFrame(list(zip(sex,Reviewer_Sex,Height,Weight,Upper,Shoulder,Chest,Arm)),
                   columns=['sex','Reviewer_Sex','Height','Weight', 'Upper', 'Shoulder', 'Chest','Arm'])
	if (category == "후드 집업"):
		model = joblib.load('hoody_model.pkl')
	else:
		model = joblib.load('coat_model.pkl')
	result = model.predict_proba(test)
	# response back the result
else {
	Sex = [] 
	Reviewer_Sex = []
	Height = []
	Weight = []
	Leg = []
	Waist = []
	Thigh = []
	Bot_Len = []
	Bot_Area = []
	model = joblib.load('jean_model.pkl')
	test = pd.DataFrame(list(zip(sex,Reviewer_Sex,Height,Weight,Leg,Waist,Thigh,Bot_Len, Bot_Area)),
				columns=['sex','Reviewer_Sex','Height','Weight', 'Leg', 'Waist', 'Thigh','Bot_Len', 'Bot_Area'])
	result = model.predict_proba(test)
	# response back the result
}

