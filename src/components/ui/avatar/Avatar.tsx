import { avatar, type AvatarProps } from "./variants";

const Avatar = ({ name, size }: AvatarProps) => {
  const getInitial = (name: string) => {
    return name.trim().charAt(0).toUpperCase();
  };

  const getHashValue = (str: string) => {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  const getColorClass = (hashValue: number) => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-indigo-500",
      "bg-pink-500",
      "bg-teal-500",
      "bg-orange-500",
      "bg-cyan-500",
    ];
    return colors[hashValue % colors.length];
  };

  const nameHashValue = getHashValue(name);

  return (
    <div className={avatar({ size, className: getColorClass(nameHashValue) })}>
      <h1 className="select-none">{getInitial(name)}</h1>
    </div>
  );
};

export default Avatar;
