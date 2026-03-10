import { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({ errorInfo });
    // Also try to send it to our catcher just in case
    fetch('http://localhost:9999', { method: 'POST', body: String(error.stack) }).catch(console.error);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', background: '#222', color: '#ff5555', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h2>React Error Boundary Caught an Error:</h2>
          <h3 style={{ color: 'white' }}>{this.state.error && this.state.error.toString()}</h3>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '20px', color: '#ccc' }}>
            <summary>Click for Component Stack Trace</summary>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          <br />
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '20px', color: '#ccc' }} open>
            <summary>Error Stack</summary>
            {this.state.error && this.state.error.stack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
