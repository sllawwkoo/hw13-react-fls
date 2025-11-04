import { Link } from "react-router";
import styles from "./HomePage.module.scss";

function HomePage() {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<h1 className={styles.title}>React + RTK Query додаток</h1>
				<p className={styles.description}>
					Тут ви можете переглядати пости у двох форматах — з класичною
					пагінацією або за допомогою нескінченного скролу. Всі дані отримуються
					з сервера через RTK Query.
				</p>

				<div className={styles.links}>
					<Link to="/posts">Переглянути пости</Link>
					<Link to="/posts-infinite">Нескінченний скрол</Link>
				</div>
			</div>
		</div>
	);
}

export default HomePage;