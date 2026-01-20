import { ASSETS } from "../constants/assets";

type MuteButtonProps = {
  muted: boolean;
  displayMute: boolean;
  onClick: () => void;
  size?: "small" | "medium" | "large";
  variant?: "overlay" | "filled";
};

/**
 * Reusable mute button component
 * Eliminates duplication across VideoCard and InfoCard components
 */
export const MuteButton = ({
  muted,
  displayMute,
  onClick,
  size = "medium",
  variant = "overlay",
}: MuteButtonProps) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-10 h-10",
    large: "w-12 h-12",
  };

  const imgSizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-10 h-10",
  };

  const baseClasses = {
    overlay: `${sizeClasses[size]} flex items-center justify-center bg-black/50 rounded-full transition-opacity duration-300 ease-in-out`,
    filled: `${sizeClasses[size]} flex items-center justify-center bg-white rounded-full transition-opacity duration-300 ease-in-out`,
  };

  const opacityClass =
    variant === "overlay"
      ? displayMute
        ? "opacity-80"
        : "opacity-0"
      : "opacity-80";

  const buttonClasses = `${baseClasses[variant]} ${opacityClass}`;

  return (
    <button onClick={onClick} className={buttonClasses}>
      <img
        src={muted ? ASSETS.IMAGES.SPEAKER : ASSETS.IMAGES.MUTE}
        className={imgSizeClasses[size]}
        alt={muted ? "Unmute" : "Mute"}
      />
    </button>
  );
};
