"""
Import sample data for recommendation engine
"""

import predictionio
import argparse
import random
import json
from pprint import pprint

if __name__ == '__main__':
  parser = argparse.ArgumentParser(
    description="Import sample data for recommendation engine")
  parser.add_argument('--access_key', default='invald_access_key')
  parser.add_argument('--url', default="http://162.243.227.24:7070")
  # parser.add_argument('--file', default="./data/sample_movielens_data.txt")

  args = parser.parse_args()
  print args

  client = predictionio.EventClient(
    access_key=args.access_key,
    url=args.url,
    threads=5,
    qsize=500)

  # import_events(client, args.file)
  json_data=open('test-json-data.json', 'r')
  data = json.load(json_data)
  # pprint(data['data'])
  for person in data['data']:
    name = person.get('name'),
    if (person.get('likes') and person['likes']['data']):
      for like in person['likes']['data']:
        print(person.get('id') + ' likes '+ like.get('id'))
        client.create_event(
          event="buy",
          entity_type="user",
          entity_id=person.get('id'),
          target_entity_type="item",
          target_entity_id=like.get('id')
        )
  json_data.close()


  