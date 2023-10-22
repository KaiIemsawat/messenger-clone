import { IconType } from "react-icons";

interface AuthSocialBtnProps {
    icon: IconType;
    onClick: () => void;
}

const AuthSocialBtn: React.FC<AuthSocialBtnProps> = ({
    icon: Icon, // remap 'icon' to 'Icon' so we can use it as component
    onClick,
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex
            w-full
            justify-center
            rounded-md
            bg-white
            px-4
            py-2
            text-gray-500
            shadow-sm
            ring-1
            ring-inset
            ring-gray-300
            hover:bg-gray-50
            focus:outline-offset-0"
        >
            <Icon />
        </button>
    );
};
// Basically, this button component will take 2 props
// 1 - onClick
// 2 - icon (Icon). And in usage (in AuthForm.tsx), it will be declared
export default AuthSocialBtn;
