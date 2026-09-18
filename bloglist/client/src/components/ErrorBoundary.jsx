import React from 'react'
import { Alert, Box } from '@mui/material'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ mt: 3 }}>
          <Alert severity="error">Something went wrong. Call Richard.</Alert>
        </Box>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
