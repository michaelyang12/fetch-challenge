import { ToggleButton } from "react-bootstrap";
import { Dog } from "../../models";
import styles from "./DogBox.module.scss";
import { useContext, useEffect, useState } from "react";
import { Heart } from "lucide-react";
import FavoritesContext from "../../contexts/FavoritesContext";

//Dog in a box dog in a box
interface DogBoxProps {
  dogData: Dog;
  favorited: boolean;
}
const DogBox: React.FC<DogBoxProps> = ({ dogData, favorited }) => {
  const { addFavorite, removeFavorite } = useContext(FavoritesContext);

  const [isHovered, setIsHovered] = useState(false);

  const handleSetFavorited = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      addFavorite(dogData.id);
    } else {
      removeFavorite(dogData.id);
    }
  };

  return (
    <div className={styles.galleryItem} id={dogData.id}>
      <div className={styles.image}>
        <img
          height={250}
          key={dogData.id}
          src={dogData.img}
          alt={dogData.name || "Dog"}
        />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <div className={styles.name}>
            <b>{dogData.name}</b>
          </div>
          <div className={styles.breed}>
            {dogData.breed}
            <span className={styles.age}>
              {" "}
              - {dogData.age} {dogData.age != 1 ? "years old" : "year old"}
            </span>
          </div>
          <div className={styles.zipcode}>Zip: {dogData.zip_code}</div>
        </div>
        <div className={styles.favorite}>
          <ToggleButton
            className="mb-2"
            id={`toggle-fav-${dogData.id}`}
            type="checkbox"
            variant={"outline-danger"}
            checked={favorited}
            value={dogData.id}
            onChange={handleSetFavorited}
            size="sm"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Heart fill={isHovered ? "currentColor" : "none"} strokeWidth={2} />
          </ToggleButton>
        </div>
      </div>
    </div>
  );
};

export default DogBox;
