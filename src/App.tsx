import React, { memo, Suspense, Component, ReactNode } from "react";
import { PageProvider, usePageContext } from "./context/PageContext";
import Start from "./pages/Start";
import Introduction from "./pages/Introduction";
import Listing from "./pages/Listing";
import Details from "./pages/Details";
import Registration from "./pages/Registration";
import Auction from "./pages/Auction";
import Docs from "./pages/Docs";
import Finish from "./pages/Finish";
import "./App.css";

// Компонент для отображения загрузки
const LoadingFallback: React.FC = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      color: "white",
      fontSize: "18px",
    }}
  >
    Загрузка...
  </div>
);

// Компонент для отображения ошибок
const ErrorFallback: React.FC<{ error: Error }> = ({ error }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      color: "white",
      fontSize: "16px",
      padding: "20px",
    }}
  >
    <h2>Что-то пошло не так</h2>
    <p>{error.message}</p>
    <button
      onClick={() => window.location.reload()}
      style={{
        marginTop: "20px",
        padding: "10px 20px",
        background: "#00CAF1",
        border: "none",
        borderRadius: "8px",
        color: "white",
        cursor: "pointer",
      }}
    >
      Перезагрузить страницу
    </button>
  </div>
);

// Собственный ErrorBoundary
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error || new Error("Произошла ошибка")}
        />
      );
    }

    return this.props.children;
  }
}

const AppContent: React.FC = memo(() => {
  const { currentPage } = usePageContext();

  switch (currentPage) {
    case "start":
      return <Start />;
    case "introduction":
      return <Introduction />;
    case "listing":
      return <Listing />;
    case "details":
      return <Details />;
    case "registration":
      return <Registration />;
    case "auction":
      return <Auction />;
    case "docs":
      return <Docs />;
    case "finish":
      return <Finish />;
    default:
      return <Start />;
  }
});

AppContent.displayName = "AppContent";

const App: React.FC = () => {
  // Предотвращение двойного клика для зума
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <ErrorBoundary>
      <PageProvider>
        <div className="app" onDoubleClick={handleDoubleClick}>
          <Suspense fallback={<LoadingFallback />}>
            <AppContent />
          </Suspense>
        </div>
      </PageProvider>
    </ErrorBoundary>
  );
};

export default App;
