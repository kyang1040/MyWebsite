import re
from collections import Counter

def parse_game_data(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()

    plate_appearances = len(lines)
    stats = Counter()

    for line in lines:
        line = line.strip()

        # Count RBIs
        if "*" in line:
            stats['RBIs'] += line.count("*")

        # Strip RBIs marker for further categorization
        clean_line = re.sub(r"\*", "", line)

        if clean_line == "K":
            stats['Strikeouts Swinging'] += 1
            stats['Strikeouts Total'] += 1
        elif clean_line == "KK":
            stats['Strikeouts Looking'] += 1
            stats['Strikeouts Total'] += 1
        elif clean_line == "BB":
            stats['Walks'] += 1
        elif clean_line == "HBP":
            stats['Hit By Pitches'] += 1
        elif clean_line == "SF":
            stats['Sacrifice Flies'] += 1
        elif "1B" in clean_line:
            stats['Singles'] += 1
            stats['Hits'] += 1
        elif "2B" in clean_line:
            stats['Doubles'] += 1
            stats['Hits'] += 1
        elif "3B" in clean_line:
            stats['Triples'] += 1
            stats['Hits'] += 1
        elif "HR" in clean_line:
            stats['Home Runs'] += 1
            stats['Hits'] += 1
        elif re.match(r"\d-\d", clean_line):
            stats['Groundouts'] += 1
        elif re.match(r"E\d", clean_line):
            stats['Errors'] += 1
        elif clean_line == "FC":
            stats['Fielder Choices'] += 1
        elif re.match(r"L\d", clean_line):
            stats['Lineouts'] += 1
        elif re.match(r"P\d", clean_line):
            stats['Popouts'] += 1
        elif re.match(r"F\d", clean_line):
            stats['Flyouts'] += 1

    at_bats = plate_appearances - stats['Walks'] - stats['Hit By Pitches'] - stats['Sacrifice Flies']
    total_bases = (stats['Singles'] + 2 * stats['Doubles'] + 3 * stats['Triples'] + 4 * stats['Home Runs'])
    on_base_percentage = (stats['Hits'] + stats['Walks'] + stats['Hit By Pitches']) / plate_appearances if plate_appearances > 0 else 0
    slugging = total_bases / at_bats if at_bats > 0 else 0
    ops = on_base_percentage + slugging
    batting_average = stats['Hits'] / at_bats if at_bats > 0 else 0

    results = {
        'Plate Appearances': plate_appearances,
        'At Bats': at_bats,
        'Hits': stats['Hits'],
        'Singles': stats['Singles'],
        'Doubles': stats['Doubles'],
        'Triples': stats['Triples'],
        'Home Runs': stats['Home Runs'],
        'Batting Average': round(batting_average, 3),
        'On Base Percentage': round(on_base_percentage, 3),
        'Number of Walks': stats['Walks'],
        'Number of Hit By Pitches': stats['Hit By Pitches'],
        'RBIs': stats['RBIs'],
        'Total Bases': total_bases,
        'Number of Sacrifice Flies': stats['Sacrifice Flies'],
        'Strikeouts Total': stats['Strikeouts Total'],
        'Strikeouts Swinging': stats['Strikeouts Swinging'],
        'Strikeouts Looking': stats['Strikeouts Looking'],
        'Slugging': round(slugging, 3),
        'OPS': round(ops, 3),
        'Groundouts': stats['Groundouts'],
        'Errors': stats['Errors'],
        'Fielder Choices': stats['Fielder Choices'],
        'Lineouts': stats['Lineouts'],
        'Popouts': stats['Popouts'],
        'Flyouts': stats['Flyouts']
    }

    # Write results to a .txt file
    output_file = f"{file_path.rsplit('.', 1)[0]}_stats.txt"
    with open(output_file, 'w') as out_file:
        for stat, value in results.items():
            out_file.write(f"{stat}: {value}\n")

    return results

# Example usage
file_path = "game_data_cooperstown.txt"
# file_path = "game_data_2014.txt"
# file_path = "game_data_2015.txt"
# file_path = "game_data_2016.txt"
# file_path = "game_data_combined.txt"
results = parse_game_data(file_path)
for stat, value in results.items():
    print(f"{stat}: {value}")
