import styles from './VideoCont.module.css';

const VideoCont = () => {
  return (
    <video
      src="https://www.w3schools.com/html/mov_bbb.mp4"
      controls
      className={styles['video-container']}
    >
      Your browser doesn't support HTML5 video tag.
    </video>
  );
};

export default VideoCont;
