import MainLayout from "@/layout/MainLayout/MainLayout";
import { HomePage, PostEditPage, PostsInfinitePage, PostsPage } from "@/pages";
import { Navigate } from "react-router";

export const pagesRoutes = [
	{
		path: "/",
		element: <HomePage />,
		meta: { title: "Головна" },
	},
	{
		path: "/posts",
		element: <PostsPage />,
		meta: { title: "Пости" },
	},
	{
		path: "/posts-infinite",
		element: <PostsInfinitePage />,
		meta: { title: "Нескінченне завантаження" },
	},
	{
		path: "/posts/edit/:id?",
		element: <PostEditPage />,
		meta: { notInMenu: true },
	},
];

const routes = [
	{
		element: <MainLayout />,
		children: pagesRoutes,
	},
	// Перенаправлення неіснуючих шляхів на головну
	{
		path: "*",
		element: (
			<Navigate
				to="/"
				replace
			/>
		),
	},
];

export default routes;
