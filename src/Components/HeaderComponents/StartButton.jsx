import IconButton from '@mui/material/IconButton';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import './StartButton.css';

const StartButton = ({ onClick, disabled }) => {
    return (
        <div>
            <IconButton className="circle-button" onClick={onClick} disabled={disabled}>
                Start Season  <PlayCircleFilledWhiteIcon fontSize="large" className="circle-button-icon"/>
            </IconButton>
        </div>
    )
}
export default StartButton;