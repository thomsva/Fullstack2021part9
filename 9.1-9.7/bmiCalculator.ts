const calculateBmi = (l: number , w: number) : string => {
    l=l/100; //convert cm to m
    let bmi=w/(l*l); 
    if (bmi<18.5) return 'Underweight';
    if (bmi>=30) return 'Obese';
    if (bmi>=25) return 'Overweight';
    return  'Healthy weight';
  }
  
  console.log(calculateBmi(180, 74));
