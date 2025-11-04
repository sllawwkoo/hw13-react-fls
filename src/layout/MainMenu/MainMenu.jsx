import { pagesRoutes } from "@/router/routes";
import { NavLink } from "react-router";
import styles from "./MainMenu.module.scss";

function MainMenu() {
	return (
		<nav className={styles.menu}>
			<ul className={styles.menu__list}>
				{pagesRoutes
					.filter((route) => !route.meta.notInMenu)
					.map(({ path, meta }) => (
						<li
							key={path}
							className={styles.menu__item}
						>
							<NavLink
								to={path}
								className={({ isActive }) =>
									`${styles.menu__link} ${isActive ? styles.active : ""}`
								}
								end={path === "/"}
							>
								{meta.title}
							</NavLink>
						</li>
					))}
			</ul>
		</nav>
	);
}

export default MainMenu;