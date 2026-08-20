
interface TitleProps {
    title: string;
    highlight: string;
    align?: "start" | "center";
    className?: string;
}

const Title = ({
    title,
    highlight,
    align = "center",
    className = "mb-[70px]",
}: TitleProps) => {
    return (
        <div
            className={`flex items-center gap-4 ${align === "center" ? "justify-center" : "justify-start"
                } ${className}`}
        >
            <h1 className="font-[Outfit] text-[30px] font-normal uppercase leading-none tracking-[0%] text-[#707070]">
                {title}{" "}
                <span className="text-[#171717]">
                    {highlight}
                </span>
            </h1>

            <span className="mt-1 h-[2px] w-[45px] rounded-[10px] bg-[#252525]" />
        </div>
    );
};

export default Title;