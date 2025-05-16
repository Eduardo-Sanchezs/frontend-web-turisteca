import React, { useState } from 'react';
import { Heart, MessageCircle, Send } from 'lucide-react';
import CommentsModal from './CommentsModal';

export default function PostCard() {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(128);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [comments, setComments] = useState([
        {
            user: 'maria',
            text: '¡Qué foto tan bonita!',
            date: '15 mayo 2025',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            likes: 4,
        },
        {
            user: 'luis',
            text: 'Increíble lugar 🔥',
            date: '14 mayo 2025',
            avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
            likes: 9,
        },
        {
            user: 'tú',
            text: 'Quiero ir ahí 😍',
            date: '13 mayo 2025',
            avatar: 'https://randomuser.me/api/portraits/men/99.jpg',
            likes: 2,
        },
    ]);

    const mostLikedComment = comments.reduce((prev, current) =>
        current.likes > prev.likes ? current : prev
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

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-start p-0 sm:p-4">
            <div className="w-full sm:w-3/4 md:w-2/3 lg:w-3/5 xl:w-3/8 mx-auto bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">

                {/* Header */}
                <div className="flex items-center p-4">
                    <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="Perfil"
                        className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <span className="font-semibold text-gray-800">juanperez</span>
                </div>

                {/* Imagen del post */}
                <img
                    src="https://i.pinimg.com/736x/a4/01/10/a40110eee07e3a42b85925e6e654577f.jpg"
                    alt="Post"
                    className="w-full object-cover"
                />

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
                    <p className="text-sm text-gray-500">{comments.length} comments</p>
                </div>

                {/* Descripción */}
                <div className="px-4 pb-2">
                    <span className="font-semibold text-gray-800">juanperez</span>
                    <span className="ml-1 text-gray-700 text-sm">Disfrutando del paisaje 🌄</span>
                </div>

                {/* Comentario más popular */}
                <div className="px-4 pb-2">
                    <p className="text-sm">
                        <span className="font-semibold text-gray-800">{mostLikedComment.user}</span>{' '}
                        <span className="text-gray-700">{mostLikedComment.text}</span>
                    </p>
                </div>

                {/* Fecha */}
                <div className="px-4 pb-4 text-xs text-gray-400">15 de mayo de 2025</div>
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
