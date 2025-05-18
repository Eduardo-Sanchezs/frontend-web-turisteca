import React, { useEffect, useState } from 'react';
import PostCard from '../Components/PostCard';
import Publicar from '../Components/Publicar';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                console.error('No access token found');
                setLoading(false);
                return;
            }

            try {
                const [postsRes, commentsRes] = await Promise.all([
                    fetch('https://apis-turisteca-2-ahora-es-personal.onrender.com/api/posts', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }),
                    fetch('https://apis-turisteca-2-ahora-es-personal.onrender.com/api/comentarios', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }),
                ]);

                if (!postsRes.ok || !commentsRes.ok) {
                    console.error('Error al obtener datos');
                    return;
                }

                const postsData = await postsRes.json();
                const commentsData = await commentsRes.json();

                // Agrupar comentarios por idPost
                const groupedComments = {};
                commentsData.data.forEach((comment) => {
                    const postId = comment.idPost;
                    if (!groupedComments[postId]) {
                        groupedComments[postId] = [];
                    }
                    groupedComments[postId].push({
                        id: comment.idComentario,
                        idUsuario: comment.idUsuario, // <--- CAMBIADO AQUÍ
                        contenido: comment.contenido,
                        creado_en: comment.creado_en,
                        likes: comment.likes || 0,
                    });
                });

                // Adaptar los posts y añadir comentarios correspondientes
                const adaptedPosts = postsData.data.map(post => ({
                    id: post.id,
                    idUsuario: post.idUsuario,
                    description: post.contenido,
                    imageUrl: post.imagenes?.[0] || null,
                    createdAt: post.creado_en,
                    comments: groupedComments[post.id] || [], // Asigna los comentarios aquí
                }));

                // Ordenar los posts por ID descendente
                const sortedPosts = adaptedPosts.sort((a, b) => b.id - a.id);

                setPosts(sortedPosts);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="text-center mt-10">Cargando publicaciones...</div>;

    return (
        <>
            <div className="bg-gray-100">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
            <Publicar />
        </>
    );
};

export default Home;
