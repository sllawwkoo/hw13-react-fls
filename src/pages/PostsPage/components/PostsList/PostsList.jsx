import {
	useDeletePostMutation,
	useDislikePostMutation,
	useGetPostsPQuery,
	useLikePostMutation,
} from "@/api/postsApi";
import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./PostsList.module.scss";

function PostsList({ onSelect }) {
	const [page, setPage] = useState(1);
	const { data, isLoading, isError, isFetching } = useGetPostsPQuery({
		page,
		limit: 5,
	});

	const [deletePost] = useDeletePostMutation();
	const [likePost] = useLikePostMutation();
	const [dislikePost] = useDislikePostMutation();

	const navigate = useNavigate();

	if (isLoading) return <p className={styles.load}>Завантаження...</p>;
	if (isError)
		return <p className={styles.error}>Помилка завантаження постів</p>;

	const { items, totalPages, remaining } = data;

	return (
		<div>
			<ul className={styles.list}>
				{items.map((post) => (
					<li
						key={post.id}
						className={styles.list__item}
					>
						<h3 className={styles.title}>{post.title}</h3>
						<div className={styles.actions}>
							<div className={styles.likesDislikes}>
								<span className={styles.likes}>Лайки: {post.likesNumber}</span>
								<button
									className={styles.buttonLike}
									onClick={() => likePost(post.id)}
								>
									👍
								</button>
								<span className={styles.dislikes}>
									Дислайки:{post.dislikesNumber}
								</span>
								<button
									className={styles.buttonLike}
									onClick={() => dislikePost(post.id)}
								>
									👎
								</button>
							</div>
							<div className={styles.buttonContainer}>
								<button
									className={styles.button}
									onClick={() => onSelect(post.id)}
								>
									Деталі
								</button>
								<button
									className={styles.button}
									onClick={() => navigate(`/posts/edit/${post.id}`)}
								>
									Редагувати
								</button>
								<button
									className={styles.button}
									onClick={() => {
										if (window.confirm("Видалити пост?")) deletePost(post.id);
									}}
								>
									Видалити
								</button>
							</div>
						</div>
					</li>
				))}
			</ul>
			{isFetching && <p className={styles.fetching}>Оновлення...</p>}
			<hr />
			<div className={styles.pagination}>
				<button
					onClick={() => setPage((p) => Math.max(p - 1, 1))}
					disabled={page === 1}
					className={`${styles.prevBtn} ${page === 1 && styles.disabled}`}
				>
					Попередня
				</button>
				{[...Array(totalPages)].map((_, i) => (
					<button
						key={i}
						onClick={() => setPage(i + 1)}
						className={`${styles.pageBtn} ${page === i + 1 && styles.active}`}
					>
						{i + 1}
					</button>
				))}
				<button
					onClick={() => setPage((p) => (remaining > 0 ? p + 1 : p))}
					disabled={remaining === 0}
					className={`${styles.nextBtn} ${remaining === 0 && styles.disabled}`}
				>
					Наступна
				</button>
			</div>
		</div>
	);
}

export default PostsList;
