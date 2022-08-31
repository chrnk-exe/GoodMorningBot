import React, {useState} from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, TextField } from '@mui/material';

interface Props {
    onChangeEventFunction(e: React.ChangeEvent<HTMLInputElement>): void;
}

const TextFieldPassword = (props: Props) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <TextField 
            InputProps={{
                endAdornment: (
                    <InputAdornment position={'end'}>
                        <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end">
                            {!showPassword ? <Visibility /> : <VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                )
            }}
            fullWidth
            label="Пароль" 
            rows={1}
            variant="outlined" 
            type={showPassword?'text':'password'}
            onChange={props.onChangeEventFunction}/>
    )
}

export default TextFieldPassword