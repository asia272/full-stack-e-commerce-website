interface TitleProps {
    title: string;
    highlight: string;
    align?: "start" | "center";
    className?: string;
    size?: string,
    highlightWeight?: "normal" | "medium" | "semibold" | "bold";
}

const Title = ({
    title,
    highlight,
    align = "center",
    className = "mb-[70px]",
    size = "text-[30px]",
    highlightWeight = "normal",
}: TitleProps) => {
    return (
        <div
            className={`flex items-center gap-4 ${align === "center" ? "justify-center" : "justify-start"
                } ${className}`}
        >
            <h1 className={`font-[Outfit] ${size} font-normal uppercase leading-none tracking-[0%] text-[#707070]`}>
                {title}{" "}
                <span
                    className={`text-[#171717] font-${highlightWeight}`}
                >
                    {highlight}
                </span>
            </h1>

            <span className="mt-1 h-[2px] w-[45px] rounded-[10px] bg-[#252525]" />
        </div>
    );
};

export default Title;