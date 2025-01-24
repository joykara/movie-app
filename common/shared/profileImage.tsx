import Image from 'next/image';
import { TbUserSquare } from "react-icons/tb";

export default function ProfileImage({ profilePath, name }: { profilePath: string | null; name: string }) {
    if (!profilePath) {
        return <TbUserSquare size={80} className="text-eerie dark:text-dim_gray w-12 md:w-16 lg:w-20 h-12 md:h-16 lg:h-20" aria-label={`${name}'s profile`} />;
    }
    return (
        <Image
            src={`https://image.tmdb.org/t/p/w200${profilePath}`}
            alt={`${name}'s profile`}
            width={100}
            height={100}
            className="w-12 md:w-16 lg:w-20 h-12 md:h-16 lg:h-20 rounded-md"
        />
    );
}
