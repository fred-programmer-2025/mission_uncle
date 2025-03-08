import "../styles/components/BackgroundTree.scss";

export default function BackgroundTree({ title }) {
    return (
        <div className="background">
            <div className="title">{title}</div>
        </div>
    );
}