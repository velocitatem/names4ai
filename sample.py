# sample list.txt and save to csv file

import random

names_path = "list.txt"
with open(names_path, "r") as f:
    names = f.readlines()
    names = [name.strip() for name in names if len(name.strip()) > 3 and len(name.strip()) < 10]
    names = list(set(names))
size = 100
names = random.sample(names, size)
import csv
with open("names.csv", "w") as f:
    writer = csv.writer(f)
    writer.writerow(["name"])
    for name in names:
        writer.writerow([name])
print(f"Saved {size} names to names.csv")
