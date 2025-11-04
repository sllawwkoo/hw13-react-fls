import { useEffect, useId, useState } from "react";
import styles from "./PostEditPage.module.scss";
import { useNavigate, useParams } from "react-router";
import {
	useAddPostMutation,
	useGetPostByIdQuery,
	useUpdatePostMutation,
} from "@/api/postsApi";
import { randomNumber } from "@/utils/utils";
import Loader from "@/components/Loader/Loader";

function PostEditPage() {
	const [value, setValue] = useState({
		title: "",
		body: "",
	});

	const myId1 = useId();
	const myId2 = useId();

	const navigate = useNavigate();
	const { id } = useParams();
	const isEdit = !!id;

	const [addPost] = useAddPostMutation();
	const [updatePost] = useUpdatePostMutation();
	const { data, isLoading, isError } = useGetPostByIdQuery(id, {
		skip: !id,
	});

	function handleClickChange(e) {
		const { name, value } = e.target;
		setValue((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	async function handleSubmitPost(e) {
		e.preventDefault();
		
		if (value.title.trim() !== "" && value.body.trim() !== "") {
			try {
				if (isEdit) {
					await updatePost({ id, ...value }).unwrap();
				} else {
					const newPost = {
						title: value.title.trim(),
						body: value.body.trim(),
						userId: randomNumber(1, 25),
						// id: new Date().getTime(),
						// likesNumber: 0,
						// dislikesNumber: 0,
						// publicationDate: new Date().toISOString(),
					};
					await addPost(newPost).unwrap();
				}
			} catch (error) {
				console.log(error);
			} finally {
				navigate(`/posts`);
			}
		}
	}

	useEffect(() => {
		if (isEdit) {
			if (!isLoading && data) {
				// console.log(data);
				setValue((prev) => ({ ...prev, ...data }));
			}
		}
	}, [data, isEdit, isLoading]);

	const isDisabled = !value.title.trim() || !value.body.trim();
	const title = isEdit ? "Редагувати пост" : "Додати новий пост";
	const btnText = isEdit ? "Зберегти зміни" : "Додати пост";


	if (isLoading) return <Loader/>;
	if (isError) return <p className={styles.error}>Не вдалося завантажити пост.</p>;

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<h1 className={styles.title}>{title}</h1>
				<form
					onSubmit={handleSubmitPost}
					className={styles.form}
				>
					<div className={styles.inputsBlock}>
						<div className={styles.inputLine}>
							<label htmlFor={myId1}>Заголовок*</label>
							<input
								id={myId1}
								type="text"
								name="title"
								placeholder="Введіть заголовок посту..."
								value={value.title}
								onChange={handleClickChange}
							/>
						</div>
						<div className={styles.inputLine}>
							<label htmlFor={myId2}>Текст поста*</label>
							<textarea
								id={myId2}
								type="text"
								name="body"
								placeholder="Введіть текст поста..."
								value={value.body}
								onChange={handleClickChange}
							/>
						</div>
					</div>
					<div className={styles.buttonsBlock}>
						<button
							type="submit"
							className={`${styles.button} ${
								isDisabled ? styles.disabled : ""
							}`}
							disabled={isDisabled}
						>
							{btnText}
						</button>
						<button
							type="button"
							className={styles.button}
							onClick={() => navigate("/posts")}
						>
							Відмінити
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default PostEditPage;
