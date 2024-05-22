import { readFileSync } from 'fs';

const args = process.argv.slice(2);

const findDupeKeys = (path: string) => {
  // read the json file
  const data = readFileSync(path, 'utf8');

  // parse the json files
  const obj = JSON.parse(data);

  // create a map, key is the object key, value is the count
  const map = new Map<string, number>();

  // must traverse the object recursively
  // it will check if there are dupicate keys in the json object recursively
  // const traverse = (o: any) => {
  //   for (const key in o) {
  //     console.log(key, o[key]);
  //
  //     if (typeof o[key] === 'object') {
  //       traverse(o[key]);
  //     } else {
  //       if (map.has(o[key])) {
  //         const current = map.get(o[key]);
  //         if (current !== undefined) {
  //           map.set(o[key], current + 1);
  //         }
  //       } else {
  //         map.set(o[key], 1);
  //       }
  //     }
  //   }
  // };
  const traverse = (o: any) => {
    for (const key in o) {
      if (typeof o[key] === 'object') {
        traverse(o[key]);
      } else {
        // Split the key into name and version
        const packageName = key.split('@')[0];

        if (map.has(packageName)) {
          const current = map.get(packageName);
          if (current !== undefined) {
            map.set(packageName, current + 1);
          }
        } else {
          map.set(packageName, 1);
        }
      }
    }
  };

  traverse(obj);

  console.log('Duplicates:');
  console.log('-----------------');
  for (const [key, value] of map) {
    if (value > 1) {
      console.log(key, value);
    }
  }
};

findDupeKeys(args[0]);
