'use client';

import React from 'react';
import Image from 'next/image';
import { Credits } from '@/data/interfaces/components';
import ProfileImage from './profileImage';

interface CastDetailsModalProps {
    credits: Credits;
    onClose: () => void;
}

export default function CastDetailsModal({ credits, onClose }: CastDetailsModalProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-eerie w-[90%] md:w-3/4 p-6 rounded-md shadow-lg overflow-y-auto max-h-[80vh]">
                <button
                    className="text-black dark:text-white hover:text-red float-right mb-4"
                    onClick={onClose}
                >
                    Close
                </button>
                <h2 className="text-2xl font-bold mb-6">Full Cast & Crew</h2>
                <div>
                    <h3 className="text-xl font-bold mb-4">Cast</h3>
                    <ul className="grid grid-cols-2 gap-4 lg:gap-6 lg:grid-cols-3">
                        {credits.cast.map((actor) => (
                            <li key={actor.id} className="flex items-center gap-4">
                                <ProfileImage profilePath={actor.profile_path} name={actor.name} />
                                <div>
                                    <p className="font-bold">{actor.name}</p>
                                    <p className="text-sm text-slate">{actor.character}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">Crew</h3>
                    <ul className="grid grid-cols-2 gap-4 lg:gap-6 lg:grid-cols-3">
                        {credits.crew.map((member) => (
                            <li key={member.id} className="flex items-center gap-4">
                                <ProfileImage profilePath={member.profile_path} name={member.name} />
                                <div>
                                    <p className="font-semibold">{member.name}</p>
                                    <p className="text-sm text-slate">{member.job}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};