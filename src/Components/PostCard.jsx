import React, { useEffect, useState } from 'react';
import { Heart, MessageCircle, Send } from 'lucide-react';
import CommentsModal from './CommentsModal';

export default function PostCard({ post }) {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(post.likes || 0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [comments, setComments] = useState(post.comments || []);
    const [user, setUser] = useState({ username: 'Usuario', avatar: 'https://via.placeholder.com/40' });

    const mostLikedComment = comments.reduce((prev, current) =>
        current.likes > prev.likes ? current : prev,
        comments[0] || {}
    );

    const handleLike = () => {
        setLiked(!liked);
        setLikes((prev) => (liked ? prev - 1 : prev + 1));
    };

    const handleReactToComment = (index) => {
        const updated = [...comments];
        updated[index].likes += 1;
        setComments(updated);
    };

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-MX', options);
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) return;

            try {
                const resUser = await fetch(`https://apis-turisteca-2-ahora-es-personal.onrender.com/api/usuario-detalles/${post.idUsuario}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const userData = await resUser.json();
                let username = userData?.data?.nombre || 'Usuario';
                let avatar = 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';

                if (userData?.data?.img_perfil) {
                    const resImage = await fetch(`https://apis-turisteca-2-ahora-es-personal.onrender.com/api/imagen-url/${userData.data.img_perfil}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    const imageData = await resImage.json();
                    if (imageData?.data?.imagenURL) {
                        avatar = imageData.data.imagenURL;
                    }
                }

                setUser({ username, avatar });
            } catch (error) {
                console.error('Error al obtener datos del usuario:', error);
            }
        };

        fetchUserDetails();
    }, [post.idUsuario]);

    return (
        <div className=" bg-gray-100 flex justify-center items-start p-0 sm:p-4">
            <div className="w-full sm:w-3/4 md:w-2/3 lg:w-3/5 xl:w-3/8 mx-auto bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">

                {/* Header */}
                <div className="flex items-center p-4">
                    <img
                        src={user.avatar}
                        alt="Perfil"
                        className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <span className="font-semibold text-gray-800">{user.username}</span>
                </div>

                {/* Imagen del post */}
                {post.imageUrl && (
                    <img
                        src={post.imageUrl}
                        alt="Post"
                        className="w-full object-cover max-h-[500px]"
                    />
                )}

                {/* Reacciones */}
                <div className="flex items-center space-x-4 p-4 text-gray-700">
                    <button onClick={handleLike}>
                        <Heart
                            className={`w-6 h-6 ${liked ? 'fill-red-500 text-red-500' : ''}`}
                        />
                    </button>
                    <button onClick={() => setIsModalOpen(true)}>
                        <MessageCircle className="w-6 h-6" />
                    </button>
                    <Send className="w-6 h-6" />
                </div>

                {/* Contadores */}
                <div className="px-4 pb-2">
                    <p className="font-semibold text-sm text-gray-800">{likes} likes</p>
                    <p className="text-sm text-gray-500">{comments.length} comentarios</p>
                </div>

                {/* Descripción */}
                <div className="px-4 pb-2">
                    <span className="font-semibold text-gray-800">{user.username}</span>
                    <span className="ml-1 text-gray-700 text-sm">{post.description}</span>
                </div>

                {/* Comentario más popular */}
                {mostLikedComment && (
                    <div className="px-4 pb-2">
                        <p className="text-sm">
                            <span className="font-semibold text-gray-800">{mostLikedComment.user?.username}</span>{' '}
                            <span className="text-gray-700">{mostLikedComment.text}</span>
                        </p>
                    </div>
                )}

                {/* Fecha */}
                <div className="px-4 pb-4 text-xs text-gray-400">
                    {formatDate(post.createdAt)}
                </div>
            </div>

            {/* Modal de comentarios */}
            {isModalOpen && (
                <CommentsModal
                    comments={comments}
                    onClose={() => setIsModalOpen(false)}
                    onReact={handleReactToComment}
                />
            )}
        </div>
    );
}
