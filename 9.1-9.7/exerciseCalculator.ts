interface ExcerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExcerciseInput {
  hours: Array<number>;
  target: number;
}

const parseExcerciseArguments = (args: Array<string>): ExcerciseInput => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.filter(x => isNaN(Number(x))).length > 2) {
    throw new Error('Provided values were not numbers!');
  } else {
    return {
      hours: args.slice(3).map(x => Number(x)),
      target: Number(args[2])
    };
  }
};


const calculateExercises = (input: ExcerciseInput) : ExcerciseResult => {
    
    const rating = Math.floor(input.hours
      .filter(x => x >= input.target).length / input.hours.length * 2 + 1);
 
    return  {
      periodLength: input.hours.length,
      trainingDays: input.hours.filter(x => x > 0).length,
      success: input.hours.filter(x => x < input.target).length === 0,
      rating: rating,
      ratingDescription: rating===3 ? 'target met every day!' 
        : rating===2 ? 'not too bad but could be better'
        : 'oh no',
      target: input.target,
      average: input.hours.reduce((a, b) => a + b, 0) / input.hours.length
    };
  };


  try {
    console.log(calculateExercises(parseExcerciseArguments(process.argv)));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }




