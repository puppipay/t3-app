import { NextPage } from "next";

type Props = {
  title: string;
};
// was not working when HomePage was NextPage
// Error was, not a react page

const HomePage = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>Welcome to my home page!</p>
    </div>
  );
};

HomePage.getInitialProps = async () => {
  // fetch some data here
  return { title: "My Home Page" };
};

export default HomePage;