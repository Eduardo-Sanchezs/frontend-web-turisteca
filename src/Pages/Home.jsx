import React, { useEffect, useState } from 'react';
import PostCard from '../Components/PostCard';
import Publicar from '../Components/Publicar';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                console.error('No access token found');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('https://apis-turisteca-2-ahora-es-personal.onrender.com/api/posts', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error:', errorData.message || response.statusText);
                    throw new Error('Error al obtener los posts');
                }

                const data = await response.json();

                // Adaptar los datos al formato que espera PostCard
                const adaptedPosts = data.data.map(post => ({
                    id: post.id,
                    idUsuario: post.idUsuario,
                    description: post.contenido,
                    imageUrl: post.imagenes?.[0] || null,
                    createdAt: post.creado_en,
                }));

                setPosts(adaptedPosts);
            } catch (error) {
                console.error('Error al obtener los posts:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <div className="text-center mt-10">Cargando publicaciones...</div>;

    return (
        <>
            <div className="bg-gray-100">
                {[...posts]
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
            </div>
            <Publicar />
        </>
    );
};

export default Home;
