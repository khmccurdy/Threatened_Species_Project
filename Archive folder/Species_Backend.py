from sqlalchemy import Column, Integer, Float, String, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import csv


Base = declarative_base()


class Threatened_Species(Base):
    #Tell SQLAlchemy what the table name is and if there's any table-specific arguments it should know about
    __tablename__ = 'Threatened_Species'
    __table_args__ = {'sqlite_autoincrement': True}
    #tell SQLAlchemy the name of column and its attributes:
    Countries = Column(String(50), primary_key=True, nullable=False)
    Mammals = Column(String(50))
    Birds = Column(String(50))
    Fishes = Column(String(50))
    Plants = Column(String(50))
    Total = Column(String(50))
    lon = Column(String(50))
    lat = Column(String(50))
    TPA = Column(String(50))


#retrieve CSV file to SQLite
if __name__ == "__main__":

    #Create the database
    engine = create_engine('sqlite:///threatened_species.db')
    Base.metadata.create_all(engine)

    #Create the session
    session = sessionmaker()
    session.configure(bind=engine)
    s = session()

    try:
        with open('threatened_species.csv', 'r') as csvfile:
            datareader = csv.reader(csvfile)
            header = next(datareader)
            for row in datareader:
                 coordinate = row[6].split(',')
                 record = Threatened_Species(**{
                'Countries': row[0],
                'Mammals': row[1],
                'Birds': row[2],
                'Fishes': row[3],
                'Plants': row[4],
                'Total': row[5],
                'lon': coordinate[0],
                'lat': coordinate[1],
                'TPA': row[7]
                 })
                 print(row[0])
                 s.add(record) #Add all the records

            s.commit() #Attempt to commit all the records

    except:
        s.rollback() #Rollback the changes on error
    finally:
        s.close() #Close the connection
