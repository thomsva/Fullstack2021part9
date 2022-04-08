const App = () => {
  const courseName = "Half Stack application development";

  
  // new types
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }

  interface CoursePartWithDescription extends CoursePartBase {
    description: string;
  }

  interface CourseNormalPart extends CoursePartWithDescription {
    type: "normal";
  }
  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }

  interface CourseSubmissionPart extends CoursePartWithDescription {
    type: "submission";
    exerciseSubmissionLink: string;
  }

  interface CourseSpecialPart extends CoursePartWithDescription {
    type: "special";
    requirements: ("nodejs" | "jest")[],
  }

  type CoursePart = CourseNormalPart | CourseProjectPart |
    CourseSubmissionPart | CourseSpecialPart;


  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]


  interface coursePartProps {
    courseParts: CoursePart[];
  }

  const Header = ({ title }: { title: string }) => {
    return <h1>{title}</h1>
  }

  const Content = ({ courseParts }: coursePartProps) => {
    return (
      <>
        {courseParts.map(c => <div key={c.name}><Part coursePart={c} /></div> )}
      </>);
  }

  const Part = ({ coursePart }: { coursePart: CoursePart }) => {
    switch (coursePart.type) {
      case "normal":
        return (
          <>
            <p><b>{coursePart.name} {coursePart.exerciseCount}</b><br/>
            <i>{coursePart.description}</i></p>
          </>
        );
        break;
      case "groupProject":
        return (
          <>
            <p><b>{coursePart.name} {coursePart.exerciseCount}</b><br/>
            <i>project excercises {coursePart.groupProjectCount}</i></p>
          </>
        );
        break;      
      case "submission":
        return (
          <>
            <p><b>{coursePart.name} {coursePart.exerciseCount}</b><br/>
              <i>{coursePart.description}<br />
                submit to {coursePart.exerciseSubmissionLink}</i></p>
          </>
        );
        break;
      case "special":
        return (
          <>
            <p><b>{coursePart.name} {coursePart.exerciseCount}</b><br/>
              <i>{coursePart.description}<br />
                required skills {coursePart.requirements.map((r, i) => [
                  <span key={i}>{i > 0 && ", "}{r}</span>
                ])}</i></p>
          </>
        );
        break;
      default:
        return (
          <p>Unknown type</p>
        )
    }
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