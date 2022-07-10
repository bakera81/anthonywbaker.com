import A from './anchor'

export default function Back ({ className }) {
    return(
        <A href="" classNme={`${className} navbar-item`} onClick={() => { navigate(-1) }}>
            (go back)
        </A>
    )
}