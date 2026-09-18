import { useState } from 'react'
import { Box, Button, Paper } from '@mui/material'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <Box>
      <Box sx={hideWhenVisible}>
        <Button variant="contained" onClick={() => setVisible(true)}>
          {props.buttonLabel}
        </Button>
      </Box>

      <Box sx={showWhenVisible}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          {props.children}
          <Button variant="text" onClick={() => setVisible(false)} sx={{ mt: 2 }}>
            cancel
          </Button>
        </Paper>
      </Box>
    </Box>
  )
}

export default Togglable
