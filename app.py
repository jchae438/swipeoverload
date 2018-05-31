from flask import Flask, render_template, request
import jinja2
import os
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient(os.environ.get('MONGODB_ADDR'))
db = client['swipe-overload']
entries = db['entries']

@app.route("/")
def main():
	return render_template('index.html')

@app.route('/add_entry', methods=['POST'])
def add_entry():
	num_swipes = request.form.get("num_swipes")
	location = request.form.get("location")
	start_time = request.form.get("start_time")
	end_time = request.form.get("end_time")
	
	entries.insert_one(
	{
	"num_swipes":name,
	"location":location,
	"start_time":start_time,
	"etime":end_time
	})

	return redirect('/')


if __name__ == "__main__":
	app.run()

print("poop")