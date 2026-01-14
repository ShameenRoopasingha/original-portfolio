'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface ImageSelectorProps {
    images: string[];
    currentImage?: string | null;
}

export function ImageSelector({ images, currentImage }: ImageSelectorProps) {
    const [selected, setSelected] = useState<string | null>(currentImage || null);

    // Filter out duplicate or strictly system files if any, but images passed in should be clean urls
    // We expect images to be paths like "/uploads/filename.jpg"

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="text-neutral-400 uppercase tracking-wider text-xs">
                    Previously Uploaded Variants
                </label>
                <span className="text-xs text-neutral-500">
                    {images.length} available
                </span>
            </div>

            <input type="hidden" name="existingImage" value={selected || ''} />

            <div className="grid grid-cols-4 gap-4 max-h-[300px] overflow-y-auto p-2 border border-neutral-800 rounded-md bg-neutral-950/50">
                {images.map((img) => (
                    <div
                        key={img}
                        onClick={() => setSelected(img)}
                        className={cn(
                            "relative aspect-square cursor-pointer rounded-md overflow-hidden border-2 transition-all group",
                            selected === img
                                ? "border-orange-500 opacity-100"
                                : img === currentImage
                                    ? "border-green-500/50 opacity-100" // Highlight current db image
                                    : "border-transparent opacity-60 hover:opacity-100 hover:border-neutral-700"
                        )}
                    >
                        <img
                            src={img}
                            alt="Variant"
                            className="w-full h-full object-cover"
                        />

                        {selected === img && (
                            <div className="absolute inset-0 bg-orange-500/20 flex items-center justify-center">
                                <div className="bg-orange-500 rounded-full p-1">
                                    <Check className="w-4 h-4 text-black" />
                                </div>
                            </div>
                        )}

                        {img === currentImage && selected !== img && (
                            <div className="absolute top-1 right-1">
                                <div className="bg-green-500/80 rounded-full px-2 py-0.5 text-[8px] text-black font-bold uppercase">
                                    Active
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {images.length === 0 && (
                    <div className="col-span-4 py-8 text-center text-neutral-600 text-xs italic">
                        No previous uploads found in archive.
                    </div>
                )}
            </div>
        </div>
    );
}
