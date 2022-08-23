


if exist venv\ (
  	cd "venv\Scripts"
	activate
	cd ../../backend/
	start py manage.py runserver
	cd "../frontend\"
	start npm start
	
) else (
  	py -m venv venv
	cd "venv\Scripts"
	activate
	cd ../../backend/
	pip install -r requirements.txt
	py manage.py makemigrations core
	py manage.py migrate
	py make_admin.py
	start py manage.py runserver
	cd "../frontend\"
	npm install
	start npm start
)


