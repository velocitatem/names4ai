import random
from pyphen import Pyphen
import json
"""
We need more names for AI systems. As we build more and more AI systems we need more original names for them and distinguish from humans but still make them clear and nice to address.G
It would be cool to crate some type of AI naming book.

**Online AI Name Generator**: Develop an interactive online platform that uses algorithms to generate AI names based on user-defined parameters such as industry, function, and desired characteristics, offering instant suggestions.
"""

names_path = "list.txt"
with open(names_path, "r") as f:
    names = f.readlines()
    names = [name.strip() for name in names if len(name.strip()) > 3 and len(name.strip()) < 10]
    names = list(set(names))

dic = Pyphen(lang='en')

names_split = []
names = random.sample(names, len(names))
for name in names:
    split = dic.inserted(name)
    split = split.split("-")
    names_split.append(split)

from collections import defaultdict
chain = defaultdict(list)
for name in names_split:
    for i in range(len(name) - 1):
        chain[name[i]].append(name[i + 1])


# save the chain
with open("chain.json", "w") as f:
    json.dump(chain, f)

def calculate_pronunciation_diff(name):
    # Initialize score
    score = 0

    # Rule 1: Consecutive Consonants
    if len([char for char in name if char.isalpha() and not char.lower().endswith('e')]) > 3:
        score += 1

    # Rule 2: Vowel Consecutive
    if len([char for char in name if char.lower() in 'aeiou']) < 2:
        score += 1

    # Rule 3: Consonant-Vowel Ratio
    if len([char for char in name if char.isalpha() and not char.lower().endswith('e')]) > len([char for char in name if char.lower() in 'aeiou']):
        score += 1

    # Rule 4: Uncommon Letters
    uncommon_letters = ['q', 'x', 'y', 'z', 'j', 'k', 'w']
    if any(char in uncommon_letters for char in name if char.isalpha()):
        score += 1

    # Rule 5: Long Names
    if len(name) > 10:
        score += 1

    return score / 5

def get_name(chain):
    name = random.choice(list(chain.keys()))
    new_name = name
    for i in range(3):
        new_name += random.choice(chain[name]) if len(chain[name]) > 0 else ""
        name = new_name[-1]
    pdiff = calculate_pronunciation_diff(new_name)
    if len(new_name) < 2 or len(new_name) > 7 or pdiff > 0.6:
        return get_name(chain)
    return new_name.replace("-", "").capitalize()

# now we generate 10 names
for i in range(10):
    print(get_name(chain))
