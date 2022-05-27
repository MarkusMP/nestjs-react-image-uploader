import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { createStory } from "../../features/stories/storiesSlice";
import styles from "./CreateStory.module.scss";

const CreateStory = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File>();
  const dispatch = useAppDispatch();

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    setImage(file);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (image && text) {
      dispatch(createStory({ description: text, image }));
    }
  };

  return (
    <div className={styles.story}>
      <form onSubmit={onSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="text">Create a new story</label>
          <textarea
            id="text"
            name="text"
            value={text}
            placeholder="Description about the photo..."
            maxLength={255}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="photo">Upload photo</label>

          <input
            type="file"
            id="photo"
            aria-label="Upload your profile image"
            onChange={uploadFileHandler}
            accept=".jpg, .jpeg, .png"
          />
        </div>

        <div className={styles.formGroup}>
          <button type="submit" className={styles.btn}>
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateStory;
