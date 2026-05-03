

const Card = ({ children, className = ""}) => {
    return(
        <div
        className={`bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg
            ${className}
            `}>
            {children}
        </div>
    );
};

export default Card;