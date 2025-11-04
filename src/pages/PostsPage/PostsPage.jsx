import { useState } from "react";
import { PostDetails, PostsList } from "./components";
import { Link } from "react-router";
import styles from "./PostsPage.module.scss";

function PostsPage() {
	const [selectedPostId, setSelectedPostId] = useState(null);

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<h2 className={styles.title}>Сторінка постів</h2>
				<PostDetails postId={selectedPostId} />
				<PostsList onSelect={setSelectedPostId} />
				<Link to="/posts/edit">
					<button className={styles.button}>➕ Додати новий пост</button>
				</Link>
			</div>
		</div>
	);
}

export default PostsPage;
