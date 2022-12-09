export default function List({ ordered, children }) {
    console.log(children)
    return ordered ? (
        <ol className="TEST">
            {children}
        </ol>
    ) : (
        <ul className="TEST">
            {children}
        </ul>
    )
}