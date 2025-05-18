import React, { useEffect, useState } from 'react';
import PostCard from '../Components/PostCard';
import Publicar from '../Components/Publicar';

const Perfil = () => {
    const [user, setUser] = useState({
        username: '',
        nombre: '',
        avatarUrl: 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg',
        postsCount: 0,
        postsData: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const userId = localStorage.getItem('userId');

                if (!userId || !accessToken) {
                    throw new Error('No hay usuario autenticado');
                }

                // Obtener datos básicos del usuario y detalles en paralelo
                const [userRes, detailsRes] = await Promise.all([
                    fetch(`https://apis-turisteca-2-ahora-es-personal.onrender.com/api/usuarios/${userId}`, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json'
                        }
                    }),
                    fetch(`https://apis-turisteca-2-ahora-es-personal.onrender.com/api/usuario-detalles/${userId}`, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json'
                        }
                    })
                ]);

                if (!userRes.ok) throw new Error(`Error usuario: ${userRes.status}`);
                if (!detailsRes.ok) throw new Error(`Error detalles: ${detailsRes.status}`);

                const [userData, detailsData] = await Promise.all([
                    userRes.json(),
                    detailsRes.json()
                ]);

                let avatarUrl = 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';
                if (detailsData.data?.img_perfil) {
                    const imgRes = await fetch(`https://apis-turisteca-2-ahora-es-personal.onrender.com/api/imagen-url/${detailsData.data.img_perfil}`, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (imgRes.ok) {
                        const imgData = await imgRes.json();
                        if (imgData.success && imgData.data?.imagenURL) {
                            avatarUrl = imgData.data.imagenURL;
                        }
                    }
                }

                // Obtener posts y comentarios en paralelo
                const [postsRes, commentsRes] = await Promise.all([
                    fetch(`https://apis-turisteca-2-ahora-es-personal.onrender.com/api/posts`, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json'
                        }
                    }),
                    fetch(`https://apis-turisteca-2-ahora-es-personal.onrender.com/api/comentarios`, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json'
                        }
                    })
                ]);

                if (!postsRes.ok || !commentsRes.ok) {
                    throw new Error('Error al obtener publicaciones o comentarios');
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
                        idUsuario: comment.idUsuario,
                        contenido: comment.contenido,
                        creado_en: comment.creado_en,
                        likes: comment.likes || 0,
                    });
                });

                // Filtrar y adaptar publicaciones del usuario
                const userPosts = postsData.data
                    .filter(post => post.idUsuario == userId)
                    .sort((a, b) => b.id - a.id)
                    .map(post => ({
                        id: post.id,
                        idUsuario: post.idUsuario,
                        description: post.contenido,
                        imageUrl: post.imagenes?.[0] || '',
                        createdAt: post.creado_en,
                        likes: 0,
                        comments: groupedComments[post.id] || []
                    }));

                setUser({
                    username: userData.data?.username || '',
                    nombre: detailsData.data?.nombre || userData.data?.username || '',
                    avatarUrl: avatarUrl,
                    postsCount: userPosts.length,
                    postsData: userPosts
                });

            } catch (err) {
                console.error('Error fetching user data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#409223]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-red-500 text-center">
                    <p>Error al cargar el perfil: {error}</p>
                    <p>Por favor intenta nuevamente más tarde.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className='bg-gray-100'>
                <div className=" bg-gray-100 px-4 py-8 flex justify-center mt-2">
                    <div className="w-full max-w-4xl mx-auto">
                        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 mb-8">
                            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-[#409223] mx-auto sm:mx-0">
                                <img
                                    src={user.avatarUrl}
                                    alt="Foto de perfil"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';
                                    }}
                                />
                            </div>

                            <div className="flex-1 text-center sm:text-left w-full">
                                <div className="mt-2">
                                    <h1 className="text-lg">@{user.username}</h1>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 justify-center sm:justify-start">
                                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">{user.nombre}</h2>
                                    <button className="bg-white border border-gray-300 px-4 py-1 rounded-md text-sm hover:bg-gray-100 transition">
                                        Editar perfil
                                    </button>
                                </div>
                                <div className="flex justify-center sm:justify-start gap-6 mt-4">
                                    <div>
                                        <span className="font-semibold">{user.postsCount}</span> publicaciones
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="border-gray-300 mb-6" />
                    </div>
                </div>

                {user.postsData.length > 0 ? (
                    <div className="w-screen grid grid-cols-1 ">
                        {user.postsData.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500">No hay publicaciones para mostrar</p>
                    </div>
                )}
            </div>
            <Publicar />
        </>
    );
};

export default Perfil;
