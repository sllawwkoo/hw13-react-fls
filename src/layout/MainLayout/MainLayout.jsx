import { Outlet } from "react-router";
import styles from "./MainLayout.module.scss";
import MainMenu from "../MainMenu/MainMenu";

function MainLayout() {
	return (
		<div className={styles.wrapper}>
			<header className={styles.header}>
				<MainMenu />
			</header>
			<main className={styles.main}>
				<Outlet />
			</main>
			<footer className={styles.footer}>© React RTK Query App</footer>
		</div>
	);
}

export default MainLayout;
