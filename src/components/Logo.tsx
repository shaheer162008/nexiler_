import Link from "next/link";
import Image from "next/image";

export const Logo = ({ className = "" }: { className?: string }) => {
    return (
        <Link href="/" className={`flex items-center ${className}`}>
            <div className="relative h-8 md:h-10 w-40 md:w-48">
                <Image 
                    src="/Nexiler.png" 
                    alt="Nexiler" 
                    fill
                    className="object-contain object-left"
                    priority
                />
            </div>
        </Link>
    );
};
