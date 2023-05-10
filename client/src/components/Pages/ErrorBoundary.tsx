import { Component, ErrorInfo, ReactNode } from 'react';
import { Page404 } from "components/Pages"

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {

  state = { hasError: false };
  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 에러 로그를 출력 (Web)
    console.error('Uncaught error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <Page404 />
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
