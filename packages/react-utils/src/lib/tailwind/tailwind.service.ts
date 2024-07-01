type TArgs<T extends readonly string[]> =
  | {
      // replace must have intellisense and be one of the array elements
      replace: T[number];
      with: string;
    }
  | {
      add: string;
    }
  | {
      remove: T[number];
    };

// function asConstArray<T extends string>(arr: T[]): readonly T[] {
//     return arr;
// }

export const createTailwindStyle = <T extends readonly string[]>(
  baseClasses: T
) =>
  function changeStyles(...args: TArgs<T>[]): string {
    if (!args.length) {
      return baseClasses.join(' ');
    }

    const newClasses = args.reduce(
      (acc: string[], arg: TArgs<T>) => {
        if ('replace' in arg) {
          return baseClasses.map((baseClass) => {
            if (baseClass === arg.replace) {
              return arg.with;
            }
            return baseClass;
          });
        }

        if ('add' in arg) {
          return acc.concat(arg.add);
        }

        if ('remove' in arg) {
          return acc.filter((baseClass) => baseClass !== arg.remove);
        }

        return acc;
      },
      [...baseClasses]
    );

    const uniqueClasses = new Set(newClasses);

    return [...uniqueClasses].join(' ');
  };
