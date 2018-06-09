import pandas as pd
from geopy.geocoders import Nominatim
geolocator = Nominatim()

df = pd.read_csv("threatened_species.csv")
print(df.head())
co_file = open("county_coordinates.txt", "w")

for row in df["Countries"]:
    print(row)
    try:
        location = geolocator.geocode(row)
        location_str = str(location.latitude) + "," + str(location.longitude)
        print(location_str)
        co_file.write(location_str + "\n")
    except:
        print("Could not find Coordinate for:", row)