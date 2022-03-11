interface BmiInput {
  length: number;
  weight: number;
}

const parseBmiArguments = (args: Array<string>): BmiInput => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  if (isNaN(Number(args[2])) && isNaN(Number(args[3]))) {
    throw new Error('Provided values were not numbers!');
  } else {
    return {
      length: Number(args[2]),
      weight: Number(args[3])
    }
  }
}

export const calculateBmi = (l: number , w: number) : string => {
    l=l/100; //convert cm to m
    let bmi=w/(l*l); 
    if (bmi<18.5) return 'Underweight';
    if (bmi>=30) return 'Obese';
    if (bmi>=25) return 'Overweight';
    return  'Healthy weight';
}
  
try {
  const { length, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(length, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

