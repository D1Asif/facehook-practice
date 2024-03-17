import { useUser } from "../../hooks/useUser"

export default function AvatarPlaceholder({ isLarge, letter, isExtraSmall }) {
  const { user } = useUser();
  const displayLetter = letter ?? user.firstName[0];

  let className = `p-2 bg-red-400 rounded-full flex justify-center items-center h-[32px] w-[32px] lg:h-[44px] lg:w-[44px] text-xl`;
  if (isExtraSmall) {
    className = `p-2 bg-red-400 rounded-full flex justify-center items-center w-6 h-6 text-sm`
  }
  if (isLarge) {
    className = `p-2 bg-red-400 rounded-full flex justify-center items-center h-[180px] w-[180px] text-8xl`
  }
  return (
    <div className={className}>
      <p>{displayLetter.toUpperCase()}</p>
    </div>
  )
}
