import React, { useEffect, useState } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import CommentsModal from './CommentsModal';

export default function PostCard({ post }) {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(post.likes || 0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState({
        username: 'Usuario',
        avatar: 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'
    });

    const defaultAvatar = 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';

    const mostLikedComment = comments.length > 0
        ? comments.reduce((prev, current) => (current.likes > prev.likes ? current : prev))
        : null;

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

    const fetchUserInfo = async (userId, token) => {
        try {
            const resUser = await fetch(`https://apis-turisteca-2-ahora-es-personal.onrender.com/api/usuario-detalles/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const userData = await resUser.json();
            const username = userData?.data?.nombre || 'User';
            let avatar = defaultAvatar;

            if (userData?.data?.img_perfil) {
                try {
                    const resImage = await fetch(`https://apis-turisteca-2-ahora-es-personal.onrender.com/api/imagen-url/${userData.data.img_perfil}`);
                    const imageData = await resImage.json();
                    if (imageData?.data?.imagenURL) {
                        avatar = imageData.data.imagenURL;
                    } else {
                    }
                } catch (error) {
                    console.error('Error fetching image URL:', error);
                }
            }

            return { username, avatar };
        } catch (error) {
            console.error('Error fetching user info:', error);
            return { username: 'Usuario', avatar: defaultAvatar };
        }
    };

    useEffect(() => {
        const fetchPostUser = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) return;

            const userInfo = await fetchUserInfo(post.idUsuario, token);
            setUser(userInfo);
        };

        const enrichComments = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) return;

            const enriched = await Promise.all((post.comments || []).map(async (comment) => {
                const userInfo = await fetchUserInfo(comment.idUsuario, token);
                return {
                    ...comment,
                    user: userInfo.username,
                    avatar: userInfo.avatar,
                    text: comment.contenido || comment.text,
                    date: formatDate(comment.creado_en || comment.date),
                };
            }));

            setComments(enriched);
        };

        fetchPostUser();
        enrichComments();
    }, [post.idUsuario, post.comments]);

    return (
        <div className="bg-gray-100 flex justify-center items-start p-0 sm:p-4">
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

                {/* Descripción */}
                <div className="px-4 pb-2">
                    <span className="font-semibold text-gray-800">{user.username}:</span>
                    <span className="ml-1 text-gray-700 text-sm">{post.description}</span>
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
                        <Heart className={`w-6 h-6 ${liked ? 'fill-[#409223] text-[#9DC68E]' : ''}`} />
                    </button>
                    <button onClick={() => setIsModalOpen(true)}>
                        <MessageCircle className="w-6 h-6" />
                    </button>
                </div>

                {/* Contadores */}
                <div className="px-4 pb-2">
                    <p className="font-semibold text-sm text-gray-800">{likes} likes</p>
                    <p className="text-sm text-gray-500">{comments.length} comentarios</p>
                </div>

                {/* Comentario más popular */}
                {mostLikedComment && (
                    <div className="px-4 pb-2 flex items-center">
                        <img
                            src={mostLikedComment.avatar || defaultAvatar}
                            alt="Perfil comentario"
                            className="w-6 h-6 rounded-full object-cover mr-2"
                        />
                        <p className="text-sm">
                            <span className="font-semibold text-gray-800">{mostLikedComment.user}</span>{' '}
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
                    postId={post.id}
                    onCommentAdded={(newComment) => {
                        const token = localStorage.getItem('accessToken');
                        if (!token) return;
                        fetchUserInfo(newComment.idUsuario, token).then(userInfo => {
                            setComments(prev => [...prev, {
                                ...newComment,
                                user: userInfo.username,
                                avatar: userInfo.avatar,
                                text: newComment.contenido,
                                date: formatDate(newComment.creado_en),
                            }]);
                        });
                    }}
                />
            )}
        </div>
    );
}