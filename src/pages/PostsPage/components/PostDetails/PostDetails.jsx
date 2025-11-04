import { useGetPostByIdQuery } from "@/api/postsApi";
import styles from "./PostDetails.module.scss";

function PostDetails({ postId }) {
	const {
		data: post,
		isLoading,
		isError,
	} = useGetPostByIdQuery(postId, {
		skip: !postId,
	});

	if (!postId) return <p className={styles.empty}>Оберіть пост, щоб побачити деталі.</p>;
	if (isLoading) return <p className={styles.load}>Завантаження деталей...</p>;
	if (isError) return <p className={styles.error}>Помилка завантаження деталей.</p>;

	return (
		<div
			className={styles.wrapper}
			style={{ display: post ? "flex" : "none" }}
		>
			<h3 className={styles.title}>{post.title}</h3>
			<p className={styles.id}>ID: {post.id}</p>
			<p className={styles.date}>Дата публікації: {new Date(post.publicationDate).toLocaleString()}</p>
			<p className={styles.likes}>Лайки: {post.likesNumber}</p>
			<p className={styles.dislikes}>Дислайки: {post.dislikesNumber}</p>
			<p className={styles.content}>{post.content || "Без опису"}</p>
		</div>
	);
}

export default PostDetails;
