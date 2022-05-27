import React from "react";
import CreateStory from "../../components/CreateStory/CreateStory";
import StoryCardList from "../../components/StoryCardList/StoryCardList";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <div className={styles.container}>
      <CreateStory />
      <StoryCardList />
    </div>
  );
};

export default Home;
