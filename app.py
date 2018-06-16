import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
from sqlalchemy import MetaData
from sqlalchemy import inspect
from sqlalchemy import Table

import pandas as pd


#################################################
# Flask Setup
#################################################
app = Flask(__name__)
db_path = "sqlite:///threatened_species.db"
from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = db_path
db = SQLAlchemy(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/heatmap")
def heatmap():
    return render_template("heatmap.html")

@app.route("/scatterplot")
def scatterplot():
    return render_template("scatterplot.html")

@app.route("/threatened_species")
def get_otu_ids():
    # defining metatdata
    metadata = MetaData()
    metadata.reflect(bind=db.engine)
    # getting the samples table     
    samples = metadata.tables['Threatened_Species']
    # converting table into something we can actually use  
    res = db.session.query(samples).all()
    # Final data
    data = res
    # It is possible to get the headings using VVV
    # print(res[0].keys())
    #getting the data
    return jsonify(data[0 :])

if __name__ == "__main__":
    app.run(debug=True)  
    
