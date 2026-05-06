import { useSelector } from "react-redux";

function About() {
  const data = useSelector((store) => store.userSlice);
  return (
    <div>
      <h1>about</h1>
    </div>
  );
  data.name;
}
export default About;
