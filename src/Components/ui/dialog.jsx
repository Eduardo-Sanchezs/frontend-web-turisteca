import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import React from 'react';

export const Dialog = DialogPrimitive.Root;

export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogContent = ({ children, ...props }) => (
    <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <DialogPrimitive.Content
            className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-lg max-w-lg w-full p-6"
            {...props}
        >
            {children}
            <DialogPrimitive.Close className="absolute top-4 right-4 text-gray-500 hover:text-black">
                <X className="w-5 h-5" />
            </DialogPrimitive.Close>
        </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
);

export const DialogHeader = ({ children }) => (
    <div className="mb-4">{children}</div>
);

export const DialogTitle = ({ children }) => (
    <h2 className="text-lg font-semibold">{children}</h2>
);
