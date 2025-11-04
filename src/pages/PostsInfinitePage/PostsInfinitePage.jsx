import { useGetPostsInfiniteQuery } from "@/api/postsApi";
import { useScrollToBottom } from "@/hooks/useScrollToBottom";
import { Fragment, useEffect } from "react";
import styles from "./PostsInfinitePage.module.scss";
import Loader from "@/components/Loader/Loader";

function PostsInfinitePage() {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isLoading,
		isFetchingNextPage,
		isSuccess,
	} = useGetPostsInfiniteQuery();

	const isBottom = useScrollToBottom();

	useEffect(() => {
		if (
			isBottom &&
			hasNextPage &&
			!isLoading &&
			!isFetchingNextPage &&
			isSuccess
		) {
			fetchNextPage();
		}
	}, [
		isBottom,
		hasNextPage,
		isLoading,
		isFetchingNextPage,
		isSuccess,
		fetchNextPage,
	]);

	if (isLoading) return <p className={styles.load}>Завантаження...</p>;
	if (!isSuccess) return <p className={styles.error}>Помилка завантаження.</p>;

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<h2 className={styles.title}>Нескінченне завантаження постів</h2>
				{data.pages.map((page, i) => (
					<Fragment key={i}>
						{page.items.map((post) => (
							<div
								key={post.id}
								className={styles.post}
							>
								<h4 className={styles.titlePost}>{post.title}</h4>
								<p className={styles.info}>
									Лайки: {post.likesNumber} | Дислайки: {post.dislikesNumber}
								</p>
							</div>
						))}
					</Fragment>
				))}
				{isFetchingNextPage && <p className={styles.load}>Завантаження наступної сторінки...</p>}
				{!hasNextPage && <p className={styles.empty}>Більше постів немає.</p>}
			</div>
		</div>
	);
}

export default PostsInfinitePage;
