import React, { Component, ErrorInfo, ReactNode } from "react";

export class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error in component:", error);
    console.error("Error info:", errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <>Something went wrong. Check the console for details.</>;
    }

    return this.props.children;
  }
}
