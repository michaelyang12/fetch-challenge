import { Dog } from "../../models";
import styles from "./DogBox.module.scss";

//Dog in a box dog in a box
interface DogBoxProps {
  dogData: Dog;
}
const DogBox: React.FC<DogBoxProps> = ({ dogData }) => {
  return (
    <div className={styles.galleryItem}>
      <div className={styles.image}>
        <img
          // width={250}
          key={dogData.id}
          src={dogData.img}
          alt={dogData.name || "Dog"}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>Name: {dogData.name}</div>
        <div className={styles.age}>Age: {dogData.age}</div>
        <div className={styles.breed}>Breed: {dogData.breed}</div>
      </div>
    </div>
  );
};

export default DogBox;
