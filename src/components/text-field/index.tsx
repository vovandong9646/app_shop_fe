import React from 'react'
import PropTypes from 'prop-types'
import { TextField, TextFieldProps } from '@mui/material'
import { styled } from '@mui/material/styles'

const TextFieldStyled = styled(TextField)<TextFieldProps>(({ theme }) => {
  return {
    '& .MuiFilledInput-root': {
      transform: 'none',
      lineHeight: 1.2,
      position: 'relative',
      marginBottom: theme => theme.spacing(1),
      fontSize: theme => theme.typography.body2.fontSize
    }
  }
})

const CustomTextField = (props: TextFieldProps) => {
  const { size = 'small', InputLabelProps, variant = 'filled', ...rest } = props
  return <TextFieldStyled size={size} variant={variant} InputLabelProps={{ ...InputLabelProps }} {...rest} />
}

CustomTextField.propTypes = {}

export default CustomTextField
