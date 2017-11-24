import sys
import json


def main():
    name = sys.argv[1]
    result = {'name': name}
    print(json.dumps(result))


main()
