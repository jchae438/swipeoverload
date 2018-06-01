from flask import Flask, render_template, request, redirect 
import jinja2
import os
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient(os.environ.get('MONGODB_ADDR'))
db = client['swipe-overload']
entries = db['entries']

@app.route("/", methods=['GET','POST'])
def main():
	return render_template('index.html', entries=entries.find(), num_entries=entries.count())

@app.route("/add_entry", methods=['GET','POST'])
def add_entry():
	print("beepboop")
	name = request.form.get("name")
	phone_number = request.form.get("phone_number")
	num_swipes = request.form.get("num_swipes")
	location = request.form.get("location")
	start_time = request.form.get("start_time")
	end_time = request.form.get("end_time")
	
	entries.insert_one(
	{
	"name":name,
	"phone_number":phone_number,
	"num_swipes":num_swipes,
	"location":location,
	"start_time":start_time,
	"end_time":end_time
	})

	return redirect('/')


if __name__ == "__main__":
	app.run()