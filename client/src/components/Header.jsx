import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
	return (
		<header className={styles.header}>
			<nav className={styles.nav}>
				<ul className={styles.navList}>
					<li className={styles.navItem}>
						<Link
							to="/my-orders"
							className={styles.navLink}
						>
							My orders
						</Link>
					</li>
					<li className={styles.navItem}>
						<Link
							to="/create-order"
							className={styles.navLink}
						>
							Create order
						</Link>
					</li>
					<li className={styles.navItem}>
						<Link
							to="/login"
							className={styles.navLink}
						>
							Login
						</Link>
					</li>
					<li className={styles.navItem}>
						<Link
							to="/register"
							className={styles.navLink}
						>
							Register
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
