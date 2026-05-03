import Card from "../common/Card";

const StatsCard = ({
    title,
    value,
}) => {
    return(
        <Card>
            <p className="text-slate-400 text-sm">
                {title}
            </p>

            <h2 className="text-3xl font-bold mt-2 text-cyan-400">
                {value}
            </h2>

        </Card>
    );
};

export default StatsCard;