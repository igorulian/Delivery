import styled , {css} from 'styled-components'


const dragActive = css`
    border-color: #78e5e5
`

const dragReject = css`
    border-color: #e57878
`

export const DropContainer = styled.div.attrs({
    className: 'dropzone'
})`
    border: 1px dashed #222;
    border-radius: 4px;
    cursor: pointer;
    transition: height 0.2s ease;
    width: 140px;
    height: 140px;
    margin-bottom: 10px;
    text-align: center;
    align-itens: center;

    ${props => props.isDragActive && dragActive}
    ${props => props.isDragReject && dragReject}
`
const messageColors = {
    default: '#999',
    error: '#e57878',
    sucess: '#78e5e5'
}

export const UploadMessage = styled.p`
    display: flex;
    color: ${props => messageColors[props.type || 'default']};
    justfy-content: center;
    align-itens: center;
    padding: 15px 0;
    margin-top: 30px

`