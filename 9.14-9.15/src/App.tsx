const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  interface CoursePart {
    name: string,
    exerciseCount: number
  }

  interface coursePartProps {
    courseParts: CoursePart[];
  }

  const Header = ({ title }: { title: string }) => {
    return <h1>{title}</h1>
  }

  const Content = ({ courseParts }: coursePartProps) => {
    return (<div>
      {courseParts.map(c => <p key={c.name}> {c.name} {c.exerciseCount} </p>)}
    </div>);
  }

  const Total = ({ total }: { total: number }) => {
    return (
      <p>
        Number of exercises {total}
      </p>
    );
  }
  
  return (
    <div>
      <Header title={courseName} />
      <Content courseParts={courseParts} />
      <Total total={courseParts.map(c=>c.exerciseCount).reduce((s,x) => s+x,0)} />
    </div>
  );
};

export default App;