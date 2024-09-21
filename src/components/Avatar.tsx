import { User, UserRound } from "lucide-react";
import Image from "next/image";

type AvatarProps = {
  src?: string | null | undefined;
};

export function Avatar({ src }: AvatarProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt="avatar"
        width={30}
        height={30}
        className="rounded-full"
      />
    );
  }
  return <UserRound size={20} />;
}
