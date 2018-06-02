from flask import Flask, render_template, request, redirect, url_for, make_response
from datetime import datetime
from pymongo import MongoClient
import pymongo
import jinja2
import os
import pytz
import dateutil.parser


app = Flask(__name__)
client = MongoClient(os.environ.get('MONGODB_ADDR'))
db = client['swipe-overload']
entries = db['entries']

@app.route("/", methods=['GET','POST'])
def main():
	delete_expired_entries();
	return render_template('index.html', entries=entries.find().sort([("start_date", pymongo.ASCENDING), ("start_time", pymongo.ASCENDING)]), num_entries=entries.count())

@app.route("/add_entry", methods=['GET','POST'])
def add_entry():
	print("beepboop")
	name = request.form.get("name")
	phone_number = request.form.get("phone_number")
	num_swipes = request.form.get("num_swipes")
	location = request.form.get("location")
	start_date = request.form.get("start_date")
	start_time = request.form.get("start_time")
	end_date = request.form.get("end_date")
	end_time = request.form.get("end_time")
	
	entries.insert_one(
	{
	"name":name,
	"phone_number":phone_number,
	"num_swipes":num_swipes,
	"location":location,
	"start_date":start_date,
	"start_time":start_time,
	"end_date":end_date,
	"end_time":end_time
	})
	print("beepboop2")
	return redirect('/');


def delete_expired_entries():
	curr_time = datetime.now(pytz.timezone('America/New_York'))
	curr_time = curr_time.replace(tzinfo=pytz.utc)
	for entry in entries.find():
		end = dateutil.parser.parse(entry["end_date"] + " " + entry["end_time"])
		end = end.replace(tzinfo=pytz.utc)
		print("current time: " + str(curr_time))
		print("end time: " + str(end))
		if curr_time > end:
			print("we made it binch")
			entries.delete_one({'_id':entry['_id']})


if __name__ == "__main__":
	app.run()