import Anchor from './anchor'

export default function Back ({ className }) {
    return(
        <Anchor href="" classNme={`${className} navbar-item`} onClick={() => { navigate(-1) }}>
            (go back)
        </Anchor>
    )
}