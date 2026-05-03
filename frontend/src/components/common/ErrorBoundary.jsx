import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
          <div className="bg-slate-900 border border-red-500/50 rounded-lg p-8 max-w-md">
            <h1 className="text-2xl font-bold text-red-400 mb-4">
              Oops! Something went wrong
            </h1>
            
            <p className="text-slate-300 mb-4">
              We're sorry for the inconvenience. An unexpected error occurred.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-4 p-3 bg-slate-800 rounded text-xs text-slate-400 whitespace-pre-wrap overflow-auto max-h-48">
                <summary className="cursor-pointer font-semibold text-slate-300 mb-2">
                  Error Details
                </summary>
                <code>{this.state.error.toString()}</code>
              </details>
            )}

            <div className="flex gap-2">
              <button
                onClick={this.resetError}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold py-2 px-4 rounded transition"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2 px-4 rounded transition"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
