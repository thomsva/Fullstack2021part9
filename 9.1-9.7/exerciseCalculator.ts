interface ExcerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: Array<number>, target: number) : ExcerciseResult => {
    
    const rating = Math.floor(hours.filter(x => x >= target).length / hours.length * 2 + 1);
 
    return  {
      periodLength: hours.length,
      trainingDays: hours.filter(x => x > 0).length,
      success: hours.filter(x => x < target).length === 0,
      rating: rating,
      ratingDescription: rating===3 ? 'target met every day!' 
        : rating===2 ? 'not too bad but could be better'
        : 'oh no',
      target: target,
      average: hours.reduce((a, b) => a + b, 0) / hours.length
    };
  } 

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1] ,2));

