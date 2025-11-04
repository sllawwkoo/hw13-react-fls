import { ThreeDot } from "react-loading-indicators";
import styles from "./Loader.module.scss";

function Loader() {
	return (
		<div className={styles.loader}>
			<ThreeDot
				variant="pulsate"
				size="medium"
				color="#082a28"
			/>
		</div>
	);
}

export default Loader;
