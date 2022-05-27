import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getProfile } from "../../features/profile/profileSlice";
import { deleteStory, getStories } from "../../features/stories/storiesSlice";
import styles from "./StoryCardList.module.scss";

const StoryCardList = () => {
  const dispatch = useAppDispatch();
  const { photos, message, errorMessage } = useAppSelector(
    (state) => state.stories
  );
  const { profile } = useAppSelector((state) => state.profile);

  useEffect(() => {
    if (!profile) {
      dispatch(getProfile());
    }
    if (photos.length === 0) {
      dispatch(getStories());
    }
    if (message) {
      toast.success(message);
    }
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [dispatch, message, errorMessage, photos, profile]);

  const handleDelete = (id: string) => {
    dispatch(deleteStory(id));
  };

  return (
    <div>
      <h1>Stories</h1>
      <div className={styles.gallery}>
        {photos &&
          photos.map((photo) => (
            <div className={styles.card} key={photo.id}>
              <img src={photo.image} alt={photo.description} />
              <span>{photo.description}</span>
              {photo.userId === profile?.id && (
                <button onClick={() => handleDelete(photo.id)}>X</button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default StoryCardList;
