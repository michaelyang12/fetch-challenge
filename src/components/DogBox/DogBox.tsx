import { Dog } from "../../models";
import styles from "./DogBox.module.scss";

//Dog in a box dog in a box
interface DogBoxProps {
  dogData: Dog;
}
const DogBox: React.FC<DogBoxProps> = ({ dogData }) => {
  return (
    <div className={styles.galleryItem} key={dogData.id}>
      <div className={styles.image}>
        <img
          height={250}
          key={dogData.id}
          src={dogData.img}
          alt={dogData.name || "Dog"}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>
          <b>{dogData.name}</b>
        </div>
        <div className={styles.breed}>
          {dogData.breed}
          <span className={styles.age}>
            - {dogData.age} {dogData.age != 1 ? "years old" : "year old"}
          </span>
        </div>
        {/* <div className={styles.breed}>Breed: {dogData.breed}</div> */}
      </div>
    </div>
  );
};

export default DogBox;
