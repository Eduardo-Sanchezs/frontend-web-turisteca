import { Heart, X } from 'lucide-react';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CommentsModal({ comments, onClose, onReact }) {
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

                    <div className="space-y-4">
                        {comments.map((comment, idx) => (
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
                                        <button
                                            onClick={() => onReact(idx)}
                                            className="flex items-center text-red-500 gap-1"
                                        >
                                            <Heart className="w-4 h-4" fill="currentColor" />
                                            <span>{comment.likes}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
