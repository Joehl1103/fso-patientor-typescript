// Material UI
import { Rating } from '@mui/material';
import { Favorite } from '@mui/icons-material';

// Styles
import styles from "./health-rating-bar.module.css";

type BarProps = {
  rating: 1 | 2 | 3 | 4 | 5;
  showText: boolean;
};

const HEALTHBAR_TEXTS = [
  "The patient is in great shape",
  "The patient has a low risk of getting sick",
  "The patient has a high risk of getting sick",
  "The patient has a diagnosed condition",
];

const HealthRatingBar = ({ rating, showText }: BarProps) => {
	console.log('rating',rating)
  return (
    <div>
      <Rating
        className={styles.healthRating}
				size="small"
        readOnly
        value={rating}
        max={5}
        // icon={<Favorite fontSize="inherit" />}
      />

      {showText ? <p>{HEALTHBAR_TEXTS[rating]}</p> : null}
    </div>
  );
};

export default HealthRatingBar;
