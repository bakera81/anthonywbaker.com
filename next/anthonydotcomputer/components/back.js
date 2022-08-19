import A from './anchor'

export default function Back ({ className }) {
    return(
        <A href="" className={`${className} navbar-item`} onClick={() => { navigate(-1) }}>
            (go back)
        </A>
    )
}