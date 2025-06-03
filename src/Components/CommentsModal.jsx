import { Heart, X, Send } from 'lucide-react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CommentsModal({ comments, onClose, onReact, postId, onCommentAdded }) {
    const [newComment, setNewComment] = useState('');
    const [localComments, setLocalComments] = useState(comments);
    const [loading, setLoading] = useState(false);

    const handleSendComment = async () => {
        const accessToken = localStorage.getItem('accessToken');
        const idUsuario = localStorage.getItem('userId');

        if (!newComment.trim() || !accessToken || !idUsuario) return;

        setLoading(true);

        const body = {
            idPost: postId,
            idUsuario: parseInt(idUsuario),
            contenido: newComment.trim(),
            creado_en: new Date().toISOString().split('T')[0], // "YYYY-MM-DD"
        };

        try {
            const response = await fetch('https://apis-turisteca-2-ahora-es-personal.onrender.com/api/comentarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(body),
            });

            const result = await response.json();
            console.log(result);

            if (result.success) {
                const newLocalComment = {
                    idUsuario: parseInt(idUsuario), // NECESARIO para que PostCard pueda enriquecerlo
                    contenido: body.contenido,
                    creado_en: body.creado_en,
                    likes: 0,
                };

                setLocalComments(prev => [...prev, newLocalComment]);
                onCommentAdded?.(newLocalComment); // Notifica al componente padre
                setNewComment('');
            }
            else {
                alert('Error al publicar comentario.');
            }
        } catch (error) {
            console.error('Error publicando comentario:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-4 relative max-h-[90vh] overflow-y-auto"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-500 hover:text-black"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <h2 className="text-lg font-semibold mb-4">Comentarios</h2>

                    <div className="space-y-4 mb-4">
                        {localComments.map((comment, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                                <img
                                    src={comment.avatar}
                                    alt={comment.user}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <div className="text-sm">
                                        <span className="font-semibold">{comment.user}</span>{' '}
                                        <span className="text-gray-700">{comment.text}</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500 mt-1 gap-2">
                                        <span>{comment.date}</span>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input y botón para comentarios*/}
                    <div className="flex items-center gap-2 border-t pt-3">
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Escribe un comentario..."
                            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <button
                            onClick={handleSendComment}
                            disabled={loading}
                            className="p-2 rounded-full bg-green-500 text-white disabled:opacity-50"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
