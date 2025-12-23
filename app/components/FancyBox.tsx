interface FancyBoxProps {
    children: React.ReactNode;
}

export default function FancyBox({ children }: FancyBoxProps) {
    return (
        <div className="relative bg-white p-1/2 shadow-md">
            <div className="absolute top-2 left-2 w-1/3 h-1/3 bg-[#777]"></div>
            <div className="absolute bottom-2 right-2 w-1/3 h-1/3 bg-[#777]"></div>
            <div className="relative z-2 m-2.5 bg-white t-0 r-0 p-3">{children}</div>
        </div>
    );
}